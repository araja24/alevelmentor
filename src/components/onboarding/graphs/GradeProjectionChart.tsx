'use client';

import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  CHART_COLORS,
  CHART_TYPOGRAPHY,
  CHART_GRID,
  CHART_TOOLTIP_STYLE,
  CHART_ANIMATION,
  GRADIENT_DEFS,
} from '@/lib/chartConfig';
import type { TargetGrade, YearGroup } from '@/types/db';

const GRADE_TO_PCT: Record<string, number> = { 'A*': 90, A: 78, B: 68, C: 58 };
const GRADE_LABELS = ['U', 'D', 'C', 'B', 'A', 'A*'];
const GRADE_TICKS = [30, 45, 55, 65, 75, 90];

function generateProjection(
  weeks: number,
  target: string | null,
  yearGroup: YearGroup | null,
  weeklyHours: number
): { week: string; projected: number; baseline: number }[] {
  const targetPct = target ? (GRADE_TO_PCT[target] ?? 70) : 70;
  const startPct = 35;
  const points: { week: string; projected: number; baseline: number }[] = [];

  const steepness = yearGroup === '13' ? 1.4 : 1.0;
  const hoursFactor = Math.min(1.3, weeklyHours / 15);

  for (let i = 0; i <= Math.min(weeks, 30); i += Math.max(1, Math.floor(weeks / 12))) {
    const t = i / Math.max(weeks, 1);
    const easedT = 1 - Math.pow(1 - t, 2.2 * steepness);
    const projected = startPct + (targetPct - startPct) * easedT * hoursFactor;
    const baseline = startPct + (targetPct * 0.6 - startPct) * t;

    points.push({
      week: `W${i}`,
      projected: Math.round(Math.min(100, projected)),
      baseline: Math.round(baseline),
    });
  }

  if (points.length > 0 && points[points.length - 1].week !== `W${weeks}`) {
    const t = 1;
    const easedT = 1 - Math.pow(1 - t, 2.2 * steepness);
    points.push({
      week: `W${weeks}`,
      projected: Math.round(Math.min(100, startPct + (targetPct - startPct) * easedT * hoursFactor)),
      baseline: Math.round(startPct + (targetPct * 0.6 - startPct)),
    });
  }

  return points;
}

interface Props {
  weeksUntilExam: number;
  targetGrade: TargetGrade | null;
  yearGroup: YearGroup | null;
  weeklyHours: number;
}

export function GradeProjectionChart({ weeksUntilExam, targetGrade, yearGroup, weeklyHours }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const chartData = useMemo(
    () => generateProjection(weeksUntilExam, targetGrade, yearGroup, weeklyHours),
    [weeksUntilExam, targetGrade, yearGroup, weeklyHours]
  );

  const targetLine = targetGrade ? GRADE_TO_PCT[targetGrade] ?? 70 : null;
  const noAnimation = !!prefersReducedMotion;

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id={GRADIENT_DEFS.primaryAreaId} x1="0" y1="0" x2="0" y2="1">
              {GRADIENT_DEFS.primaryAreaStops.map((s) => (
                <stop key={s.offset} offset={s.offset} stopColor={s.color} stopOpacity={s.opacity} />
              ))}
            </linearGradient>
          </defs>
          <CartesianGrid {...CHART_GRID} vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: CHART_COLORS.tick, fontSize: CHART_TYPOGRAPHY.tickFontSize }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[20, 100]}
            ticks={GRADE_TICKS}
            tickFormatter={(v: number) => GRADE_LABELS[GRADE_TICKS.indexOf(v)] ?? ''}
            tick={{ fill: CHART_COLORS.tick, fontSize: CHART_TYPOGRAPHY.tickFontSize }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [`${v}%`, '']} />

          {targetLine && (
            <Area
              type="monotone"
              dataKey={() => targetLine}
              stroke={CHART_COLORS.success}
              strokeDasharray="6 4"
              strokeWidth={1}
              fill="none"
              isAnimationActive={false}
              name="Target"
            />
          )}

          <Area
            type="monotone"
            dataKey="baseline"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
            isAnimationActive={!noAnimation}
            animationDuration={CHART_ANIMATION.areaDuration}
            animationBegin={CHART_ANIMATION.areaBegin}
            animationEasing={CHART_ANIMATION.easing as any}
            name="Without plan"
          />

          <Area
            type="monotone"
            dataKey="projected"
            stroke={CHART_COLORS.primary}
            strokeWidth={2.5}
            fill={`url(#${GRADIENT_DEFS.primaryAreaId})`}
            isAnimationActive={!noAnimation}
            animationDuration={CHART_ANIMATION.areaDuration}
            animationBegin={0}
            animationEasing={CHART_ANIMATION.easing as any}
            name="With A-Level Mentor"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
