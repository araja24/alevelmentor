'use client';

import * as React from 'react';
import { Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { CHART_TOOLTIP_STYLE } from '@/lib/chartConfig';

export type ChartConfig = Record<
  string,
  { label: string; color?: string; icon?: React.ComponentType<{ className?: string }> }
>;

function configToStyle(config: ChartConfig): React.CSSProperties {
  const style: React.CSSProperties = {};
  Object.entries(config).forEach(([key, entry]) => {
    if (entry?.color) {
      (style as Record<string, string>)[`--color-${key}`] = entry.color;
    }
  });
  return style;
}

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

export function ChartContainer({ config, className, children }: ChartContainerProps) {
  return (
    <div className={cn('w-full', className)} style={configToStyle(config)}>
      {children}
    </div>
  );
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; dataKey: string; color?: string; payload?: Record<string, unknown> }>;
  label?: string;
  labelFormatter?: (label: unknown) => React.ReactNode;
  formatter?: (value: unknown, name: string, item: unknown) => [React.ReactNode, React.ReactNode] | React.ReactNode;
  className?: string;
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  className,
  hideLabel,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;
  const displayLabel = hideLabel ? null : labelFormatter ? labelFormatter(label) : label;
  return (
    <div
      className={cn('rounded-xl border px-3 py-2.5 text-xs shadow-lg', className)}
      style={{
        ...CHART_TOOLTIP_STYLE,
        backgroundColor: CHART_TOOLTIP_STYLE.backgroundColor,
        border: CHART_TOOLTIP_STYLE.border,
        borderRadius: CHART_TOOLTIP_STYLE.borderRadius,
        fontSize: CHART_TOOLTIP_STYLE.fontSize,
        color: CHART_TOOLTIP_STYLE.color,
        padding: CHART_TOOLTIP_STYLE.padding,
        boxShadow: CHART_TOOLTIP_STYLE.boxShadow,
      }}
    >
      {displayLabel != null && <div className="font-medium mb-1.5">{displayLabel}</div>}
      <div className="flex flex-col gap-1">
        {payload.map((item, i) => {
          const value = item.value;
          let formatted: React.ReactNode = value;
          if (formatter) {
            const result = formatter(value, item.name, item);
            formatted = Array.isArray(result) ? result[0] : result;
          }
          return (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color ?? 'var(--text-secondary)' }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
              </span>
              <span className="font-medium tabular-nums">{formatted}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type ChartTooltipProps = Omit<React.ComponentProps<typeof Tooltip>, 'content'> & {
  content?: React.ReactNode;
};

export function ChartTooltip({ content, ...props }: ChartTooltipProps) {
  return <Tooltip content={content as React.ComponentProps<typeof Tooltip>['content']} {...props} />;
}
