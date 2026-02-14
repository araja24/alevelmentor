"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { ease } from "@/lib/motion";
import { RevealSection } from "./RevealSection";
import { MacBookFrame } from "@/components/ui/device-frames";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Floating Card Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloatingCard({ children, className, delay = 0, y = -10 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay + 0.5, ease: ease.out }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, y, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Hero Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax + 3D tilt effects on scroll
  const rotateX = useTransform(scrollY, [0, 400], [20, 0]);
  const rotateY = useMotionValue(0);

  // Simple mouse move tilt effect
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const offsetX = (e.clientX - centerX) / (window.innerWidth / 2);
      rotateY.set(offsetX * 5); // Max 5 deg tilt
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotateY]);

  return (
    <section ref={ref} className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden perspective-1000">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-[#09090b] to-[#09090b] pointer-events-none" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#5a35f8]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <div className="inline-flex items-center rounded-full border border-[#27272a] bg-[#1a1a1e]/50 backdrop-blur-sm px-3 py-1 text-sm text-[#a1a1aa] ring-1 ring-white/10 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#5a35f8] mr-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#5a35f8] opacity-75"></span>
              </span>
              <span>Waitlist now open for 2024</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#fafafa] mb-6 leading-[1.1]">
              Your personal <span className="gradient-text text-glow">A-Level AI tutor</span>
              <br /> available 24/7.
            </h1>
            <p className="text-lg sm:text-xl text-[#a1a1aa] mb-8 max-w-2xl mx-auto leading-relaxed">
              Stop guessing what to revise. Get a personalised roadmap, instant AI answers, and grade predictions that adapt as you learn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#join"
                className={buttonVariants({
                  size: "lg",
                  className: "w-full sm:w-auto bg-[#5a35f8] hover:bg-[#4c2df0] text-white shadow-lg shadow-[#5a35f8]/25 rounded-full px-8",
                })}
              >
                Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#features"
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: "w-full sm:w-auto text-[#a1a1aa] hover:text-[#fafafa] rounded-full",
                })}
              >
                See how it works
              </a>
            </div>
          </RevealSection>
        </div>

        {/* 
          Main Hero Visual
          Wraps the device in a subtle 3D tilt container 
        */}
        <RevealSection delay={0.2}
          className="relative mt-8 sm:mt-12 lg:mt-16 mx-auto max-w-5xl"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: ease.out }}
          >
            <div className="purple-glow">
              <div className="relative">
                <MacBookFrame>
                  {/* ── Minimal browser bar ── */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111113] border-b border-white/[0.04]">
                    <div className="flex gap-[5px] shrink-0">
                      <div className="h-[8px] w-[8px] rounded-full bg-[#3a3a3e]" />
                      <div className="h-[8px] w-[8px] rounded-full bg-[#3a3a3e]" />
                      <div className="h-[8px] w-[8px] rounded-full bg-[#3a3a3e]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-[#0c0c0e] rounded-md px-3 py-[3px] text-[9px] text-[#555] font-mono border border-white/[0.03] max-w-[200px] w-full text-center">
                        alevelmentor.com
                      </div>
                    </div>
                  </div>

                  {/* ── Dashboard Content ── */}
                  <div className="p-5 space-y-4 bg-[#0c0c0e]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-[#52525b] font-medium uppercase tracking-wider">
                          Next Exam
                        </p>
                        <p className="text-base font-semibold text-[#fafafa] mt-0.5">
                          Chemistry — Paper 1
                        </p>
                      </div>
                      <div className="inline-flex items-baseline gap-1 rounded-xl bg-[#5a35f8]/10 border border-[#5a35f8]/20 px-3 py-1.5">
                        <span className="text-xl font-bold text-[#5a35f8]">47</span>
                        <span className="text-[10px] text-[#5a35f8]/70 font-medium">days</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-medium text-[#52525b]">This Week</p>
                      <div className="space-y-1.5">
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
                            className="flex items-center gap-2.5 rounded-lg border border-[#1a1a1e] px-3 py-2 bg-[#111114]"
                          >
                            <div
                              className={`h-3.5 w-3.5 rounded-full border-[1.5px] flex items-center justify-center ${item.done
                                ? "border-emerald-500 bg-emerald-500"
                                : "border-[#3f3f46]"
                                }`}
                            >
                              {item.done && (
                                <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-xs ${item.done ? "text-[#52525b] line-through" : "text-[#d4d4d8]"}`}>
                              {item.task}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-[#1a1a1e] p-3 bg-[#111114]">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-medium text-[#52525b]">Performance</p>
                        <span className="text-[9px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                          +12% this month
                        </span>
                      </div>
                      <svg viewBox="0 0 300 60" className="w-full h-12" fill="none">
                        <defs>
                          <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5a35f8" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#5a35f8" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d="M0 50 Q30 48 60 42 Q90 38 120 32 Q150 28 180 22 Q210 18 240 14 Q270 10 300 6"
                          stroke="#5a35f8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                        />
                        <path
                          d="M0 50 Q30 48 60 42 Q90 38 120 32 Q150 28 180 22 Q210 18 240 14 Q270 10 300 6 L300 60 L0 60 Z"
                          fill="url(#heroGrad)"
                        />
                      </svg>
                    </div>
                  </div>
                </MacBookFrame>
              </div>
            </div>
          </motion.div>

          {/* Floating cards */}
          <FloatingCard className="absolute -top-4 -left-8 hidden xl:block z-30" delay={0.6} y={-8}>
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

          <FloatingCard className="absolute -top-2 -right-6 hidden xl:block z-30" delay={0.8} y={-6}>
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
        </RevealSection>
      </div>
    </section>
  );
}
