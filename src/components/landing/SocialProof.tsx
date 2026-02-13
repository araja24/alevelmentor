"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealSection } from "./RevealSection";

const stats = [
  { value: 2400, suffix: "+", label: "Students enrolled" },
  { value: 94, suffix: "%", label: "Hit target grade" },
  { value: 18, prefix: "+", suffix: "%", label: "Avg. score improvement" },
];

const quotes = [
  { text: "Went from B to A* in Chemistry in 8 weeks.", name: "Amara K." },
  { text: "The roadmap changed everything for me.", name: "James T." },
  { text: "I finally feel in control of my revision.", name: "Sofia L." },
];

function CountUpStat({ value, prefix = "", suffix = "", label }: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
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
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
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
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, value, prefersReduced]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-bold tabular-nums">
        {prefix}{display.toLocaleString()}{suffix}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="py-16 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-5xl">
        {/* Stats with count-up */}
        <RevealSection>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <CountUpStat
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* Mini quotes */}
        <RevealSection delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {quotes.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 max-w-xs card-hover"
              >
                <div className="shrink-0 mt-0.5">
                  <div className="h-6 w-6 rounded-full bg-[#5a35f8]/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#5a35f8]">
                      {q.name[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    &quot;{q.text}&quot;
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                    {q.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
