"use client";

import { RevealSection } from "./RevealSection";
import { MacBookFrame, IPhoneFrame } from "@/components/ui/device-frames";
import { Monitor, Tablet, Smartphone } from "lucide-react";

/* ── Dashboard inside laptop ── */
function DashboardContent() {
    return (
        <div className="w-full flex flex-col h-full bg-[#0c0c0e]">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04] shrink-0 bg-[#0c0c0e]">
                <div className="flex gap-[5px] shrink-0">
                    <div className="h-[7px] w-[7px] rounded-full bg-white/10" />
                    <div className="h-[7px] w-[7px] rounded-full bg-white/10" />
                    <div className="h-[7px] w-[7px] rounded-full bg-white/10" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="rounded-md px-3 py-[2px] text-[7px] font-mono border border-white/[0.03] max-w-[160px] w-full text-center opacity-50 bg-[#09090b] text-[#a1a1aa]">
                        alevelmentor.com/dashboard
                    </div>
                </div>
            </div>

            <div className="p-3 flex gap-3 flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="hidden sm:block w-24 shrink-0 space-y-0.5">
                    <div className="rounded-[8px] px-2 py-1 bg-[#5a35f8]/10 border border-[#5a35f8]/20">
                        <p className="text-[7px] font-medium text-[#5a35f8]">📍 Roadmap</p>
                    </div>
                    {["🧠 Mentor", "📊 Analytics", "📄 Papers", "⚙️ Settings"].map((item) => (
                        <div key={item} className="px-2 py-0.5">
                            <p className="text-[7px] opacity-40 text-[#a1a1aa]">{item}</p>
                        </div>
                    ))}
                </div>

                {/* Main */}
                <div className="flex-1 space-y-2 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[6px] font-medium uppercase tracking-wider opacity-50 text-[#a1a1aa]">Week 12 of 18</p>
                            <p className="text-[10px] sm:text-xs font-semibold mt-0.5 text-[#fafafa]">Chemistry Roadmap</p>
                        </div>
                        <span className="text-[7px] text-emerald-400 font-semibold">67%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.05]">
                        <div className="h-1 rounded-full bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9] w-[67%]" />
                    </div>
                    {[
                        { task: "Organic Mechanisms Revision", status: "done" },
                        { task: "Equilibria — Practice Qs", status: "done" },
                        { task: "Electrochemistry Notes", status: "current" },
                        { task: "Acids & Bases Past Paper", status: "todo" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 rounded-[8px] border border-white/[0.06] px-2 py-1 bg-[#0c0c0e]">
                            <div className={`h-2 w-2 rounded-full border flex items-center justify-center shrink-0 ${item.status === "done" ? "border-emerald-500 bg-emerald-500" : item.status === "current" ? "border-[#5a35f8] bg-[#5a35f8]/20" : "border-white/20"}`}>
                                {item.status === "done" && (
                                    <svg className="h-1 w-1 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                )}
                            </div>
                            <span className={`text-[7px] sm:text-[8px] ${item.status === "done" ? "line-through opacity-40" : ""}`} style={{ color: item.status === "done" ? "#a1a1aa" : "#fafafa" }}>
                                {item.task}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Chat inside phone ── */
function PhoneContent() {
    return (
        <div className="flex flex-col h-full overflow-hidden bg-[#09090b]">
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.04] shrink-0">
                <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[#5a35f8] to-[#8b6cf9]">
                    <span className="text-[6px] text-white font-bold">M</span>
                </div>
                <div>
                    <p className="text-[8px] font-semibold leading-none text-[#fafafa]">Study Mentor</p>
                    <p className="text-[6px] text-emerald-400 leading-none mt-0.5">Online</p>
                </div>
            </div>

            <div className="flex-1 px-2.5 py-2 space-y-1.5 overflow-hidden">
                <div className="flex justify-end">
                    <div className="rounded-2xl rounded-br-sm px-2 py-1 max-w-[82%] bg-[#5a35f8]">
                        <p className="text-[7px] text-white leading-relaxed">Explain electrophilic addition</p>
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm px-2 py-1 max-w-[88%] bg-[#121214]">
                        <p className="text-[7px] leading-relaxed text-[#a1a1aa]">
                            An electrophile attacks the π bond of an alkene, forming a carbocation intermediate…
                        </p>
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm px-2 py-1.5 bg-[#121214]">
                        <div className="flex gap-[3px]">
                            <span className="h-1 w-1 rounded-full animate-bounce bg-[#5a35f8] delay-0" />
                            <span className="h-1 w-1 rounded-full animate-bounce bg-[#5a35f8] delay-150" />
                            <span className="h-1 w-1 rounded-full animate-bounce bg-[#5a35f8] delay-300" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-2.5 pb-2 shrink-0">
                <div className="flex items-center gap-1 rounded-full px-2 py-1 border border-white/[0.04] bg-[#121214]">
                    <span className="text-[7px] flex-1 opacity-40 text-[#a1a1aa]">Ask anything…</span>
                    <div className="h-3.5 w-3.5 rounded-full flex items-center justify-center shrink-0 bg-[#5a35f8]">
                        <span className="text-[6px] text-white">↑</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pb-1.5 shrink-0">
                <div className="w-16 h-[3px] bg-white/20 rounded-full" />
            </div>
        </div>
    );
}

export function Solution() {
    return (
        <section id="solution" className="relative overflow-hidden z-10" style={{ background: "var(--bg-primary)", paddingTop: "100px", paddingBottom: "80px" }}>
            <div className="mx-auto max-w-[1100px]">
                {/* ── Text left, Device right ── */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <RevealSection direction="left">
                        <span className="pill-badge mb-6 inline-flex">Platform</span>
                        <h2 className="h2 mb-6">
                            <span className="gradient-text">Coming Soon</span>
                            <br />
                            <span className="text-[#fafafa]">on the Web</span>
                        </h2>
                        <p className="body-lg mb-8 opacity-60">
                            Your revision mentor is almost here. Any browser, any device.
                            Everything you need to hit your target grades, structured and ready.
                        </p>
                        <div className="flex items-center gap-4 flex-wrap">
                            {[
                                { label: "Desktop", Icon: Monitor },
                                { label: "Tablet", Icon: Tablet },
                                { label: "Mobile", Icon: Smartphone },
                            ].map((platform) => (
                                <div
                                    key={platform.label}
                                    className="glass-card flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full text-[#a1a1aa]"
                                >
                                    <platform.Icon className="h-4 w-4 text-[#5a35f8]" />
                                    <span>{platform.label}</span>
                                </div>
                            ))}
                        </div>
                    </RevealSection>

                    {/* Devices */}
                    <RevealSection direction="right" delay={0.15}>
                        <div className="relative">
                            <div className="purple-glow cursor-pointer hover:scale-[1.01] transition-transform duration-500">
                                <MacBookFrame glow glowColor="var(--accent-1)">
                                    {/* SCALED CONTENT TO PREV OVERFLOW */}
                                    <div className="origin-top scale-[0.98] w-full h-full">
                                        <DashboardContent />
                                    </div>
                                </MacBookFrame>
                            </div>

                            {/* Phone — angled overlay */}
                            <div className="absolute -bottom-4 sm:-bottom-8 -left-2 sm:left-4 z-30 w-[90px] sm:w-[120px] md:w-[140px]">
                                <div style={{ perspective: "1200px" }}>
                                    <IPhoneFrame
                                        glow
                                        glowColor="var(--accent-2)"
                                        className="transition-transform duration-700 ease-out hover:rotate-0"
                                        style={{
                                            transform: "rotateY(-18deg) rotateX(4deg) rotateZ(-1deg)",
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {/* SCALED CONTENT TO PREV OVERFLOW */}
                                        <div className="origin-top scale-[0.98] w-full h-full">
                                            <PhoneContent />
                                        </div>
                                    </IPhoneFrame>
                                </div>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
