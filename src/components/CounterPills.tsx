'use client';

import { useDraft } from '@/lib/store';
import { useMunicipalityTheme } from '@/contexts/ThemeContext';

export function CounterPills() {
  const { current, set } = useDraft();
  const { theme } = useMunicipalityTheme();

  if (!current) {
    return null;
  }

  const updateCount = (
    type: 'bottle' | 'cup' | 'utensils',
    delta: number
  ) => {
    const newCount = Math.max(0, current.counts[type] + delta);
    set({
      counts: {
        ...current.counts,
        [type]: newCount,
      },
    });
  };

  const pillStyle = {
    backgroundColor: theme.cardBg,
    borderColor: theme.border,
    color: theme.textAccent,
  };

  const buttonStyle = {
    backgroundColor: theme.primary,
    color: 'white',
  };

  const buttonHoverStyle = {
    backgroundColor: theme.primaryHover,
  };

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <div 
        className="flex items-center gap-2 rounded-full px-4 py-2 border"
        style={pillStyle}
      >
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={buttonStyle}
          onClick={() => updateCount('bottle', -1)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          −
        </button>
        <span className="min-w-[3rem] text-center" style={{ color: theme.textAccent }}>
          {current.counts.bottle} bottles
        </span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={buttonStyle}
          onClick={() => updateCount('bottle', 1)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          +
        </button>
      </div>

      <div 
        className="flex items-center gap-2 rounded-full px-4 py-2 border"
        style={pillStyle}
      >
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={buttonStyle}
          onClick={() => updateCount('cup', -1)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          −
        </button>
        <span className="min-w-[3rem] text-center" style={{ color: theme.textAccent }}>
          {current.counts.cup} cups
        </span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={buttonStyle}
          onClick={() => updateCount('cup', 1)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          +
        </button>
      </div>

      <div 
        className="flex items-center gap-2 rounded-full px-4 py-2 border"
        style={pillStyle}
      >
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={buttonStyle}
          onClick={() => updateCount('utensils', -1)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          −
        </button>
        <span className="min-w-[3rem] text-center" style={{ color: theme.textAccent }}>
          {current.counts.utensils} utensils
        </span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={buttonStyle}
          onClick={() => updateCount('utensils', 1)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

