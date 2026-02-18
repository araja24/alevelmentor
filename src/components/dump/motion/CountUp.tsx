"use client";

/**
 * CountUp — reusable number animation component.
 *
 * Triggers once when the element enters the viewport (30% threshold).
 * Uses requestAnimationFrame with cubic ease-out: feels fast at the start,
 * lands gently at the target.
 *
 * Respects prefers-reduced-motion: shows final value instantly.
 *
 * Usage:
 *   <CountUp value={94} suffix="%" className="text-4xl font-bold" />
 *   <CountUp value={2400} prefix="+" suffix="+" decimals={0} />
 */

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { dur } from "@/lib/motion";

interface CountUpProps {
  /** Target number to count to. */
  value: number;
  /** Text prepended before the number (e.g. "+"). */
  prefix?: string;
  /** Text appended after the number (e.g. "%", "+"). */
  suffix?: string;
  /** Decimal places to display. Default 0. */
  decimals?: number;
  /** Animation duration in seconds. Defaults to dur.count (1.2s). */
  animationDuration?: number;
  className?: string;
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  animationDuration = dur.count,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const prefersReduced = useReducedMotion();

  // Start animation once element enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Run count-up animation
  useEffect(() => {
    if (!started) return;

    // Reduced motion: snap to final value immediately
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const ms = animationDuration * 1000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ms, 1);
      // Cubic ease-out: fast at start, gentle landing
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    const frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [started, value, prefersReduced, animationDuration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
