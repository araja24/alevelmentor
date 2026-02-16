'use client';

import { useCallback } from 'react';
import type { YearGroup } from '@/types/db';
import { OptionCard } from '../OptionCard';

interface Props {
  value: YearGroup | null;
  onChange: (v: YearGroup) => void;
}

export function StepYearGroup({ value, onChange }: Props) {
  const handleSelect = useCallback((v: YearGroup) => onChange(v), [onChange]);
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>What year are you in?</h2>
      <p className="text-sm text-muted mb-6">This determines the urgency and pacing of your plan.</p>
      <div className="grid grid-cols-2 gap-3">
        {(['12', '13'] as const).map((y) => (
          <OptionCard key={y} selected={value === y} onClick={() => handleSelect(y)}>
            <p className="text-lg font-bold text-center" style={{ color: 'var(--text-primary)' }}>Year {y}</p>
            <p className="text-xs text-muted text-center mt-1">
              {y === '12' ? 'Building foundations' : 'Final push'}
            </p>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
