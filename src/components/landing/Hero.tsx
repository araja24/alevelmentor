"use client";

import { RevealSection } from "./RevealSection";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { landingCopy } from "@/content/landingCopy";

export function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden min-h-[100dvh] flex flex-col items-center justify-center"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            {/* Mobile layout — headline only (A-Levels on its own line) */}
            <div className="relative z-10 md:hidden w-full mx-auto max-w-[560px] px-5 sm:px-6 py-12 flex flex-col items-center justify-center text-center flex-1">
                <RevealSection direction="up" className="w-full flex flex-col items-center">
                    <h1 className="mb-10 max-w-4xl text-center text-[clamp(32px,8vw,64px)] font-bold leading-[1.1] tracking-tight">
                        <span style={{ color: "var(--text-primary)" }}>{landingCopy.hero.headlineWhite} </span>
                        <span className="text-foreground/50">{landingCopy.hero.headlineGray}</span>
                        <br />
                        <span style={{ color: "#533fec" }}>{landingCopy.hero.headlineAccent}</span>
                    </h1>
                    <Link
                        href="#features"
                        className="mt-2 text-xs font-medium cursor-pointer transition-colors hover:opacity-80"
                        style={{ color: "var(--text-dimmed)" }}
                    >
                        {landingCopy.hero.secondaryCta}
                    </Link>
                </RevealSection>
            </div>

            {/* Desktop/tablet layout */}
            <div className="hidden md:flex flex-col items-center justify-center w-full mx-auto max-w-[900px] px-6 lg:px-8 relative z-10 text-center py-20 flex-1">
                <RevealSection direction="up" className="flex flex-col items-center w-full">
                    <h1 className="mb-10 max-w-4xl text-center text-[clamp(32px,8vw,64px)] font-bold leading-[1.1] tracking-tight">
                        <span style={{ color: "var(--text-primary)" }}>{landingCopy.hero.headlineWhite} </span>
                        <span className="text-foreground/50">{landingCopy.hero.headlineGray}</span>
                        <br />
                        <span style={{ color: "#533fec" }}>{landingCopy.hero.headlineAccent}</span>
                    </h1>
                    <Link
                        href="#features"
                        className="mt-2 text-sm font-medium cursor-pointer transition-colors hover:opacity-80"
                        style={{ color: "var(--text-dimmed)" }}
                    >
                        {landingCopy.hero.secondaryCta}
                    </Link>
                </RevealSection>
            </div>

            {/* Above scroll: same font as headline, purple (#533fec) underline on "Stay on track", then scroll indicator */}
            <p
                className="absolute bottom-20 left-0 right-0 z-10 mx-auto max-w-lg px-6 text-center text-lg font-medium leading-relaxed sm:bottom-24 sm:text-xl"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-display), var(--font-sans), system-ui, sans-serif" }}
            >
                <span className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--text-primary)", textDecorationColor: "#533fec" }}>Stay on track</span>
                {" "}without the distractions across your{" "}
                <span className="font-semibold underline decoration-2 underline-offset-4" style={{ color: "var(--text-primary)", textDecorationColor: "#533fec" }}>revision and exams</span>.
            </p>
            <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center">
                <button
                    type="button"
                    onClick={() => {
                        const next = document.getElementById("join");
                        next?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex flex-col items-center gap-1 transition-colors cursor-pointer bg-transparent border-0"
                    style={{ color: "var(--text-dimmed)" }}
                    aria-label="Scroll to next section"
                >
                    <span className="text-[11px] font-medium tracking-wide uppercase">scroll</span>
                    <ChevronDown
                        className="h-5 w-5 animate-bounce"
                        strokeWidth={2.5}
                        aria-hidden
                    />
                </button>
            </div>
        </section>
    );
}
