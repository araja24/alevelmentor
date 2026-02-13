"use client";

import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Calendar, Brain, Target } from "lucide-react";

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
  return (
    <section className="relative pt-36 pb-24 px-6 overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        {/* Badge */}
        <RevealSection className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5a35f8]/20 bg-[#5a35f8]/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5a35f8] animate-pulse" />
            <span className="text-xs font-medium text-[#5a35f8] dark:text-[#8b6cf9]">Now accepting early access signups</span>
          </div>
        </RevealSection>

        {/* Headline */}
        <RevealSection delay={0.1} className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]">
            <span className="text-foreground">Your grades.</span>
            <br />
            <span className="text-foreground">Your roadmap.</span>
            <br />
            <span className="relative inline-block">
              <span className="gradient-text">Your A*.</span>
              {/* Animated underline glow */}
              <span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-[#5a35f8]/60 animate-underline-glow" />
            </span>
          </h1>
        </RevealSection>

        {/* Subheadline */}
        <RevealSection delay={0.2} className="text-center mt-6">
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every topic mapped. Every weak area targeted. Every day planned from
            now until your last exam. The structured system ambitious students
            use to outperform.
          </p>
        </RevealSection>

        {/* CTAs */}
        <RevealSection
          delay={0.3}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild variant="gradient">
            <a
              href="#join"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <a href="#features" className={buttonVariants({ variant: "outline" })}>
            See How It Works
          </a>
        </RevealSection>

        {/* Floating UI mockup */}
        <div className="relative mt-24 mx-auto max-w-4xl">
          <RevealSection delay={0.4}>
            <div className="relative mx-auto max-w-2xl rounded-2xl border border-border bg-card shadow-2xl shadow-[#5a35f8]/5 overflow-hidden">
              {/* App header bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="mx-auto text-[11px] text-muted-foreground font-medium">
                  alevelmentor dashboard
                </div>
              </div>

              {/* Mockup content */}
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                      Next Exam
                    </p>
                    <p className="text-lg font-semibold mt-0.5">
                      Chemistry — Paper 1
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-baseline gap-1 rounded-xl bg-[#5a35f8]/10 border border-[#5a35f8]/20 px-3 py-1.5">
                      <span className="text-2xl font-bold text-[#5a35f8]">47</span>
                      <span className="text-xs text-[#5a35f8]/70 font-medium">days</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-medium text-muted-foreground">This Week</p>
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
                        transition={{ delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 bg-muted/30"
                      >
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            item.done
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {item.done && (
                            <svg
                              className="h-2.5 w-2.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            item.done
                              ? "text-muted-foreground line-through"
                              : "text-foreground/80"
                          }`}
                        >
                          {item.task}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-muted-foreground">Performance</p>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
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
          </RevealSection>

          {/* Floating cards */}
          <FloatingCard className="absolute -top-4 -left-8 sm:-left-16 hidden sm:block" delay={0.6} y={-8}>
            <div className="rounded-2xl border border-border bg-card backdrop-blur-md shadow-xl p-4 w-48">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold">AI Mentor</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                &quot;Focus on Electrochemistry — it&apos;s where you lose the most marks&quot;
              </p>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -top-2 -right-6 sm:-right-14 hidden sm:block" delay={0.8} y={-6}>
            <div className="rounded-2xl border border-border bg-card backdrop-blur-md shadow-xl p-4 w-44">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#5a35f8] to-[#7c5cf9] flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold">Analytics</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Weak topics</p>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted">
                    <motion.div
                      className="h-1.5 rounded-full bg-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-6 text-right">85%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted">
                    <motion.div
                      className="h-1.5 rounded-full bg-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-6 text-right">60%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-muted">
                    <motion.div
                      className="h-1.5 rounded-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-6 text-right">30%</span>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -bottom-6 -left-4 sm:-left-10 hidden sm:block" delay={1} y={6}>
            <div className="rounded-2xl border border-border bg-card backdrop-blur-md shadow-xl p-3.5 w-40">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Calendar</p>
                  <p className="text-[10px] text-muted-foreground">3 tasks today</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -bottom-4 -right-4 sm:-right-8 hidden sm:block" delay={1.1} y={8}>
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
      </div>
    </section>
  );
}
