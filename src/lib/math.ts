import { BASKET_MAX_LITERS } from './constants';

export function litersFromFill(
  fillPercent: number,
  maxLiters: number = BASKET_MAX_LITERS
): number {
  const clamped = Math.max(0, Math.min(100, fillPercent));
  return Math.round((clamped / 100) * maxLiters);
}

export function tallyByClass(
  dets: { class: string }[]
): { bottle: number; cup: number; utensils: number } {
  const counts = { bottle: 0, cup: 0, utensils: 0 };

  for (const det of dets) {
    if (det.class === 'bottle') {
      counts.bottle++;
    } else if (det.class === 'cup') {
      counts.cup++;
    } else if (['fork', 'knife', 'spoon'].includes(det.class)) {
      counts.utensils++;
    }
  }

  return counts;
}

