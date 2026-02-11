"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

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
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/50 via-white to-white pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-violet-100/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Badge */}
        <FadeIn className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50/80 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-medium text-violet-700">AI-Powered Revision System</span>
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.1} className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 leading-[1.08]">
            From today to A*
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              planned for you
            </span>
          </h1>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={0.2} className="text-center mt-6">
          <p className="text-lg text-zinc-500 max-w-lg mx-auto leading-relaxed">
            AI-generated revision roadmaps, real-time performance tracking,
            and exam-focused insights — every day until results day.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.3} className="flex items-center justify-center gap-3 mt-10">
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/10"
          >
            Get My A* Roadmap
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:border-zinc-300"
          >
            See How It Works
          </a>
        </FadeIn>

        {/* Floating UI mockup */}
        <div className="relative mt-20 mx-auto max-w-4xl">
          {/* Center card — main app preview */}
          <FadeIn delay={0.4}>
            <div className="relative mx-auto max-w-2xl rounded-2xl border border-zinc-200/60 bg-white shadow-xl shadow-zinc-200/40 overflow-hidden">
              {/* App header bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-100 bg-zinc-50/50">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                </div>
                <div className="mx-auto text-[11px] text-zinc-400 font-medium">Alevelmentor Dashboard</div>
              </div>

              {/* Mockup content */}
              <div className="p-6 space-y-5">
                {/* Exam countdown row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">A-Level Exams</p>
                    <p className="text-lg font-semibold text-zinc-900 mt-0.5">Chemistry — Paper 1</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-baseline gap-1 rounded-lg bg-violet-50 px-3 py-1.5">
                      <span className="text-2xl font-bold text-violet-600">47</span>
                      <span className="text-xs text-violet-500 font-medium">days left</span>
                    </div>
                  </div>
                </div>

                {/* Mini roadmap timeline */}
                <div className="space-y-2.5">
                  <p className="text-xs font-medium text-zinc-500">Your Roadmap — This Week</p>
                  <div className="space-y-2">
                    {[
                      { task: "Organic Mechanisms — Revision", done: true },
                      { task: "Equilibria Past Paper (2023 P2)", done: true },
                      { task: "Electrochemistry — Weak Areas", done: false },
                      { task: "Thermodynamics Practice Qs", done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-zinc-100 px-3 py-2.5">
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${item.done ? "border-emerald-500 bg-emerald-500" : "border-zinc-200"}`}>
                          {item.done && (
                            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm ${item.done ? "text-zinc-400 line-through" : "text-zinc-700"}`}>{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini performance graph */}
                <div className="rounded-xl border border-zinc-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-zinc-500">Performance Trend</p>
                    <span className="text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">+12% this month</span>
                  </div>
                  {/* SVG chart */}
                  <svg viewBox="0 0 300 80" className="w-full h-16" fill="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 65 Q30 60 60 55 Q90 50 120 42 Q150 35 180 30 Q210 28 240 20 Q270 15 300 8" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0 65 Q30 60 60 55 Q90 50 120 42 Q150 35 180 30 Q210 28 240 20 Q270 15 300 8 L300 80 L0 80 Z" fill="url(#chartGrad)" />
                  </svg>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Floating cards around the main preview — inspired by the inspo images */}
          <FloatingCard
            className="absolute -top-4 -left-8 sm:-left-16 hidden sm:block"
            delay={0.6}
            y={-8}
          >
            <div className="rounded-2xl bg-white border border-zinc-100 shadow-lg shadow-zinc-200/30 p-4 w-48">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-zinc-700">AI Mentor</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">&quot;Focus on Electrochemistry — it&apos;s your weakest topic&quot;</p>
            </div>
          </FloatingCard>

          <FloatingCard
            className="absolute -top-2 -right-6 sm:-right-14 hidden sm:block"
            delay={0.8}
            y={-6}
          >
            <div className="rounded-2xl bg-white border border-zinc-100 shadow-lg shadow-zinc-200/30 p-4 w-44">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-zinc-700">Analytics</span>
              </div>
              <p className="text-[11px] text-zinc-500">Marks lost per topic</p>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-zinc-100"><div className="h-1.5 rounded-full bg-red-400 w-[85%]" /></div>
                  <span className="text-[10px] text-zinc-400 w-6 text-right">85%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-zinc-100"><div className="h-1.5 rounded-full bg-amber-400 w-[60%]" /></div>
                  <span className="text-[10px] text-zinc-400 w-6 text-right">60%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-zinc-100"><div className="h-1.5 rounded-full bg-emerald-400 w-[30%]" /></div>
                  <span className="text-[10px] text-zinc-400 w-6 text-right">30%</span>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="absolute -bottom-6 -left-4 sm:-left-10 hidden sm:block"
            delay={1}
            y={6}
          >
            <div className="rounded-2xl bg-white border border-zinc-100 shadow-lg shadow-zinc-200/30 p-3.5 w-40">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-700">Calendar</p>
                  <p className="text-[10px] text-zinc-400">3 tasks today</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="absolute -bottom-4 -right-4 sm:-right-8 hidden sm:block"
            delay={1.1}
            y={8}
          >
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-300/30 p-3.5 w-44">
              <p className="text-xs font-medium text-violet-100">Target Grade</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-white">A*</span>
                <span className="text-xs text-violet-200">in all subjects</span>
              </div>
            </div>
          </FloatingCard>

          {/* Connector lines (decorative) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="15%" y1="20%" x2="28%" y2="15%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="85%" y1="22%" x2="72%" y2="15%" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Social proof */}
        <FadeIn delay={0.5} className="mt-16 text-center">
          <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-4">Trusted by ambitious students across the UK</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900">2,400+</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Active students</p>
            </div>
            <div className="h-8 w-px bg-zinc-100" />
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900">94%</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Hit target grade</p>
            </div>
            <div className="h-8 w-px bg-zinc-100" />
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900">+18%</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Avg. improvement</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
