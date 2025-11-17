'use client';

import { useDraft } from '@/lib/store';
import { litersFromFill } from '@/lib/math';
import { useMunicipalityTheme } from '@/contexts/ThemeContext';

export function FillGauge() {
  const { current, set } = useDraft();
  const { theme } = useMunicipalityTheme();

  if (!current) {
    return null;
  }

  const liters = litersFromFill(current.fillPercent, 120);

  return (
    <div className="grid gap-4">
      <div>
        <label 
          className="block text-sm mb-2"
          style={{ color: theme.textAccent + 'cc' }}
        >
          Fill Percentage: {current.fillPercent}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={current.fillPercent}
          onChange={(e) => {
            const fillPercent = parseInt(e.target.value, 10);
            set({
              fillPercent,
              litersEst: litersFromFill(fillPercent, 120),
            });
          }}
          className="w-full"
          style={{
            accentColor: theme.primary,
          }}
        />
      </div>

      <div 
        className="relative h-8 rounded-full overflow-hidden border"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
        }}
      >
        <div
          className="absolute inset-y-0 left-0 transition-all duration-300"
          style={{ 
            width: `${current.fillPercent}%`,
            backgroundColor: theme.primary,
          }}
        />
        <div 
          className="absolute inset-0 flex items-center justify-center text-xs font-bold"
          style={{ color: theme.textAccent }}
        >
          {current.fillPercent}%
        </div>
      </div>

      <p 
        className="text-sm text-center"
        style={{ color: theme.textAccent + 'cc' }}
      >
        Estimated: {liters}L / 120L
      </p>
    </div>
  );
}

