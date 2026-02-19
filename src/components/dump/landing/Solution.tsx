"use client";

import { RevealSection } from "@/components/landing/RevealSection";
import { Monitor, Tablet, Smartphone } from "lucide-react";

/* ═══════════════════════════════════════════
   Solution Section
   ═══════════════════════════════════════════ */
export function Solution() {
    return (
        <section id="solution" className="relative overflow-hidden z-10" style={{ background: "var(--bg-primary)", paddingTop: "100px", paddingBottom: "80px" }}>
            <div className="mx-auto max-w-[1200px] px-6">
                {/* ── Text left, placeholder right ── */}
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
                            A plan that adapts to real life so you can follow worry-free — built by students who now study at top universities.
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
                                    <platform.Icon className="h-4 w-4 text-[var(--accent-2)]" />
                                    <span>{platform.label}</span>
                                </div>
                            ))}
                        </div>
                    </RevealSection>

                    {/* Right column placeholder */}
                    <RevealSection direction="right" delay={0.15}>
                        <div className="min-h-[280px] rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-subtle)] flex items-center justify-center text-muted text-sm">
                            Coming soon
                        </div>
                    </RevealSection>
                </div>
            </div>
        </section>
    );
}
