"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

const chatMessages = [
  {
    role: "user" as const,
    text: "I keep losing marks on electrode potential calculations. Can you help?",
  },
  {
    role: "assistant" as const,
    text: "Of course! The key mistake students make is forgetting to reverse the sign when using standard electrode potentials. Let me walk you through a step-by-step approach with an example from your 2023 Paper 2.",
  },
  {
    role: "user" as const,
    text: "Can you add Electrochemistry revision to my roadmap for tomorrow?",
  },
  {
    role: "assistant" as const,
    text: "Done! I've added \"Electrochemistry — Electrode Potentials\" to your roadmap for Tuesday 15 Apr. I've also flagged a relevant past paper question (2022 P2 Q4) for practice.",
  },
];

export function AIMentor() {
  return (
    <section id="ai-mentor" className="py-24 px-6 bg-zinc-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Chat mockup */}
          <FadeIn direction="right" className="order-2 lg:order-1">
            <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-xl shadow-zinc-200/30 overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-zinc-100">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">AI Mentor</p>
                  <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-zinc-900 text-white rounded-br-md"
                        : "bg-zinc-100 text-zinc-700 rounded-bl-md"
                    }`}>
                      <p className="text-[13px] leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input bar */}
              <div className="border-t border-zinc-100 px-4 py-3">
                <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2.5">
                  <button className="text-zinc-400 hover:text-zinc-600 transition-colors shrink-0">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                  </button>
                  <span className="flex-1 text-sm text-zinc-400">Ask anything about your revision...</span>
                  <button className="h-7 w-7 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Copy */}
          <FadeIn direction="left" delay={0.1} className="order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 mb-4">
                <svg className="h-3.5 w-3.5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <span className="text-xs font-medium text-violet-700">AI Mentor</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight mb-4">
                A tutor that knows<br />your every weakness
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                Ask questions, upload past papers, and get instant explanations tailored to your specific weak areas. Your AI mentor can even add tasks to your roadmap.
              </p>
              <ul className="space-y-3">
                {[
                  "Ask anything — like ChatGPT, but for your exams",
                  "Upload past papers and mark schemes",
                  "Add tasks directly to your roadmap from chat",
                  "Explanations adapted to your level and gaps",
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
        </div>
      </div>
    </section>
  );
}
