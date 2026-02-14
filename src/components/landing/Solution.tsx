"use client";

import { RevealSection } from "./RevealSection";
import { MacBookFrame, iPhoneFrame } from "@/components/ui/device-frames";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Dashboard content inside the laptop frame
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DashboardContent() {
  return (
    <div className="bg-[#0c0c0e] w-full">
      {/* ── Minimal browser bar ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111113] border-b border-white/[0.04]">
        <div className="flex gap-[5px] shrink-0">
          <div className="h-[8px] w-[8px] rounded-full bg-[#3a3a3e]" />
          <div className="h-[8px] w-[8px] rounded-full bg-[#3a3a3e]" />
          <div className="h-[8px] w-[8px] rounded-full bg-[#3a3a3e]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#0c0c0e] rounded-md px-3 py-[3px] text-[8px] text-[#555] font-mono border border-white/[0.03] max-w-[180px] w-full text-center">
            alevelmentor.com/dashboard
          </div>
        </div>
      </div>

      {/* ── App Content ── */}
      <div className="p-4 sm:p-5 flex gap-4">
        {/* Sidebar */}
        <div className="hidden sm:block w-28 shrink-0 space-y-1">
          <div className="rounded-md bg-[#5a35f8]/15 border border-[#5a35f8]/20 px-2 py-1.5">
            <p className="text-[8px] font-medium text-[#5a35f8]">📍 Roadmap</p>
          </div>
          {["🧠 AI Mentor", "📊 Analytics", "📄 Papers", "⚙️ Settings"].map((item) => (
            <div key={item} className="px-2 py-1">
              <p className="text-[8px] text-[#3f3f46]">{item}</p>
            </div>
          ))}
          <div className="pt-2 border-t border-[#1a1a1e] mt-2">
            <p className="text-[7px] text-[#27272a] mb-1 font-medium tracking-wider">SUBJECTS</p>
            {[
              { name: "Chemistry", color: "bg-emerald-500" },
              { name: "Maths", color: "bg-blue-500" },
              { name: "Physics", color: "bg-amber-500" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-1 py-0.5">
                <div className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                <span className="text-[8px] text-[#52525b]">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[7px] text-[#3f3f46] font-medium uppercase tracking-wider">Week 12 of 18</p>
              <p className="text-sm font-semibold text-[#fafafa] mt-0.5">Chemistry Roadmap</p>
            </div>
            <span className="text-[8px] text-emerald-400 font-semibold">67%</span>
          </div>

          {/* Progress */}
          <div className="h-1 rounded-full bg-[#1a1a1e]">
            <div className="h-1 rounded-full bg-gradient-to-r from-[#5a35f8] to-[#7c5cf9]" style={{ width: "67%" }} />
          </div>

          {/* Task list */}
          <div className="space-y-1">
            {[
              { task: "Organic Mechanisms Revision", status: "done" },
              { task: "Equilibria — Practice Qs", status: "done" },
              { task: "Electrochemistry Notes", status: "current" },
              { task: "Acids & Bases Past Paper", status: "todo" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-[#1a1a1e] px-2 py-1.5 bg-[#111114]">
                <div
                  className={`h-2.5 w-2.5 rounded-full border flex items-center justify-center ${item.status === "done"
                    ? "border-emerald-500 bg-emerald-500"
                    : item.status === "current"
                      ? "border-[#5a35f8] bg-[#5a35f8]/20"
                      : "border-[#27272a]"
                    }`}
                >
                  {item.status === "done" && (
                    <svg className="h-1.5 w-1.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <span className={`text-[8px] ${item.status === "done" ? "text-[#3f3f46] line-through" : "text-[#a1a1aa]"}`}>
                  {item.task}
                </span>
                {item.status === "current" && (
                  <span className="ml-auto text-[6px] text-[#5a35f8] font-medium bg-[#5a35f8]/10 px-1 py-0.5 rounded">In Progress</span>
                )}
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-md border border-[#1a1a1e] p-2.5 bg-[#111114]">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[7px] font-medium text-[#3f3f46]">Performance</p>
              <span className="text-[6px] text-emerald-400 font-medium bg-emerald-500/10 px-1 py-0.5 rounded-full">+12%</span>
            </div>
            <svg viewBox="0 0 300 50" className="w-full h-8" fill="none">
              <defs>
                <linearGradient id="solGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5a35f8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#5a35f8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 40 Q30 38 60 34 Q90 30 120 25 Q150 22 180 18 Q210 14 240 10 Q270 8 300 4" stroke="#5a35f8" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0 40 Q30 38 60 34 Q90 30 120 25 Q150 22 180 18 Q210 14 240 10 Q270 8 300 4 L300 50 L0 50 Z" fill="url(#solGrad)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Phone content — AI Chat
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PhoneContent() {
  return (
    <div className="bg-[#0c0c0e] flex flex-col h-full rounded-[38px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.04]">
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#5a35f8] to-[#7c5cf9] flex items-center justify-center">
          <span className="text-[6px] text-white font-bold">AI</span>
        </div>
        <div>
          <p className="text-[8px] font-semibold text-white leading-none">AI Mentor</p>
          <p className="text-[6px] text-emerald-400 leading-none mt-0.5">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-2.5 py-2 space-y-1.5 overflow-hidden">
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-sm bg-[#5a35f8] px-2 py-1 max-w-[82%]">
            <p className="text-[7px] text-white leading-relaxed">Explain electrophilic addition</p>
          </div>
        </div>
        {/* AI bubble */}
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm bg-[#1c1c1e] px-2 py-1 max-w-[88%]">
            <p className="text-[7px] text-[#a1a1aa] leading-relaxed">
              An electrophile attacks the π bond of an alkene, forming a carbocation intermediate…
            </p>
          </div>
        </div>
        {/* AI cont */}
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm bg-[#1c1c1e] px-2 py-1 max-w-[88%]">
            <p className="text-[7px] text-[#a1a1aa] leading-relaxed">
              1. Electrophilic attack on C=C → carbocation<br />
              2. Nucleophilic attack → product
            </p>
          </div>
        </div>
        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-sm bg-[#1c1c1e] px-2 py-1.5">
            <div className="flex gap-[3px]">
              <span className="h-1 w-1 rounded-full bg-[#5a35f8] animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1 w-1 rounded-full bg-[#5a35f8] animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-1 w-1 rounded-full bg-[#5a35f8] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-2.5 pb-2">
        <div className="flex items-center gap-1 bg-[#1c1c1e] rounded-full px-2 py-1 border border-white/[0.04]">
          <span className="text-[7px] text-[#3f3f46] flex-1">Ask anything…</span>
          <div className="h-3.5 w-3.5 rounded-full bg-[#5a35f8] flex items-center justify-center">
            <span className="text-[6px] text-white">↑</span>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-1.5">
        <div className="w-16 h-[3px] bg-white/20 rounded-full" />
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Section
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

        {/* ━━━ Device Mockups ━━━ */}
        <RevealSection delay={0.2} className="relative mx-auto max-w-4xl">
          <div className="purple-glow">

            {/* ───── Laptop ───── */}
            <div className="relative">
              <MacBookFrame>
                <DashboardContent />
              </MacBookFrame>
            </div>

            {/* ───── Phone — angled ───── */}
            <div className="absolute -bottom-8 -left-2 sm:left-8 z-20">
              <div style={{ perspective: "1200px" }}>
                <iPhoneFrame
                  className="transition-transform duration-700 ease-out hover:rotate-0"
                  style={{
                    transform: "rotateY(-18deg) rotateX(4deg) rotateZ(-1deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <PhoneContent />
                </iPhoneFrame>
              </div>
            </div>

          </div>
        </RevealSection>
      </div>
    </section>
  );
}
