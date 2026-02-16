'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PrimaryStruggle } from '@/types/db';
import { OptionCard } from '../OptionCard';

const OPTIONS: PrimaryStruggle[] = [
  'Procrastination',
  'Lack of structure',
  'Poor revision techniques',
  'Time management',
  'Burnout',
];

const INFOGRAPHICS: Record<PrimaryStruggle, { stat: string; message: string }> = {
  Procrastination: {
    stat: '82%',
    message: 'of students struggle with procrastination. We remove decision fatigue by telling you exactly what to study next.',
  },
  'Lack of structure': {
    stat: '73%',
    message: "of students don't fail from lack of effort — they fail from lack of structure. We fix that.",
  },
  'Poor revision techniques': {
    stat: '68%',
    message: 'of students use ineffective revision methods. We apply proven, evidence-based techniques for you.',
  },
  'Time management': {
    stat: '77%',
    message: 'of students underestimate time needed. We build a realistic, week-by-week plan that fits your life.',
  },
  Burnout: {
    stat: '61%',
    message: 'of students burn out before exams. We pace your revision to peak at the right moment.',
  },
};

interface Props {
  value: PrimaryStruggle | null;
  onChange: (v: PrimaryStruggle) => void;
}

export function StepStruggle({ value, onChange }: Props) {
  const handleSelect = useCallback((v: PrimaryStruggle) => onChange(v), [onChange]);
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>What&apos;s holding you back?</h2>
      <p className="text-sm text-muted mb-6">Be honest. We&apos;ll build your plan around it.</p>

      <div className="space-y-2.5">
        {OPTIONS.map((o) => (
          <OptionCard key={o} selected={value === o} onClick={() => handleSelect(o)}>
            <p className="text-sm font-medium text-center" style={{ color: 'var(--text-primary)' }}>{o}</p>
          </OptionCard>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {value && (
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 p-4 rounded-xl border"
            style={{
              background: 'color-mix(in srgb, var(--accent-2) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--accent-2) 20%, transparent)',
            }}
          >
            <p className="text-[32px] font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--accent-2), var(--accent-2-dark))' }}>
              {INFOGRAPHICS[value].stat}
            </p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{INFOGRAPHICS[value].message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
