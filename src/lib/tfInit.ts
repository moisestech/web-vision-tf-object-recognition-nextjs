import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-wasm';
import { log } from './utils/logger';

export async function initTf(): Promise<void> {
  log.info('tf-init', 'Initializing TensorFlow.js');

  // Suppress non-critical TensorFlow warnings during initialization
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    // Suppress nonMaxSuppression warnings (these are from the model library, not critical)
    if (message.includes('nonMaxSuppression')) {
      return;
    }
    originalWarn.apply(console, args);
  };
  
  // Suppress CPU backend errors (we use WebGL/WASM, CPU is not needed)
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    if (message.includes("Backend name 'cpu' not found")) {
      return;
    }
    originalError.apply(console, args);
  };

  // Set WASM paths (if available)
  if (typeof window !== 'undefined' && (window as any).tf?.setWasmPaths) {
    (window as any).tf.setWasmPaths('/tfjs');
    log.debug('tf-init', 'WASM paths set', { path: '/tfjs' });
  }

  // Try WebGL first, fallback to WASM
  try {
    log.debug('tf-init', 'Attempting WebGL backend');
    await tf.setBackend('webgl');
    await tf.ready();
    log.info('tf-init', 'WebGL backend initialized', { backend: 'webgl' });
  } catch (error) {
    log.warn('tf-init', 'WebGL not available, falling back to WASM', { error: error instanceof Error ? error.message : String(error) });
    try {
      // Set WASM paths before switching backend
      const wasmBackend = await import('@tensorflow/tfjs-backend-wasm');
      if ((wasmBackend as any).setWasmPaths) {
        (wasmBackend as any).setWasmPaths('/tfjs');
      }
      await tf.setBackend('wasm');
      await tf.ready();
      log.info('tf-init', 'WASM backend initialized', { backend: 'wasm' });
    } catch (wasmError) {
      log.error('tf-init', 'Failed to initialize TensorFlow.js backend', wasmError instanceof Error ? wasmError : new Error(String(wasmError)));
      throw new Error('Failed to initialize TensorFlow.js backend');
    }
  }

  // Warm up with a dummy operation
  tf.tidy(() => {
    const dummy = tf.ones([1, 1, 1, 1]);
    dummy.dispose();
  });
  log.debug('tf-init', 'TensorFlow.js warm-up complete');

  // Restore original console methods after initialization
  setTimeout(() => {
    console.warn = originalWarn;
    console.error = originalError;
  }, 10000); // Keep suppressed for 10 seconds to catch model loading warnings
}

export function getBackend(): string {
  return tf.getBackend() || 'unknown';
}

