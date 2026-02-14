"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Brain, TrendingUp, Calendar, Target } from "lucide-react";
import { ease, dur } from "@/lib/motion";

/* ── Inline count-up for the waitlist counter ── */
function CountUpPill({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
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
    <span ref={ref} className="font-bold text-[#fafafa] tabular-nums">
      {display.toLocaleString()}+
    </span>
  );
}

/* ── Floating card with gentle bob ── */
function FloatingCard({
  children,
  className = "",
  delay = 0,
  y = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, y, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 30,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden">
      {/* Subtle ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#5a35f8]/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-[#7c5cf9]/[0.05] blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── LEFT: Text ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: dur.base, ease: ease.out }}
          >
            <span className="pill-badge">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-pulse" />
              Free for all A-Level students
            </span>
          </motion.div>

          <motion.h1
            className="mt-7 text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#fafafa]"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: dur.base, delay: 0.15, ease: ease.out }}
          >
            A-Levels are hard.
            <br />
            <span className="gradient-text-animated">We make them easier.</span>
          </motion.h1>

          <motion.p
            className="mt-5 text-lg text-[#a1a1aa] max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur.base, delay: 0.35, ease: ease.out }}
          >
            An AI-powered platform that plans your revision, predicts your
            grades, and targets your weak spots — completely free.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur.base, delay: 0.5, ease: ease.out }}
          >
            <Button asChild variant="gradient" size="lg">
              <a href="#join" className="flex items-center gap-2">
                Join the Waitlist <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <a
              href="#features"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              See Features
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Laptop mockup with 3D tilt ── */}
        <div
          ref={tiltRef}
          className="relative hidden lg:block"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: ease.out }}
          >
            <div className="purple-glow">
              <div className="laptop-frame">
                <div className="flex items-center gap-2 px-5 py-3 bg-[#111116] border-b border-[#27272a]">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
                  </div>
                  <div className="mx-auto text-[11px] text-[#71717a] font-medium">
                    alevelmentor dashboard
                  </div>
                </div>

                <div className="p-6 space-y-5 bg-[#18181b]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-[#71717a] font-medium uppercase tracking-wider">
                        Next Exam
                      </p>
                      <p className="text-lg font-semibold text-[#fafafa] mt-0.5">
                        Chemistry — Paper 1
                      </p>
                    </div>
                    <div className="inline-flex items-baseline gap-1 rounded-xl bg-[#5a35f8]/10 border border-[#5a35f8]/20 px-3 py-1.5">
                      <span className="text-2xl font-bold text-[#5a35f8]">47</span>
                      <span className="text-xs text-[#5a35f8]/70 font-medium">days</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-xs font-medium text-[#71717a]">This Week</p>
                    <div className="space-y-2">
                      {[
                        { task: "Organic Mechanisms — Revision", done: true },
                        { task: "Equilibria Past Paper (2023 P2)", done: true },
                        { task: "Electrochemistry — Weak Areas", done: false },
                        { task: "Thermodynamics Practice Qs", done: false },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1, ease: ease.out }}
                          className="flex items-center gap-3 rounded-xl border border-[#27272a] px-3 py-2.5 bg-[#111116]"
                        >
                          <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              item.done
                                ? "border-emerald-500 bg-emerald-500"
                                : "border-[#3f3f46]"
                            }`}
                          >
                            {item.done && (
                              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm ${item.done ? "text-[#71717a] line-through" : "text-[#e4e4e7]"}`}>
                            {item.task}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#27272a] p-4 bg-[#111116]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-medium text-[#71717a]">Performance</p>
                      <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        +12% this month
                      </span>
                    </div>
                    <svg viewBox="0 0 300 80" className="w-full h-16" fill="none">
                      <defs>
                        <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#5a35f8" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#5a35f8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M0 65 Q30 60 60 55 Q90 50 120 42 Q150 35 180 30 Q210 28 240 20 Q270 15 300 8"
                        stroke="#5a35f8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                      />
                      <path
                        d="M0 65 Q30 60 60 55 Q90 50 120 42 Q150 35 180 30 Q210 28 240 20 Q270 15 300 8 L300 80 L0 80 Z"
                        fill="url(#heroGrad)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating cards */}
          <FloatingCard className="absolute -top-4 -left-8 hidden xl:block" delay={0.6} y={-8}>
            <div className="rounded-2xl border border-[#27272a] bg-[#18181b]/90 backdrop-blur-md shadow-xl p-4 w-48">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-[#fafafa]">AI Mentor</span>
              </div>
              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                &quot;Focus on Electrochemistry — it&apos;s your biggest weak spot&quot;
              </p>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -top-2 -right-6 hidden xl:block" delay={0.8} y={-6}>
            <div className="rounded-2xl border border-[#27272a] bg-[#18181b]/90 backdrop-blur-md shadow-xl p-4 w-44">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#5a35f8] to-[#7c5cf9] flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-[#fafafa]">Analytics</span>
              </div>
              <p className="text-[11px] text-[#71717a]">Weak topics</p>
              <div className="mt-2 space-y-1.5">
                {[
                  { w: "85%", color: "bg-red-500" },
                  { w: "60%", color: "bg-amber-500" },
                  { w: "30%", color: "bg-emerald-500" },
                ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-[#27272a]">
                      <motion.div
                        className={`h-1.5 rounded-full ${bar.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: bar.w }}
                        transition={{ duration: 0.8, delay: 1.2 + i * 0.2 }}
                      />
                    </div>
                    <span className="text-[10px] text-[#71717a] w-6 text-right">{bar.w}</span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -bottom-6 -left-4 hidden xl:block" delay={1} y={6}>
            <div className="rounded-2xl border border-[#27272a] bg-[#18181b]/90 backdrop-blur-md shadow-xl p-3.5 w-40">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#fafafa]">Calendar</p>
                  <p className="text-[10px] text-[#71717a]">3 tasks today</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -bottom-4 -right-4 hidden xl:block" delay={1.1} y={8}>
            <div className="rounded-2xl bg-gradient-to-br from-[#5a35f8] to-[#7c5cf9] shadow-xl shadow-[#5a35f8]/20 p-3.5 w-44">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-white/80" />
                <p className="text-xs font-medium text-white/80">Target Grade</p>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-white">A*</span>
                <span className="text-xs text-white/70">in all subjects</span>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* ── Mobile: static dashboard card ── */}
        <motion.div
          className="lg:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.base, delay: 0.4, ease: ease.out }}
        >
          <div className="laptop-frame">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#111116] border-b border-[#27272a]">
              <div className="h-2 w-2 rounded-full bg-[#27272a]" />
              <div className="h-2 w-2 rounded-full bg-[#27272a]" />
              <div className="h-2 w-2 rounded-full bg-[#27272a]" />
            </div>
            <div className="p-4 bg-[#18181b] space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#fafafa]">Chemistry — Paper 1</p>
                <span className="text-xs text-[#5a35f8] font-bold">47 days</span>
              </div>
              <div className="space-y-1.5">
                {["Organic Mechanisms", "Equilibria Past Paper"].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                    <div className="h-3 w-3 rounded-full border border-emerald-500 bg-emerald-500" />
                    <span className="line-through">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom counter pill ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur.base, delay: 0.8, ease: ease.out }}
      >
        <span className="pill-badge text-[13px]">
          🎓 <CountUpPill value={2400} /> students already on the waitlist
        </span>
      </motion.div>
    </section>
  );
}
