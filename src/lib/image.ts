import type { Det } from './detection';

export function snapshotVideoToCanvas(
  video: HTMLVideoElement,
  targetW: number = 1280
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const aspect = video.videoWidth / video.videoHeight;

  if (video.videoWidth > targetW) {
    canvas.width = targetW;
    canvas.height = targetW / aspect;
  } else {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  return canvas;
}

export function drawDetections(
  ctx: CanvasRenderingContext2D,
  dets: Det[]
): void {
  ctx.save();
  ctx.strokeStyle = '#00ffff';
  ctx.fillStyle = '#00ffff';
  ctx.lineWidth = 2;
  ctx.font = '14px sans-serif';

  for (const det of dets) {
    const [x, y, w, h] = det.bbox;
    ctx.strokeRect(x, y, w, h);
    ctx.fillText(
      `${det.class} ${(det.score * 100).toFixed(0)}%`,
      x,
      y - 5
    );
  }

  ctx.restore();
}

export function compressCanvasToDataURL(
  canvas: HTMLCanvasElement,
  quality: number = 0.7
): string {
  return canvas.toDataURL('image/jpeg', quality);
}

