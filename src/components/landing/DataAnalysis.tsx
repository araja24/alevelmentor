"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

const weakTopics = [
  { topic: "Electrochemistry", marks: 42, total: 50, color: "bg-red-400" },
  { topic: "Organic Synthesis", marks: 28, total: 50, color: "bg-amber-400" },
  { topic: "Equilibria", marks: 18, total: 50, color: "bg-yellow-400" },
  { topic: "Thermodynamics", marks: 12, total: 50, color: "bg-emerald-400" },
];

const frequentTopics = [
  { topic: "Organic Mechanisms", frequency: 94 },
  { topic: "Equilibria & Kp", frequency: 88 },
  { topic: "Electrochemistry", frequency: 82 },
  { topic: "Rate Equations", frequency: 76 },
  { topic: "Bonding & Structure", frequency: 71 },
];

export function DataAnalysis() {
  return (
    <section id="data" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 mb-4">
            <svg className="h-3.5 w-3.5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <span className="text-xs font-medium text-violet-700">Data Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight">
            Know exactly where<br />you&apos;re losing marks
          </h2>
          <p className="text-zinc-500 mt-4 max-w-lg mx-auto">
            Two layers of insight — your personal performance data and national exam trends — so you focus on what matters most.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Your Data */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-lg shadow-zinc-200/20 p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">Your Performance</h3>
                  <p className="text-[11px] text-zinc-400">Personal weak areas & trends</p>
                </div>
              </div>

              {/* Weakest topics bars */}
              <p className="text-xs font-medium text-zinc-500 mb-3">Marks lost per topic</p>
              <div className="space-y-3 mb-6">
                {weakTopics.map((topic, i) => (
                  <div key={topic.topic} className="flex items-center gap-3">
                    <span className="text-xs text-zinc-600 w-28 shrink-0 truncate">{topic.topic}</span>
                    <div className="flex-1 h-2 rounded-full bg-zinc-100 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${topic.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(topic.marks / topic.total) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                    <span className="text-[11px] text-zinc-400 w-8 text-right">{topic.marks}</span>
                  </div>
                ))}
              </div>

              {/* Paper performance */}
              <p className="text-xs font-medium text-zinc-500 mb-3">Weakest paper</p>
              <div className="flex gap-3">
                {[
                  { paper: "Paper 1", score: 72, status: "good" },
                  { paper: "Paper 2", score: 48, status: "weak" },
                  { paper: "Paper 3", score: 65, status: "ok" },
                ].map((p) => (
                  <div key={p.paper} className={`flex-1 rounded-xl border p-3 text-center ${
                    p.status === "weak" ? "border-red-200 bg-red-50/50" : "border-zinc-100"
                  }`}>
                    <p className="text-[11px] text-zinc-500 mb-1">{p.paper}</p>
                    <p className={`text-lg font-bold ${
                      p.status === "weak" ? "text-red-600" : p.status === "ok" ? "text-amber-600" : "text-emerald-600"
                    }`}>{p.score}%</p>
                  </div>
                ))}
              </div>

              {/* Performance trend */}
              <div className="mt-6 pt-5 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-zinc-500">Performance over time</p>
                  <span className="text-[11px] text-emerald-600 font-medium">Trending up</span>
                </div>
                <svg viewBox="0 0 280 60" className="w-full h-12" fill="none">
                  <defs>
                    <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 48 Q35 45 70 40 Q105 38 140 30 Q175 25 210 20 Q245 16 280 10"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  />
                  <path d="M0 48 Q35 45 70 40 Q105 38 140 30 Q175 25 210 20 Q245 16 280 10 L280 60 L0 60 Z" fill="url(#perfGrad)" />
                </svg>
              </div>
            </div>
          </FadeIn>

          {/* General Data */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-lg shadow-zinc-200/20 p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">National Exam Data</h3>
                  <p className="text-[11px] text-zinc-400">What comes up most & what&apos;s hardest</p>
                </div>
              </div>

              {/* Most frequent topics */}
              <p className="text-xs font-medium text-zinc-500 mb-3">Most frequent topics (past 5 years)</p>
              <div className="space-y-2.5 mb-6">
                {frequentTopics.map((topic, i) => (
                  <div key={topic.topic} className="flex items-center gap-3">
                    <span className="text-[11px] text-zinc-400 w-4 shrink-0">{i + 1}.</span>
                    <span className="text-xs text-zinc-600 flex-1">{topic.topic}</span>
                    <div className="w-20 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-indigo-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${topic.frequency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 w-7 text-right">{topic.frequency}%</span>
                  </div>
                ))}
              </div>

              {/* Difficulty radar mock */}
              <p className="text-xs font-medium text-zinc-500 mb-4">Topic difficulty (national average)</p>
              <div className="flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-48 h-48" fill="none">
                  {/* Radar grid */}
                  {[80, 60, 40, 20].map((r) => (
                    <circle key={r} cx="100" cy="100" r={r} stroke="#f4f4f5" strokeWidth="1" />
                  ))}
                  {/* Radar axes (pre-computed to avoid SSR/client float mismatch) */}
                  <line x1="100" y1="100" x2="180" y2="100" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="100" y1="100" x2="140" y2="169" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="100" y1="100" x2="60" y2="169" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="100" y1="100" x2="20" y2="100" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="100" y1="100" x2="60" y2="31" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="100" y1="100" x2="140" y2="31" stroke="#f4f4f5" strokeWidth="1" />
                  {/* Data polygon */}
                  <motion.polygon
                    points="100,30 165,65 155,140 100,170 50,135 45,70"
                    fill="#818cf8" fillOpacity="0.15"
                    stroke="#818cf8" strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ transformOrigin: "100px 100px" }}
                  />
                  {/* Data points */}
                  {[
                    { x: 100, y: 30, label: "Organic" },
                    { x: 165, y: 65, label: "Electro" },
                    { x: 155, y: 140, label: "Thermo" },
                    { x: 100, y: 170, label: "Equil." },
                    { x: 50, y: 135, label: "Kinetics" },
                    { x: 45, y: 70, label: "Bonding" },
                  ].map((p) => (
                    <g key={p.label}>
                      <circle cx={p.x} cy={p.y} r="3" fill="#818cf8" />
                      <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="7" fill="#71717a">{p.label}</text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-4 justify-center text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-400" /> Frequency</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-400" /> Difficulty</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
