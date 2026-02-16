import { cn } from '@/lib/utils';
import { BADGE_VARIANTS, type BadgeVariant } from '@/lib/chartConfig';

interface StatBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export function StatBadge({ variant, children, dot = true, className }: StatBadgeProps) {
  const v = BADGE_VARIANTS[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        v.bg,
        v.border,
        v.text,
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', v.dot)} />}
      {children}
    </span>
  );
}
