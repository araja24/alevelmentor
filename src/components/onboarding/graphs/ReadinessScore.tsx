'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { StatBadge } from '@/components/ui/stat-badge';

interface Props {
  hours: number;
  weeksLeft: number;
}

export function ReadinessScore({ hours, weeksLeft }: Props) {
  const { score, label, variant, risk } = useMemo(() => {
    const base = Math.min(100, (hours / 20) * 60 + (weeksLeft / 20) * 40);
    const clamped = Math.round(Math.max(10, Math.min(100, base)));

    if (hours < 10) return { score: clamped, label: 'Low readiness', variant: 'warning' as const, risk: 'Insufficient revision time' };
    if (hours > 30) return { score: Math.min(clamped, 70), label: 'Burnout risk', variant: 'danger' as const, risk: 'Unsustainable pace' };
    if (clamped >= 75) return { score: clamped, label: 'Strong readiness', variant: 'success' as const, risk: null };
    return { score: clamped, label: 'Building readiness', variant: 'primary' as const, risk: null };
  }, [hours, weeksLeft]);

  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (score / 100) * circumference;

  const strokeColor =
    variant === 'success' ? '#22c55e' : variant === 'warning' ? '#f59e0b' : variant === 'danger' ? '#ef4444' : '#5a35f8';

  return (
    <AnalyticsCard glow className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[13px] font-semibold text-white/80">Readiness score</h4>
        <StatBadge variant={variant}>{label}</StatBadge>
      </div>

      <div className="flex items-center gap-6">
        {/* Circular gauge */}
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
            {score}
          </span>
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex justify-between text-xs">
            <span className="text-white/50">Hours/week</span>
            <span className="text-white font-medium">{hours}h</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/50">Weeks remaining</span>
            <span className="text-white font-medium">{weeksLeft}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/50">Total hours</span>
            <span className="text-white font-medium">{hours * weeksLeft}h</span>
          </div>
          {risk && (
            <p className="text-[10px] text-amber-400/80 mt-1">{risk}</p>
          )}
        </div>
      </div>
    </AnalyticsCard>
  );
}
