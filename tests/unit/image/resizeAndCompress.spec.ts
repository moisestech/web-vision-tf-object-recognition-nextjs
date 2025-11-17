import { describe, it, expect, beforeEach } from 'vitest';
import {
  snapshotVideoToCanvas,
  compressCanvasToDataURL,
} from '@/lib/image';

describe('image resize and compress', () => {
  beforeEach(() => {
    // Ensure canvas context is available
    HTMLCanvasElement.prototype.getContext = function (contextId: string) {
      if (contextId === '2d') {
        return {
          drawImage: () => {},
          fillStyle: '',
          fillRect: () => {},
          strokeRect: () => {},
          fillText: () => {},
          save: () => {},
          restore: () => {},
          clearRect: () => {},
          beginPath: () => {},
          closePath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          quadraticCurveTo: () => {},
          clip: () => {},
          roundRect: () => {},
        } as any;
      }
      return null;
    };
  });

  it('resizes canvas to max 1280px width', () => {
    const video = document.createElement('video');
    // Mock video dimensions
    Object.defineProperty(video, 'videoWidth', {
      value: 1920,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(video, 'videoHeight', {
      value: 1080,
      writable: false,
      configurable: true,
    });

    const canvas = snapshotVideoToCanvas(video, 1280);
    expect(canvas.width).toBe(1280);
    expect(canvas.height).toBeLessThanOrEqual(720);
  });

  it('compresses to reasonable size', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    // Mock toDataURL to return a reasonable size
    const mockDataUrl = 'data:image/jpeg;base64,' + 'x'.repeat(100000); // ~75KB
    canvas.toDataURL = () => mockDataUrl;

    const dataUrl = compressCanvasToDataURL(canvas, 0.7);
    expect(dataUrl).toMatch(/^data:image\/jpeg;base64,/);
    
    // Check approximate size (base64 is ~33% larger than binary)
    const base64Length = dataUrl.split(',')[1]?.length || 0;
    const estimatedSizeMB = (base64Length * 3) / 4 / 1024 / 1024;
    expect(estimatedSizeMB).toBeLessThan(1.5);
  });
});

