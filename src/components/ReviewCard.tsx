'use client';

import { useDraft } from '@/lib/store';
import { InspectionSchema } from '@/lib/schemas';
import { saveInspection } from '@/lib/data';
import { getMunicipality } from '@/lib/constants';
import { log } from '@/lib/utils/logger';
import { useRouter } from 'next/navigation';
import { CounterPills } from './CounterPills';
import { FillGauge } from './FillGauge';
import { useMunicipalityTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ReviewCard() {
  const router = useRouter();
  const { current, reset } = useDraft();
  const { theme } = useMunicipalityTheme();

  if (!current) {
    return (
      <div className="p-6 text-center">
        <p>No draft. Go to Scan.</p>
        <button
          className="btn mt-4"
          onClick={() => router.push('/scan')}
        >
          Go to Scanner
        </button>
      </div>
    );
  }

  async function onSave() {
    if (!current) return;
    
    const municipality = getMunicipality(current.municipalityId);
    log.info('review', 'Saving inspection', { 
      municipalityId: current.municipalityId,
      municipalityName: municipality?.name,
      counts: current.counts,
      fillPercent: current.fillPercent 
    });

    try {
      const inspection = InspectionSchema.parse({
        id: current.id,
        createdAt: current.createdAt,
        municipalityId: current.municipalityId,
        counts: current.counts,
        fillPercent: current.fillPercent,
        litersEst: current.litersEst,
        imageAnonymizedDataUrl: current.imgDataUrl,
      });

      await saveInspection(inspection);
      log.info('review', 'Inspection saved successfully', { id: inspection.id });
      reset();
      router.push('/admin');
    } catch (error) {
      log.error('review', 'Failed to save inspection', error instanceof Error ? error : new Error(String(error)), { 
        municipalityId: current.municipalityId 
      });
      alert('Failed to save inspection. Please check all fields.');
    }
  }

  const municipality = getMunicipality(current.municipalityId);

  return (
    <div className="grid gap-4 max-w-xl mx-auto">
      {municipality && (
        <Card
          className="p-3"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
          }}
        >
          <p className="text-sm">
            <span style={{ color: theme.textAccent + '99' }}>Municipality:</span>{' '}
            <span 
              className="font-semibold"
              style={{ color: theme.textAccent }}
            >
              {municipality.name}
            </span>
            {municipality.description && (
              <span 
                className="text-xs ml-2"
                style={{ color: theme.textAccent + '99' }}
              >
                ({municipality.description})
              </span>
            )}
          </p>
        </Card>
      )}

      <img
        src={current.imgDataUrl}
        className="rounded-2xl w-full border"
        style={{ borderColor: theme.border }}
        alt="anonymized capture"
      />

      <CounterPills />
      <FillGauge />

      <div className="flex gap-2 justify-between">
        <Button
          variant="outline"
          onClick={() => router.push('/scan')}
          style={{
            borderColor: theme.border,
            color: theme.textAccent,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.cardBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Back
        </Button>
        <Button 
          onClick={onSave}
          style={{
            backgroundColor: theme.primary,
            color: 'white',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

