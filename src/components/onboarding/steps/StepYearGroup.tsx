'use client';

import type { YearGroup } from '@/types/db';
import { OptionCard } from '../OptionCard';

interface Props {
  value: YearGroup | null;
  onChange: (v: YearGroup) => void;
}

export function StepYearGroup({ value, onChange }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">What year are you in?</h2>
      <p className="text-sm text-white/50 mb-6">This determines the urgency and pacing of your plan.</p>
      <div className="grid grid-cols-2 gap-3">
        {(['12', '13'] as const).map((y) => (
          <OptionCard key={y} selected={value === y} onClick={() => onChange(y)}>
            <p className="text-lg font-bold text-white text-center">Year {y}</p>
            <p className="text-xs text-white/50 text-center mt-1">
              {y === '12' ? 'Building foundations' : 'Final push'}
            </p>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
