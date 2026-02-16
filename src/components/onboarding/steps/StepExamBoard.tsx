'use client';

import type { ExamBoard } from '@/types/db';
import { OptionCard } from '../OptionCard';

const BOARDS: { name: ExamBoard; enabled: boolean }[] = [
  { name: 'Edexcel', enabled: true },
  { name: 'AQA', enabled: false },
  { name: 'OCR', enabled: false },
];

interface Props {
  value: ExamBoard | null;
  onChange: (v: ExamBoard) => void;
}

export function StepExamBoard({ value, onChange }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">What exam board are you studying?</h2>
      <p className="text-sm text-white/50 mb-6">Your roadmap is tailored to the exact specification.</p>
      <div className="space-y-3">
        {BOARDS.map((b) => (
          <OptionCard
            key={b.name}
            selected={value === b.name}
            onClick={() => b.enabled && onChange(b.name)}
            disabled={!b.enabled}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">{b.name}</p>
              {!b.enabled && (
                <span className="text-[10px] text-white/30 uppercase tracking-wider">Coming soon</span>
              )}
              {b.enabled && value === b.name && (
                <div className="w-5 h-5 rounded-full bg-[#5a35f8] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
