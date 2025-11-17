import * as tf from '@tensorflow/tfjs';
import * as coco from '@tensorflow-models/coco-ssd';
import type { ObjectDetection } from '@tensorflow-models/coco-ssd';
import { DETECT_CLASSES } from './constants';
import { loadCocoSsd } from './ai/loaders';
import { log } from './utils/logger';

export type Det = {
  bbox: [number, number, number, number];
  class: string;
  score: number;
};

let model: ObjectDetection | null = null;

export async function loadCoco(): Promise<ObjectDetection> {
  if (model) {
    log.debug('detection', 'COCO-SSD model already loaded');
    return model;
  }
  log.info('detection', 'Loading COCO-SSD model');
  model = await loadCocoSsd();
  log.info('detection', 'COCO-SSD model loaded');
  return model;
}

export async function detectFrame(
  video: HTMLVideoElement
): Promise<Det[]> {
  if (!model) {
    await loadCoco();
  }

  if (!model) {
    log.warn('detection', 'Model not available for detection');
    return [];
  }

  // Store reference to satisfy TypeScript null check
  const currentModel = model;

  // Wrap in Promise to ensure all errors are caught
  return new Promise<Det[]>(async (resolve) => {
    try {
      const startTime = performance.now();
      let detections;
      
      try {
        // Wrap detect call to catch all possible errors
        detections = await Promise.resolve(currentModel.detect(video)).catch((error: any) => {
          const errorMessage = error?.message || String(error);
          if (errorMessage.includes("Backend name 'cpu' not found")) {
            log.debug('detection', 'Backend warning suppressed (using WebGL/WASM)', { error: errorMessage });
            return [];
          }
          throw error;
        });
      } catch (error: any) {
        // Handle TensorFlow backend errors gracefully
        const errorMessage = error?.message || String(error);
        if (errorMessage.includes("Backend name 'cpu' not found")) {
          log.debug('detection', 'Backend warning suppressed (using WebGL/WASM)', { error: errorMessage });
          resolve([]);
          return;
        }
        // Re-throw other errors to be caught by outer try-catch
        throw error;
      }
      
      const detectTime = performance.now() - startTime;
      
      if (!detections || detections.length === 0) {
        resolve([]);
        return;
      }
      
      const filtered = tf.tidy(() => {
        return detections
          .filter((d) => d.score >= 0.5 && DETECT_CLASSES.includes(d.class))
          .map((d) => ({
            bbox: [
              d.bbox[0],
              d.bbox[1],
              d.bbox[2],
              d.bbox[3],
            ] as [number, number, number, number],
            class: d.class,
            score: d.score,
          }));
      });

      log.debug('detection', 'Frame detection complete', {
        totalDetections: detections.length,
        filteredDetections: filtered.length,
        detectTimeMs: detectTime.toFixed(2),
        classes: filtered.map((d) => d.class),
      });

      resolve(filtered);
    } catch (error: any) {
      // Catch any other errors and return empty array
      const errorMessage = error?.message || String(error);
      if (errorMessage.includes("Backend name 'cpu' not found")) {
        // Already handled, just return empty
        resolve([]);
        return;
      }
      log.warn('detection', 'Detection failed', { error: errorMessage });
      resolve([]);
    }
  });
}

