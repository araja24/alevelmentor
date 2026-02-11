"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

const calendarViews = ["Month", "Week", "Year"] as const;

const roadmapTasks = [
  { date: "Mon 14 Apr", tasks: [
    { title: "Organic Mechanisms — Revision Notes", type: "revision", done: true },
    { title: "Past Paper: 2023 Paper 2 Q3–Q6", type: "paper", done: false },
  ]},
  { date: "Tue 15 Apr", tasks: [
    { title: "Electrochemistry — Weak Area Focus", type: "weak", done: false },
    { title: "UCAT Practice Section 1", type: "admission", done: false },
  ]},
  { date: "Wed 16 Apr", tasks: [
    { title: "Thermodynamics — Full Topic Review", type: "revision", done: false },
  ]},
];

export function SmartRoadmap() {
  const [activeView, setActiveView] = useState<typeof calendarViews[number]>("Week");

  return (
    <section id="features" className="py-24 px-6 bg-zinc-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <FadeIn direction="right">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 mb-4">
                <svg className="h-3.5 w-3.5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                <span className="text-xs font-medium text-violet-700">Smart Roadmap</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight mb-4">
                Every day planned.<br />Every topic covered.
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                A day-by-day revision schedule from now until your last exam. Topics, papers, weak areas — all prioritised and structured automatically.
              </p>
              <ul className="space-y-3">
                {[
                  "Editable tasks — drag, reschedule, mark complete",
                  "University admission tests integrated",
                  "Countdown to every exam, visually emphasized",
                  "Calendar views — Month, Week, or Year",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                    <svg className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Visual */}
          <FadeIn direction="left" delay={0.15}>
            <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-xl shadow-zinc-200/30 overflow-hidden">
              {/* Calendar header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">April 2026</span>
                </div>
                <div className="flex rounded-lg border border-zinc-200 overflow-hidden">
                  {calendarViews.map((view) => (
                    <button
                      key={view}
                      onClick={() => setActiveView(view)}
                      className={`px-3 py-1 text-[11px] font-medium transition-colors ${
                        activeView === view
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-500 hover:bg-zinc-50"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam countdown banner */}
              <div className="mx-4 mt-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-violet-200 font-medium">Next A-Level Exam</p>
                  <p className="text-sm font-semibold text-white">Chemistry Paper 1</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="text-2xl font-bold text-white"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  >
                    47
                  </motion.span>
                  <span className="text-xs text-violet-200">days</span>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-4 space-y-4">
                {roadmapTasks.map((day, di) => (
                  <div key={di}>
                    <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-2">{day.date}</p>
                    <div className="space-y-2">
                      {day.tasks.map((task, ti) => (
                        <div
                          key={ti}
                          className="flex items-center gap-3 rounded-xl border border-zinc-100 px-3.5 py-2.5 transition-colors hover:bg-zinc-50"
                        >
                          <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            task.done ? "border-emerald-500 bg-emerald-500" : "border-zinc-200"
                          }`}>
                            {task.done && (
                              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm flex-1 ${task.done ? "text-zinc-400 line-through" : "text-zinc-700"}`}>
                            {task.title}
                          </span>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            task.type === "weak" ? "bg-red-50 text-red-600" :
                            task.type === "paper" ? "bg-blue-50 text-blue-600" :
                            task.type === "admission" ? "bg-amber-50 text-amber-600" :
                            "bg-zinc-50 text-zinc-500"
                          }`}>
                            {task.type === "weak" ? "Weak area" :
                             task.type === "paper" ? "Past paper" :
                             task.type === "admission" ? "Admissions" :
                             "Revision"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
