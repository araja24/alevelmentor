"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { ease, dur, viewport } from "@/lib/motion";

/* ── Inline count-up (IntersectionObserver + rAF) ── */
function CountUpValue({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const raw = eased * value;
      setDisplay(decimals > 0 ? parseFloat(raw.toFixed(decimals)) : Math.round(raw));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, value, decimals, prefersReduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? display.toFixed(decimals) : display}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 3,
    decimals: 0,
    suffix: "",
    label: "Subjects Supported",
    description: "Chemistry, Maths, and Physics — with more coming soon.",
  },
  {
    value: 100,
    decimals: 0,
    suffix: "%",
    label: "Syllabus Coverage",
    description: "Every topic mapped to your exam board, nothing missed.",
  },
  {
    value: 24,
    decimals: 0,
    suffix: "/7",
    label: "Always Available",
    description: "Your AI mentor is ready whenever you are.",
  },
];

export function ImpactStats() {
  return (
    <section className="py-32 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#5a35f8]/[0.04] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-4xl">
        {/* Vertically stacked stats — OPAL style */}
        <div className="space-y-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewport}
              transition={{ duration: dur.base, delay: i * 0.1, ease: ease.out }}
              className="text-center"
            >
              {/* Big Number — massive gradient text */}
              <p
                className="text-[80px] sm:text-[100px] lg:text-[120px] font-extrabold leading-none tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #e4e4e7 0%, #fafafa 30%, #a78bfa 60%, #5a35f8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUpValue
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>

              {/* Label */}
              <p className="text-lg sm:text-xl font-medium text-[#fafafa] mt-3">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-sm text-[#71717a] mt-2 max-w-md mx-auto">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
