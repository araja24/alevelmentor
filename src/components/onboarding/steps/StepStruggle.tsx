'use client';

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
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">What&apos;s holding you back?</h2>
      <p className="text-sm text-white/50 mb-6">Be honest. We&apos;ll build your plan around it.</p>

      <div className="space-y-2.5">
        {OPTIONS.map((o) => (
          <OptionCard key={o} selected={value === o} onClick={() => onChange(o)}>
            <p className="text-sm font-medium text-white text-center">{o}</p>
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
            className="mt-6 p-4 rounded-xl bg-[#5a35f8]/10 border border-[#5a35f8]/20"
          >
            <p className="text-[32px] font-bold bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9] bg-clip-text text-transparent">
              {INFOGRAPHICS[value].stat}
            </p>
            <p className="text-sm text-white/70 mt-1 leading-relaxed">{INFOGRAPHICS[value].message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
