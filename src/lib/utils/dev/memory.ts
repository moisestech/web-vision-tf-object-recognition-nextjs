import * as tf from '@tensorflow/tfjs';

export function logTfMem(intervalMs: number = 2000): () => void {
  let lastCount = tf.memory().numTensors;
  let consecutiveGrowth = 0;

  const interval = setInterval(() => {
    const mem = tf.memory();
    const currentCount = mem.numTensors;

    if (currentCount > lastCount) {
      consecutiveGrowth++;
      if (consecutiveGrowth >= 3) {
        console.warn(
          `⚠️ Potential memory leak: tensor count growing (${lastCount} → ${currentCount})`
        );
      }
    } else {
      consecutiveGrowth = 0;
    }

    console.log(
      `TF Memory: ${currentCount} tensors, ${(mem.numBytes / 1024 / 1024).toFixed(2)}MB`
    );
    lastCount = currentCount;
  }, intervalMs);

  return () => clearInterval(interval);
}

