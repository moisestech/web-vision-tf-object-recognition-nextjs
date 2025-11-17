import * as coco from '@tensorflow-models/coco-ssd';
import * as blazeface from '@tensorflow-models/blazeface';
import type { ObjectDetection } from '@tensorflow-models/coco-ssd';
import type { BlazeFaceModel } from '@tensorflow-models/blazeface';

export class ModelInitError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'ModelInitError';
  }
}

let cocoModel: ObjectDetection | null = null;
let blazefaceModel: BlazeFaceModel | null = null;

export async function loadCocoSsd(): Promise<ObjectDetection> {
  if (cocoModel) {
    return cocoModel;
  }

  try {
    // Try CDN first
    cocoModel = await coco.load({ base: 'lite_mobilenet_v2' });
    return cocoModel;
  } catch (cdnError) {
    console.warn('CDN load failed, trying local fallback', cdnError);
    try {
      // Fallback to local (if available)
      cocoModel = await coco.load({
        base: 'lite_mobilenet_v2',
        modelUrl: '/models/coco-ssd/model.json',
      });
      return cocoModel;
    } catch (localError) {
      throw new ModelInitError(
        'Failed to load COCO-SSD model from CDN and local fallback',
        localError
      );
    }
  }
}

export async function loadBlazeFace(): Promise<BlazeFaceModel> {
  if (blazefaceModel) {
    return blazefaceModel;
  }

  try {
    // Try CDN first
    blazefaceModel = await blazeface.load();
    return blazefaceModel;
  } catch (cdnError) {
    console.warn('CDN load failed, trying local fallback', cdnError);
    try {
      // Fallback to local (if available)
      blazefaceModel = await blazeface.load({
        modelUrl: '/models/blazeface/model.json',
      });
      return blazefaceModel;
    } catch (localError) {
      throw new ModelInitError(
        'Failed to load BlazeFace model from CDN and local fallback',
        localError
      );
    }
  }
}

export async function loadModels(): Promise<{
  coco: ObjectDetection;
  blazeface: BlazeFaceModel;
}> {
  try {
    const [coco, blazeface] = await Promise.all([
      loadCocoSsd(),
      loadBlazeFace(),
    ]);
    return { coco, blazeface };
  } catch (error) {
    throw new ModelInitError('Failed to load AI models', error);
  }
}

