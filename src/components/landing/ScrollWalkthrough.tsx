"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { RevealSection } from "./RevealSection";
import { dur } from "@/lib/motion";

// ─── Count-up hook (local — for scroll-triggered variant) ─────────────────────

function useCountUp(target: number, active: boolean, duration = dur.count) {
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let frameId: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, duration, prefersReduced, target]);

  return Math.round(value);
}

// ─── BarColumn ────────────────────────────────────────────────────────────────
// Extracted into its own component so hooks are called at the top level —
// not inside a .map() — which would violate React's rules of hooks.

function BarColumn({
  value,
  weekIndex,
  scrollYProgress,
}: {
  value: number;
  weekIndex: number;
  scrollYProgress: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();
  const baseDelay = weekIndex * 0.12;

  // All hooks called unconditionally at top level of this component
  const barScale = useTransform(
    scrollYProgress,
    [0.25 + baseDelay / 2, 0.8],
    [0, 1]
  );
  const barOpacity = useTransform(barScale, [0, 1], [0.3, 1]);

  return (
    <motion.div
      className="rounded-2xl border border-border bg-muted/30 px-3 py-3 flex flex-col gap-2"
      style={prefersReduced ? undefined : { opacity: barOpacity }}
    >
      <p className="text-[11px] text-muted-foreground">Week {weekIndex + 4}</p>
      <div className="flex-1 flex items-end">
        <div className="w-full h-12 rounded-lg bg-muted/60 overflow-hidden">
          <motion.div
            className="w-full h-full rounded-lg bg-gradient-to-t from-[#5a35f8] to-[#8b6cf9]"
            style={{
              transformOrigin: "bottom",
              scaleY: prefersReduced ? 1 : barScale,
            }}
          />
        </div>
      </div>
      <p className="text-xs font-semibold text-foreground">{value}% avg</p>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const linePath =
  "M4 64 Q 40 54 72 52 Q 104 48 136 40 Q 168 32 200 30 Q 232 28 264 22 Q 296 16 328 10";

const BAR_DATA = [72, 84, 93] as const;

export function ScrollWalkthrough() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Dashboard entrance
  const dashboardY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const dashboardScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  // SVG line draw
  const chartProgress = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  // Feature card opacity (scroll-linked)
  const featureOne = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const featureTwo = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const featureThree = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);

  // Y offsets derived from opacity transforms — all defined unconditionally
  const featureOneY = useTransform(featureOne, [0, 1], [12, 0]);
  const featureTwoY = useTransform(featureTwo, [0, 1], [12, 0]);
  const featureThreeY = useTransform(featureThree, [0, 1], [12, 0]);

  // Count-up trigger
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setStatsActive(true);
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > 0.25) setStatsActive(true);
    });

    return () => unsubscribe();
  }, [prefersReduced, scrollYProgress]);

  const studyHours = useCountUp(132, statsActive);
  const weakAreasFixed = useCountUp(18, statsActive);
  const predictedGrade = useCountUp(2, statsActive);

  return (
    <section id="walkthrough" className="relative py-28 px-6" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <RevealSection as="section" className="mb-16 text-center">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            Guided Study Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Watch your plan adapt as you scroll.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A calm, scroll-driven walkthrough of how alevelmentor turns messy
            revision into a precise, data-backed roadmap.
          </p>
        </RevealSection>

        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-8 items-stretch">
          {/* Dashboard preview — driven by scroll */}
          <motion.div
            className="rounded-2xl border border-border bg-card shadow-xl shadow-[#5a35f8]/5 overflow-hidden"
            style={
              prefersReduced
                ? undefined
                : {
                    y: dashboardY,
                    opacity: dashboardOpacity,
                    scale: dashboardScale,
                  }
            }
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/40">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <p className="text-[11px] text-muted-foreground font-medium">
                Live study journey
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Scroll-bound SVG line chart */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Predicted grade trajectory
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Model updates with every completed task.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      steady climb
                    </span>
                  </div>
                </div>

                <svg viewBox="0 0 332 80" className="w-full h-20" fill="none">
                  <defs>
                    <linearGradient
                      id="walkthroughGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#5a35f8"
                        stopOpacity={0.32}
                      />
                      <stop
                        offset="100%"
                        stopColor="#5a35f8"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  {prefersReduced ? (
                    <path
                      d={linePath}
                      stroke="#5a35f8"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  ) : (
                    <motion.path
                      d={linePath}
                      stroke="#5a35f8"
                      strokeWidth={2}
                      strokeLinecap="round"
                      style={{ pathLength: chartProgress }}
                    />
                  )}

                  <path
                    d={`${linePath} L 328 80 L 4 80 Z`}
                    fill="url(#walkthroughGradient)"
                  />
                </svg>
              </div>

              {/* Bars — each rendered via BarColumn to keep hooks at component level */}
              <div className="grid grid-cols-3 gap-3">
                {BAR_DATA.map((value, index) => (
                  <BarColumn
                    key={value}
                    value={value}
                    weekIndex={index}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Story column: features highlighted as user scrolls */}
          <div className="space-y-4">
            <RevealSection delay={0.05} className="text-left">
              <h3 className="text-lg font-semibold">
                Scroll once. See the whole system think.
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Instead of a static screenshot, this section shows how your
                timetable, weak topics, and predicted grades all move together
                as you progress.
              </p>
            </RevealSection>

            <div className="space-y-3">
              {/* Feature 1 */}
              <motion.div
                className="rounded-xl border border-border bg-card/80 p-3.5 flex gap-3"
                style={
                  prefersReduced
                    ? undefined
                    : { opacity: featureOne, y: featureOneY }
                }
              >
                <div className="mt-1 h-7 w-7 shrink-0 rounded-lg bg-[#5a35f8]/15 flex items-center justify-center text-[11px] font-semibold text-[#5a35f8]">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Every topic is pulled into a structured map.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Import your specs once — the system lays out every topic and
                    subtopic across your calendar.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="rounded-xl border border-border bg-card/80 p-3.5 flex gap-3"
                style={
                  prefersReduced
                    ? undefined
                    : { opacity: featureTwo, y: featureTwoY }
                }
              >
                <div className="mt-1 h-7 w-7 shrink-0 rounded-lg bg-[#5a35f8]/15 flex items-center justify-center text-[11px] font-semibold text-[#5a35f8]">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Weak areas are surfaced, not hidden.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    As you scroll, the bars grow: they&apos;re the topics where
                    you&apos;re dropping marks — and where your plan doubles
                    down.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="rounded-xl border border-border bg-card/80 p-3.5 flex gap-3"
                style={
                  prefersReduced
                    ? undefined
                    : { opacity: featureThree, y: featureThreeY }
                }
              >
                <div className="mt-1 h-7 w-7 shrink-0 rounded-lg bg-[#5a35f8]/15 flex items-center justify-center text-[11px] font-semibold text-[#5a35f8]">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium">
                    The plan continually re-aims at your target grade.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your dashboard isn&apos;t a poster — it&apos;s a live
                    trajectory, tuned around the day of your last exam.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stats row with count-up (scroll-triggered) */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-card/80 px-3 py-3">
                <p className="text-[11px] text-muted-foreground mb-1">
                  Study hours organised
                </p>
                <p className="text-xl font-semibold tabular-nums">
                  {studyHours}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  across all subjects
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/80 px-3 py-3">
                <p className="text-[11px] text-muted-foreground mb-1">
                  Weak areas fixed
                </p>
                <p className="text-xl font-semibold tabular-nums">
                  {weakAreasFixed}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  targeted directly
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/80 px-3 py-3">
                <p className="text-[11px] text-muted-foreground mb-1">
                  Predicted grade lift
                </p>
                <p className="text-xl font-semibold tabular-nums">
                  +{predictedGrade}
                  <span className="text-xs text-muted-foreground ml-0.5">
                    grades
                  </span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  based on similar students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
