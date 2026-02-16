'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { StatBadge } from '@/components/ui/stat-badge';
import { GradeProjectionChart } from './graphs/GradeProjectionChart';
import { InfographicPanel } from './graphs/InfographicPanel';
import { ReadinessScore } from './graphs/ReadinessScore';
import type { OnboardingData } from '@/types/db';

interface Props {
  step: number;
  data: OnboardingData;
  mobile?: boolean;
}

export function AnalyticsPanel({ step, data, mobile }: Props) {
  const showInfographic = step === 4;
  const showReadiness = step === 5;
  const showProjection = step <= 3 || step === 5;

  const weeksUntilExam = useMemo(() => {
    const firstDate = Object.values(data.exam_dates)[0];
    if (!firstDate) return 20;
    const diff = new Date(firstDate).getTime() - Date.now();
    return Math.max(1, Math.round(diff / (7 * 24 * 60 * 60 * 1000)));
  }, [data.exam_dates]);

  const targetGrade = Object.values(data.target_grades)[0] ?? null;
  const yearGroup = data.year_group;

  return (
    <div className={`w-full ${mobile ? '' : 'max-w-[480px]'} space-y-5`}>
      <AnimatePresence mode="wait">
        {showInfographic ? (
          <motion.div
            key="infographic"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <InfographicPanel struggle={data.primary_struggle} />
          </motion.div>
        ) : (
          <motion.div
            key="projection"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {/* Grade projection chart */}
            <AnalyticsCard glow>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[13px] font-semibold text-white/80">Grade projection</h4>
                {targetGrade && <StatBadge variant="primary">{targetGrade} target</StatBadge>}
              </div>
              <GradeProjectionChart
                weeksUntilExam={weeksUntilExam}
                targetGrade={targetGrade}
                yearGroup={yearGroup}
                weeklyHours={data.weekly_revision_hours}
              />
            </AnalyticsCard>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <AnalyticsCard>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Weeks left</p>
                <p className="text-2xl font-bold text-white">{weeksUntilExam}</p>
              </AnalyticsCard>
              <AnalyticsCard>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Target</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9] bg-clip-text text-transparent">
                  {targetGrade ?? '—'}
                </p>
              </AnalyticsCard>
              <AnalyticsCard>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Hrs/week</p>
                <p className="text-2xl font-bold text-white">{data.weekly_revision_hours}</p>
              </AnalyticsCard>
            </div>

            {showReadiness && <ReadinessScore hours={data.weekly_revision_hours} weeksLeft={weeksUntilExam} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
