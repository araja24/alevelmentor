"use client";

import { RevealSection } from "./RevealSection";
import { cn } from "@/lib/utils";

function StatCard({
    value,
    label,
    sublabel,
    delay = 0
}: {
    value: string;
    label: string;
    sublabel?: string;
    delay?: number;
}) {
    return (
        <RevealSection delay={delay} className="w-full">
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 relative group">
                {/* Spotlight Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <h3 className="text-[clamp(64px,10vw,120px)] font-bold tracking-tight leading-none text-center relative z-10"
                    style={{
                        background: "linear-gradient(to bottom, #ffffff 20%, #4ade80 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}>
                    {value}
                </h3>
                <p className="text-lg sm:text-2xl mt-4 font-medium text-[#a1a1aa] text-center relative z-10">
                    {label}
                </p>

                {sublabel && (
                    <p className="text-sm mt-2 text-[#52525b] uppercase tracking-widest font-semibold opacity-60">
                        {sublabel}
                    </p>
                )}
            </div>
        </RevealSection>
    );
}

export function ImpactStats() {
    return (
        <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
            {/* Background radial gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5a35f8]/5 rounded-full blur-[120px]" />
            </div>

            <div className="mx-auto max-w-[800px] space-y-8 sm:space-y-16 px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="pill-badge mb-6 inline-flex">Impact</span>
                    <h2 className="h2 mt-4">
                        Real results, <span className="gradient-text">quantified</span>.
                    </h2>
                </div>

                <div className="space-y-12 sm:space-y-24 divide-y divide-white/[0.05]">
                    <StatCard
                        value="1h 23m"
                        label="saved daily"
                        sublabel="Average time reclaimed"
                    />
                    <StatCard
                        value="1 month"
                        label="saved each year"
                        sublabel="Total study efficiency"
                        delay={0.1}
                    />
                    <StatCard
                        value="10,000+"
                        label="students joined"
                        sublabel="Waiting for access"
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
}
