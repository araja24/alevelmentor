import { cn } from '@/lib/utils';

interface AnalyticsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function AnalyticsCard({ children, className, glow = false, ...props }: AnalyticsCardProps) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-[20px] p-5', className)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--card-shadow)',
      }}
      {...props}
    >
      {glow && (
        <div
          className="absolute -inset-6 -z-10 pointer-events-none analytics-card-glow"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-2) 12%, transparent) 0%, transparent 70%)',
          }}
        />
      )}
      <div
        className="absolute inset-0 rounded-[20px] ring-1 ring-inset pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px var(--card-ring)' }}
      />
      {children}
    </div>
  );
}
