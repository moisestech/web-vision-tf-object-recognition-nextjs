import * as blazeface from '@tensorflow-models/blazeface';
import type { BlazeFaceModel } from '@tensorflow-models/blazeface';
import { loadBlazeFace } from './ai/loaders';

let model: BlazeFaceModel | null = null;

export async function loadBlaze(): Promise<BlazeFaceModel> {
  if (model) {
    return model;
  }
  model = await loadBlazeFace();
  return model;
}

export async function blurFacesOnCanvas(
  src: HTMLCanvasElement
): Promise<HTMLCanvasElement> {
  if (!model) {
    await loadBlaze();
  }

  if (!model) {
    return src;
  }

  const faces = await model.estimateFaces(src, false);

  if (faces.length === 0) {
    return src;
  }

  // Create new canvas with blurred faces
  const dest = document.createElement('canvas');
  dest.width = src.width;
  dest.height = src.height;
  const ctx = dest.getContext('2d')!;

  // Draw original image
  ctx.drawImage(src, 0, 0);

  // Blur each face region
  for (const face of faces) {
    const start = face.topLeft as [number, number];
    const end = face.bottomRight as [number, number];
    const width = end[0] - start[0];
    const height = end[1] - start[1];

    // Save context
    ctx.save();

    // Create clipping region
    ctx.beginPath();
    ctx.rect(start[0], start[1], width, height);
    ctx.clip();

    // Apply blur filter
    ctx.filter = 'blur(20px)';
    ctx.drawImage(src, 0, 0);

    // Restore context
    ctx.restore();
  }

  return dest;
}

