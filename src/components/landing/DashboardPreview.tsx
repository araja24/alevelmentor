"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import Link from "next/link";

const exams = [
  { subject: "Chemistry Paper 1", board: "AQA", days: 47, color: "from-violet-500 to-purple-600" },
  { subject: "Mathematics Pure 1", board: "Edexcel", days: 52, color: "from-blue-500 to-indigo-600" },
  { subject: "Physics Paper 2", board: "AQA", days: 58, color: "from-sky-500 to-blue-600" },
];

const todayTasks = [
  { title: "Organic Mechanisms Review", time: "09:00", done: true },
  { title: "Chemistry 2023 P2 Practice", time: "11:00", done: false },
  { title: "Maths Integration Qs", time: "14:00", done: false },
  { title: "Physics — Waves Revision", time: "16:00", done: false },
];

export function DashboardPreview() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 mb-4">
            <svg className="h-3.5 w-3.5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <span className="text-xs font-medium text-violet-700">Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight">
            Everything you need,<br />one glance away
          </h2>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto">
            Your exams, tasks, analytics, and AI mentor — all in one clean dashboard designed for focus.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-xl shadow-zinc-200/30 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-100 bg-zinc-50/50">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
              </div>
              <div className="mx-auto text-[11px] text-zinc-400 font-medium">dashboard.alevelmentor.com</div>
            </div>

            <div className="p-6">
              {/* Greeting */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-zinc-900">Good morning, Sarah</h3>
                <p className="text-sm text-zinc-500">You have 4 tasks today. Let&apos;s make progress.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Exam countdowns */}
                {exams.map((exam, i) => (
                  <motion.div
                    key={exam.subject}
                    className={`rounded-xl bg-gradient-to-br ${exam.color} p-4 text-white`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <p className="text-[11px] text-white/70 font-medium">{exam.board}</p>
                    <p className="text-sm font-semibold mt-0.5">{exam.subject}</p>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{exam.days}</span>
                      <span className="text-xs text-white/70">days</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Today's tasks */}
                <div className="rounded-xl border border-zinc-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-zinc-900">Today&apos;s Tasks</p>
                    <span className="text-[11px] text-zinc-400">1 of 4 done</span>
                  </div>
                  <div className="space-y-2">
                    {todayTasks.map((task) => (
                      <div key={task.title} className="flex items-center gap-3 py-1.5">
                        <div className={`h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          task.done ? "border-emerald-500 bg-emerald-500" : "border-zinc-200"
                        }`}>
                          {task.done && (
                            <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs flex-1 ${task.done ? "text-zinc-400 line-through" : "text-zinc-700"}`}>
                          {task.title}
                        </span>
                        <span className="text-[10px] text-zinc-400">{task.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analytics summary */}
                <div className="rounded-xl border border-zinc-100 p-4">
                  <p className="text-xs font-medium text-zinc-900 mb-3">Weekly Summary</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-zinc-50 p-3 text-center">
                      <p className="text-xl font-bold text-zinc-900">12</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Tasks completed</p>
                    </div>
                    <div className="rounded-lg bg-zinc-50 p-3 text-center">
                      <p className="text-xl font-bold text-emerald-600">+8%</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Score improvement</p>
                    </div>
                    <div className="rounded-lg bg-zinc-50 p-3 text-center">
                      <p className="text-xl font-bold text-zinc-900">3</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Papers practiced</p>
                    </div>
                    <div className="rounded-lg bg-zinc-50 p-3 text-center">
                      <p className="text-xl font-bold text-violet-600">14h</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Revision time</p>
                    </div>
                  </div>

                  {/* Admission test reminder */}
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2.5 flex items-center gap-2">
                    <svg className="h-4 w-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <div>
                      <p className="text-[11px] font-medium text-amber-700">UCAT not added yet</p>
                      <p className="text-[10px] text-amber-600">Add your admission test to your roadmap</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start practice CTA */}
              <div className="mt-4 rounded-xl border border-zinc-100 p-4 flex items-center justify-between bg-zinc-50/50">
                <div>
                  <p className="text-sm font-medium text-zinc-900">Ready to practice?</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Start your next recommended exam paper</p>
                </div>
                <Link
                  href="/signup"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shrink-0"
                >
                  Start Practice
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
