"use client";

import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const prefersReduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const meshGradient = isLight
    ? "linear-gradient(135deg, rgba(83,63,236,0.04) 0%, transparent 30%, transparent 50%, transparent 70%, rgba(83,63,236,0.02) 100%)"
    : "linear-gradient(135deg, rgba(90,53,248,0.35) 0%, transparent 30%, rgba(139,108,249,0.25) 50%, transparent 70%, rgba(99,102,241,0.18) 100%)";

  const orb1 = isLight ? "radial-gradient(circle, rgba(83,63,236,0.06) 0%, transparent 70%)" : "radial-gradient(circle, rgba(90,53,248,0.4) 0%, transparent 70%)";
  const orb2 = isLight ? "radial-gradient(circle, rgba(83,63,236,0.04) 0%, transparent 70%)" : "radial-gradient(circle, rgba(139,108,249,0.35) 0%, transparent 70%)";
  const orb3 = isLight ? "radial-gradient(circle, rgba(83,63,236,0.03) 0%, transparent 70%)" : "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)";

  return (
    <div className="animated-bg fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base background — adapts to theme */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated layers are disabled for users who prefer reduced motion. On small screens, fewer layers (see .animated-bg-reduce) for performance. */}
      {!prefersReduced && (
        <>
          {/* Slow drifting gradient mesh — purple in light and dark */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.06] animate-gradient-drift"
            style={{
              background: meshGradient,
              backgroundSize: "200% 200%",
            }}
          />

          {/* Aurora orbs — purple in light and dark. orb-2 and orb-3 hidden on small screens via CSS. */}
          <div
            className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.05] dark:opacity-15 animate-aurora"
            style={{ background: orb1 }}
          />
          <div
            className="animated-bg-reduce absolute top-1/3 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.04] dark:opacity-12 animate-aurora"
            style={{
              background: orb2,
              animationDelay: "-7s",
              animationDuration: "25s",
            }}
          />
          <div
            className="animated-bg-reduce absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full opacity-[0.03] dark:opacity-10 animate-aurora"
            style={{
              background: orb3,
              animationDelay: "-13s",
              animationDuration: "22s",
            }}
          />

          {/* Floating dot particles — hidden on small screens via .animated-bg-reduce */}
          <div className="animated-bg-reduce absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-[var(--accent-2)]/25 animate-float-drift" />
          <div
            className="animated-bg-reduce absolute top-2/3 right-1/3 h-1.5 w-1.5 rounded-full bg-[var(--accent-2)]/20 animate-float-drift"
            style={{ animationDelay: "-3s", animationDuration: "14s" }}
          />
          <div
            className="animated-bg-reduce absolute top-1/2 left-2/3 h-1 w-1 rounded-full bg-[var(--accent-2-dark)]/20 animate-float-drift"
            style={{ animationDelay: "-5s", animationDuration: "16s" }}
          />
          <div
            className="animated-bg-reduce absolute top-[15%] right-[20%] h-0.5 w-0.5 rounded-full bg-[var(--accent-2)]/20 animate-float-drift"
            style={{ animationDelay: "-8s", animationDuration: "18s" }}
          />
          <div
            className="animated-bg-reduce absolute top-[80%] left-[15%] h-1 w-1 rounded-full bg-[var(--accent-2-dark)]/15 animate-float-drift"
            style={{ animationDelay: "-2s", animationDuration: "15s" }}
          />

          {/* Rising particles — hidden on small screens via .animated-bg-reduce */}
          <div
            className="animated-bg-reduce absolute bottom-0 left-[20%] h-1 w-1 rounded-full bg-[var(--accent-2)]/[0.08] dark:bg-[var(--accent-2)]/18 animate-particle-rise"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="animated-bg-reduce absolute bottom-0 left-[50%] h-0.5 w-0.5 rounded-full bg-[var(--accent-2-dark)]/[0.08] dark:bg-[var(--accent-2-dark)]/18 animate-particle-rise"
            style={{ animationDelay: "-6s", animationDuration: "22s" }}
          />
          <div
            className="animated-bg-reduce absolute bottom-0 right-[25%] h-1 w-1 rounded-full bg-[var(--accent-2)]/[0.06] dark:bg-[var(--accent-2)]/16 animate-particle-rise"
            style={{ animationDelay: "-12s", animationDuration: "20s" }}
          />
        </>
      )}

      {/* Noise texture overlay — lighter in light mode */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      >
        <filter id="bg-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-noise)" />
      </svg>

      {/* Grid pattern overlay — subtler in light mode */}
      <div
        className="absolute inset-0 opacity-[0.012] dark:opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(90,53,248,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(90,53,248,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top/bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}
