'use client';

import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { getBackend } from '@/lib/tfInit';

export function DevHUD() {
  const [backend, setBackend] = useState<string>('unknown');
  const [memory, setMemory] = useState<{ numTensors: number; numBytes: number }>({
    numTensors: 0,
    numBytes: 0,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const update = () => {
      setBackend(getBackend());
      const mem = tf.memory();
      setMemory({ numTensors: mem.numTensors, numBytes: mem.numBytes });
    };

    update();
    const interval = setInterval(update, 2000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 border border-cyan-500/50 rounded-lg p-3 text-xs font-mono">
      <div className="grid gap-1">
        <div>
          <span className="opacity-60">Backend:</span>{' '}
          <span className="text-cyan-400">{backend}</span>
        </div>
        <div>
          <span className="opacity-60">Tensors:</span>{' '}
          <span className="text-cyan-400">{memory.numTensors}</span>
        </div>
        <div>
          <span className="opacity-60">Memory:</span>{' '}
          <span className="text-cyan-400">
            {(memory.numBytes / 1024 / 1024).toFixed(2)}MB
          </span>
        </div>
      </div>
    </div>
  );
}

