"use client";

import { RevealSection } from "./RevealSection";

export function Solution() {
  return (
    <section id="solution" className="py-32 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <RevealSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fafafa]">
            <span className="gradient-text-animated">Your entire revision,</span>
            <br />
            in one place.
          </h2>
          <p className="text-[#a1a1aa] mt-5 max-w-lg mx-auto leading-relaxed">
            From personalised roadmaps to AI-powered insights — everything you
            need to hit your target grades, structured and ready.
          </p>
        </RevealSection>

        {/* Device mockups */}
        <RevealSection delay={0.2} className="relative mx-auto max-w-4xl">
          <div className="purple-glow">
            {/* Laptop */}
            <div className="laptop-frame">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#111116] border-b border-[#27272a]">
                <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
                <div className="mx-auto text-[10px] text-[#71717a]">alevelmentor.com/dashboard</div>
              </div>
              <div className="p-6 bg-[#18181b] min-h-[320px]">
                {/* Sidebar + main area */}
                <div className="flex gap-5">
                  {/* Sidebar */}
                  <div className="hidden sm:block w-40 shrink-0 space-y-3">
                    <div className="rounded-lg bg-[#5a35f8]/10 border border-[#5a35f8]/20 px-3 py-2">
                      <p className="text-[11px] font-medium text-[#5a35f8]">📍 Roadmap</p>
                    </div>
                    {["🧠 AI Mentor", "📊 Analytics", "📄 Past Papers", "⚙️ Settings"].map((item) => (
                      <div key={item} className="px-3 py-2">
                        <p className="text-[11px] text-[#71717a]">{item}</p>
                      </div>
                    ))}

                    <div className="mt-4 pt-3 border-t border-[#27272a]">
                      <p className="text-[10px] text-[#52525b] mb-2">Subjects</p>
                      {["Chemistry", "Maths", "Physics"].map((s) => (
                        <div key={s} className="flex items-center gap-2 py-1">
                          <div className="h-2 w-2 rounded-full bg-[#5a35f8]" />
                          <span className="text-[11px] text-[#a1a1aa]">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#71717a] font-medium">Week 12 of 18</p>
                        <p className="text-base font-semibold text-[#fafafa] mt-0.5">Chemistry Roadmap</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#71717a]">Progress</p>
                        <p className="text-sm font-bold text-emerald-400">67%</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-[#27272a]">
                      <div className="h-1.5 rounded-full bg-[#5a35f8]" style={{ width: "67%" }} />
                    </div>

                    {/* Task cards */}
                    <div className="space-y-2">
                      {[
                        { task: "Organic Mechanisms Revision", status: "done" },
                        { task: "Equilibria — Practice Qs", status: "done" },
                        { task: "Electrochemistry Notes", status: "current" },
                        { task: "Acids & Bases Past Paper", status: "todo" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg border border-[#27272a] px-3 py-2 bg-[#111116]">
                          <div
                            className={`h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center ${
                              item.status === "done"
                                ? "border-emerald-500 bg-emerald-500"
                                : item.status === "current"
                                ? "border-[#5a35f8] bg-[#5a35f8]/20"
                                : "border-[#3f3f46]"
                            }`}
                          >
                            {item.status === "done" && (
                              <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs ${item.status === "done" ? "text-[#71717a] line-through" : "text-[#e4e4e7]"}`}>
                            {item.task}
                          </span>
                          {item.status === "current" && (
                            <span className="ml-auto text-[9px] text-[#5a35f8] font-medium bg-[#5a35f8]/10 px-1.5 py-0.5 rounded">
                              In Progress
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone overlay — AI chat */}
            <div className="absolute -bottom-8 -left-2 sm:left-8 z-10">
              <div className="phone-frame w-[150px] sm:w-[175px]">
                <div className="p-3 bg-[#18181b] space-y-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#27272a]">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#5a35f8] to-[#7c5cf9] flex items-center justify-center">
                      <span className="text-[8px] text-white">AI</span>
                    </div>
                    <p className="text-[10px] font-medium text-[#fafafa]">AI Mentor</p>
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="rounded-lg rounded-br-sm bg-[#5a35f8] px-2.5 py-1.5 max-w-[90%]">
                      <p className="text-[9px] text-white leading-relaxed">
                        Explain electrophilic addition
                      </p>
                    </div>
                  </div>
                  {/* AI reply */}
                  <div className="flex justify-start">
                    <div className="rounded-lg rounded-bl-sm bg-[#1f1f26] px-2.5 py-1.5 max-w-[95%]">
                      <p className="text-[9px] text-[#a1a1aa] leading-relaxed">
                        An electrophile attacks the electron-rich C=C bond, forming a carbocation intermediate...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
