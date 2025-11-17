import { describe, it, expect, beforeEach } from 'vitest';
import { drawDetections } from '@/lib/image';
import type { Det } from '@/lib/detection';

describe('drawOverlay', () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let savedState: { globalAlpha: number; fillStyle: string } | null = null;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    
    // Mock canvas context
    ctx = {
      globalAlpha: 1.0,
      fillStyle: '#000000',
      strokeStyle: '#000000',
      lineWidth: 1,
      font: '14px sans-serif',
      save: function() {
        savedState = { globalAlpha: this.globalAlpha, fillStyle: this.fillStyle };
      },
      restore: function() {
        if (savedState) {
          this.globalAlpha = savedState.globalAlpha;
          this.fillStyle = savedState.fillStyle;
        }
      },
      strokeRect: () => {},
      fillText: () => {},
      clearRect: () => {},
    } as any;
    
    // Mock getContext to return our mock
    canvas.getContext = () => ctx as any;
  });

  it('draws detections without leaking canvas state', () => {
    const dets: Det[] = [
      {
        bbox: [10, 10, 100, 100],
        class: 'bottle',
        score: 0.8,
      },
    ];

    // Save initial state
    const initialGlobalAlpha = ctx.globalAlpha;
    const initialFillStyle = ctx.fillStyle;

    drawDetections(ctx, dets);

    // State should be restored (save/restore was called)
    expect(ctx.globalAlpha).toBe(initialGlobalAlpha);
  });
});

