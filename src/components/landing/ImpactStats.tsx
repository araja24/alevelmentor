"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { ease, dur, viewport } from "@/lib/motion";

/* ── Inline count-up (IntersectionObserver + rAF) ── */
function CountUpStat({
  value,
  suffix = "",
  decimals = 0,
  label,
  className = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
    <div ref={ref} className={className}>
      <p className="text-4xl sm:text-5xl font-extrabold tabular-nums text-[#fafafa]">
        {decimals > 0 ? display.toFixed(decimals) : display.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-[#a1a1aa] mt-2">{label}</p>
    </div>
  );
}

const stats = [
  { value: 87, suffix: "%", label: "Feel more prepared" },
  { value: 3, suffix: "hrs", label: "Saved per week" },
];

export function ImpactStats() {
  return (
    <section className="py-32 px-6 relative">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <RevealSection className="text-center mb-16">
          <span className="pill-badge mb-4 inline-flex">Impact</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-4 text-[#fafafa]">
            <span className="gradient-text">What A Level Mentor does</span>
            <br />
            for students
          </h2>
        </RevealSection>

        {/* Hero stat */}
        <RevealSection delay={0.1} className="text-center mb-16">
          <CountUpStat
            value={2.4}
            decimals={1}
            suffix="x"
            label="more likely to hit target grades"
            className="[&_p:first-child]:text-7xl [&_p:first-child]:sm:text-8xl"
          />
        </RevealSection>

        {/* Three stat cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewport}
              transition={{ duration: dur.base, delay: i * 0.08 + 0.2, ease: ease.out }}
              className="rounded-2xl border border-[#27272a] bg-[#18181b] p-8 text-center card-hover"
            >
              <CountUpStat value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}

          {/* Text stat (A*-B) */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewport}
            transition={{ duration: dur.base, delay: 0.36, ease: ease.out }}
            className="rounded-2xl border border-[#27272a] bg-[#18181b] p-8 text-center card-hover"
          >
            <p className="text-4xl sm:text-5xl font-extrabold text-[#fafafa]">A*-B</p>
            <p className="text-sm text-[#a1a1aa] mt-2">Predicted grade range</p>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-[#52525b] text-center mt-6">
          *Projected metrics based on structured revision and spaced repetition research.
        </p>
      </div>
    </section>
  );
}
