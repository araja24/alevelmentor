'use client';

import { cn } from '@/lib/utils';

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  height?: number;
  title?: string;
  badge?: React.ReactNode;
}

export function ChartContainer({ children, className, height = 256, title, badge }: ChartContainerProps) {
  return (
    <div className={cn('w-full', className)}>
      {(title || badge) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h4 className="text-[13px] font-semibold text-white/80">{title}</h4>}
          {badge}
        </div>
      )}
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </div>
  );
}
