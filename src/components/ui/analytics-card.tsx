import { cn } from '@/lib/utils';
import { CARD_STYLES } from '@/lib/chartConfig';

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
        background: CARD_STYLES.background,
        border: CARD_STYLES.border,
        boxShadow: CARD_STYLES.shadow,
      }}
      {...props}
    >
      {glow && (
        <div
          className="absolute -inset-6 -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(90,53,248,0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      )}
      <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/5 pointer-events-none" />
      {children}
    </div>
  );
}
