import { describe, it, expect } from 'vitest';
import { litersFromFill, tallyByClass } from '@/lib/math';

describe('math', () => {
  it('litersFromFill clamps and scales', () => {
    expect(litersFromFill(-10, 100)).toBe(0);
    expect(litersFromFill(50, 100)).toBe(50);
    expect(litersFromFill(150, 100)).toBe(100);
  });

  it('tallyByClass merges utensils', () => {
    const dets = [
      { class: 'fork' },
      { class: 'spoon' },
      { class: 'bottle' },
    ];
    expect(tallyByClass(dets)).toEqual({ bottle: 1, cup: 0, utensils: 2 });
  });
});

