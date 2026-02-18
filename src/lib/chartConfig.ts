/**
 * Shared chart configuration — matches landing page analytics exactly.
 * Used in onboarding, dashboard, and app analytics.
 */

export const CHART_COLORS = {
  primary: '#533fec',
  primaryLight: '#533fec',
  cyan: '#3ed6ff',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  grid: 'rgba(128,128,128,0.1)',
  tick: '#71717a',
  tooltipBg: 'rgba(18,18,22,0.96)',
  tooltipBorder: 'rgba(83,63,236,0.25)',
  barCursor: 'rgba(83,63,236,0.06)',
} as const;

export const CHART_TYPOGRAPHY = {
  tickFontSize: 11,
  tooltipFontSize: 12,
  labelFontSize: 13,
} as const;

export const CHART_GRID = {
  strokeDasharray: '3 3',
  stroke: CHART_COLORS.grid,
} as const;

export const CHART_TOOLTIP_STYLE = {
  backgroundColor: CHART_COLORS.tooltipBg,
  border: `1px solid ${CHART_COLORS.tooltipBorder}`,
  borderRadius: '12px',
  fontSize: `${CHART_TYPOGRAPHY.tooltipFontSize}px`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  color: '#fff',
  padding: '10px 14px',
} as const;

export const CHART_ANIMATION = {
  areaDuration: 2000,
  areaBegin: 300,
  barDuration: 1500,
  barBegin: 500,
  easing: 'ease-out',
  trajectoryDuration: 1300,
} as const;

export const GRADIENT_DEFS = {
  primaryAreaId: 'primaryAreaGradient',
  primaryAreaStops: [
    { offset: '0%', color: '#533fec', opacity: 0.3 },
    { offset: '100%', color: '#533fec', opacity: 0 },
  ],
} as const;

export const CARD_STYLES = {
  background: 'linear-gradient(145deg, rgba(16,16,18,0.97) 0%, rgba(10,10,12,0.97) 100%)',
  border: '1px solid rgba(255,255,255,0.06)',
  shadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
  radius: '20px',
} as const;

export const BADGE_VARIANTS = {
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
  },
  danger: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-500',
  },
  primary: {
    bg: 'bg-[#533fec]/10',
    border: 'border-[#533fec]/25',
    text: 'text-[#533fec]',
    dot: 'bg-[#533fec]',
  },
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;
