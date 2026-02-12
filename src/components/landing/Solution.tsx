"use client";

import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const chatMessages = [
  { role: "user" as const, text: "I keep losing marks on electrochemistry. What should I focus on?" },
  { role: "ai" as const, text: "Great question! Based on your past papers, you struggle most with cell potentials and electrode equations. Let me create a targeted plan..." },
  { role: "ai" as const, text: "I\u2019ve added 3 focused sessions this week. Start with half-cell notation \u2014 that\u2019s your quickest win." },
];

const calendarTasks = [
  { day: "Mon", task: "Half-cell notation", done: true },
  { day: "Tue", task: "Cell potentials", done: true },
  { day: "Wed", task: "Electrode equations", done: false },
  { day: "Thu", task: "Electrolysis practice", done: false },
  { day: "Fri", task: "Past paper Q7-12", done: false },
];

export function Solution() {
  return (
    <section className="py-24 px-6 relative">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            The Solution
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Your AI mentor builds the plan.<br className="hidden sm:block" />
            You just follow it.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Tell us your subjects and targets. We create a day-by-day roadmap
            that adapts as you improve.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Mentor Chat Preview */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#5a35f8]" />
                <span className="text-sm font-medium">AI Mentor</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-muted-foreground">Online</span>
                </div>
              </div>

              <div className="p-5 space-y-4 min-h-[280px]">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#5a35f8] text-white rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                  className="flex gap-1 px-4 py-3 bg-muted rounded-2xl rounded-bl-md w-fit"
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
                      style={{ animation: `typing-dot 1.4s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </FadeIn>

          {/* Calendar / Roadmap Preview */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-[#5a35f8]/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-sm bg-[#5a35f8]" />
                </div>
                <span className="text-sm font-medium">Smart Roadmap</span>
                <span className="ml-auto text-[10px] text-muted-foreground">This week</span>
              </div>

              <div className="p-5 space-y-3 min-h-[280px]">
                {calendarTasks.map((task, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 bg-muted/20"
                  >
                    <span className="text-xs font-mono text-muted-foreground w-8 shrink-0">
                      {task.day}
                    </span>
                    <div
                      className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        task.done
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {task.done && (
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span
                      className={`text-sm flex-1 ${
                        task.done ? "text-muted-foreground line-through" : "text-foreground/80"
                      }`}
                    >
                      {task.task}
                    </span>
                    {!task.done && (
                      <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                    )}
                  </motion.div>
                ))}

                <div className="flex items-center justify-between pt-2 px-1">
                  <span className="text-xs text-muted-foreground">2 of 5 completed</span>
                  <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#5a35f8]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "40%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
