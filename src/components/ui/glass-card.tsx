import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function GlassCard({
  children,
  className,
  gradient = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl",
        gradient &&
          "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-tr before:from-[var(--accent-2)]/10 before:via-transparent before:to-[#3ed6ff]/5",
        className
      )}
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--glass-border)",
        boxShadow: "var(--card-shadow, 0 25px 50px -12px rgba(0,0,0,0.25))",
      }}
      {...props}
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl ring-1 ring-inset pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px var(--card-ring)" }}
      />
      {children}
    </div>
  );
}
