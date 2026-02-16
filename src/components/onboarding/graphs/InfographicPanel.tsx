'use client';

import { motion } from 'framer-motion';
import { AnalyticsCard } from '@/components/ui/analytics-card';
import { StatBadge } from '@/components/ui/stat-badge';
import type { PrimaryStruggle } from '@/types/db';
import { CheckCircle, Flame, Clock, Brain, BarChart3 } from 'lucide-react';

const STRUGGLE_CONFIGS: Record<PrimaryStruggle, {
  icon: typeof CheckCircle;
  title: string;
  description: string;
  visual: 'checklist' | 'heatmap' | 'workload' | 'timeline' | 'balance';
}> = {
  Procrastination: {
    icon: CheckCircle,
    title: 'Focus streak preview',
    description: 'We tell you exactly what to study, removing all decision fatigue.',
    visual: 'checklist',
  },
  'Lack of structure': {
    icon: BarChart3,
    title: 'Structured weekly plan',
    description: 'Every hour mapped. Every topic scheduled. Zero guesswork.',
    visual: 'timeline',
  },
  'Poor revision techniques': {
    icon: Brain,
    title: 'Evidence-based methods',
    description: 'Spaced repetition, active recall, and interleaving — built in.',
    visual: 'heatmap',
  },
  'Time management': {
    icon: Clock,
    title: 'Optimised time allocation',
    description: 'We prioritise weak topics and high-weight content first.',
    visual: 'timeline',
  },
  Burnout: {
    icon: Flame,
    title: 'Balanced workload',
    description: 'Pacing that peaks at the right moment, not too early.',
    visual: 'balance',
  },
};

const taskEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ChecklistVisual() {
  const tasks = ['Quadratics — Practice set A', 'Integration by parts', 'Past paper: June 2023 P1', 'Statistics: Hypothesis testing'];
  return (
    <div className="space-y-2 mt-4">
      {tasks.map((task, i) => (
        <motion.div
          key={task}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.35, ease: taskEase }}
          className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.3, ease: taskEase }}
            className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0"
          >
            <CheckCircle className="w-3 h-3 text-emerald-400" />
          </motion.div>
          <span className="text-xs text-white/70">{task}</span>
        </motion.div>
      ))}
    </div>
  );
}

function HeatmapVisual() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = 4;
  return (
    <div className="mt-4 space-y-1.5">
      <div className="flex gap-1 ml-8">
        {Array.from({ length: weeks }).map((_, w) => (
          <span key={w} className="text-[9px] text-white/30 w-6 text-center">W{w + 1}</span>
        ))}
      </div>
      {days.map((day, di) => (
        <div key={day} className="flex items-center gap-1">
          <span className="text-[9px] text-white/30 w-7">{day}</span>
          {Array.from({ length: weeks }).map((_, wi) => {
            const intensity = Math.random();
            return (
              <motion.div
                key={wi}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (di * weeks + wi) * 0.03, duration: 0.3 }}
                className="w-6 h-6 rounded-[4px]"
                style={{
                  background: intensity > 0.7
                    ? 'rgba(90,53,248,0.5)'
                    : intensity > 0.4
                      ? 'rgba(90,53,248,0.25)'
                      : 'rgba(90,53,248,0.08)',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function WorkloadBalanceVisual() {
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
  const heights = [40, 55, 50, 60, 55, 45];
  return (
    <div className="mt-4 flex items-end gap-2 justify-center h-24">
      {weeks.map((w, i) => (
        <div key={w} className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: heights[i] }}
            transition={{ delay: i * 0.1, duration: 0.75, ease: 'easeOut' }}
            className="w-8 rounded-t-md"
            style={{
              background: `linear-gradient(180deg, #5a35f8 0%, #8b6cf9 100%)`,
              opacity: 0.8,
            }}
          />
          <span className="text-[9px] text-white/30">{w}</span>
        </div>
      ))}
    </div>
  );
}

function TimelineVisual() {
  const blocks = [
    { topic: 'Algebra', width: '65%', color: '#5a35f8' },
    { topic: 'Calculus', width: '80%', color: '#8b6cf9' },
    { topic: 'Statistics', width: '45%', color: '#3ed6ff' },
    { topic: 'Mechanics', width: '55%', color: '#5a35f8' },
  ];
  return (
    <div className="mt-4 space-y-2.5">
      {blocks.map((b, i) => (
        <div key={b.topic} className="space-y-1">
          <span className="text-[10px] text-white/50">{b.topic}</span>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: b.width }}
              transition={{ delay: i * 0.1, duration: 0.75, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: b.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface Props {
  struggle: PrimaryStruggle | null;
}

export function InfographicPanel({ struggle }: Props) {
  if (!struggle) {
    return (
      <AnalyticsCard glow className="p-6">
        <p className="text-sm text-white/40 text-center py-12">
          Select what&apos;s holding you back to see how we&apos;ll help.
        </p>
      </AnalyticsCard>
    );
  }

  const config = STRUGGLE_CONFIGS[struggle];
  const Icon = config.icon;

  const VisualComponent = {
    checklist: ChecklistVisual,
    heatmap: HeatmapVisual,
    workload: WorkloadBalanceVisual,
    timeline: TimelineVisual,
    balance: WorkloadBalanceVisual,
  }[config.visual];

  return (
    <AnalyticsCard glow className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 rounded-[10px] bg-gradient-to-br from-[#5a35f8] to-[#8b6cf9] flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="text-[13px] font-semibold text-white">{config.title}</h4>
          <p className="text-[11px] text-white/50">{config.description}</p>
        </div>
      </div>
      <StatBadge variant="primary" className="mb-2">How we solve this</StatBadge>
      <VisualComponent />
    </AnalyticsCard>
  );
}
