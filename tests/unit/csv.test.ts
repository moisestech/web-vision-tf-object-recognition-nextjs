import { inspectionsToCsv } from '@/lib/csv';
import { describe, it, expect } from 'vitest';

describe('csv', () => {
  it('creates header and rows', () => {
    const csv = inspectionsToCsv([
      {
        id: '1',
        createdAt: '2025-01-01',
        municipalityId: 'demo',
        counts: { bottle: 1, cup: 2, utensils: 3 },
        fillPercent: 40,
        litersEst: 48,
        imageAnonymizedDataUrl: 'data:image/jpeg;base64,xyz',
      } as any,
    ]);
    expect(csv.split('\n')[0]).toMatch('id,createdAt,municipalityId');
  });
});

