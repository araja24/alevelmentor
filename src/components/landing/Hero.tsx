"use client";

import { RevealSection } from "./RevealSection";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { landingCopy } from "@/content/landingCopy";

export function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
    
            {/* Mobile-only topography energy */}
            <div className="absolute inset-0 pointer-events-none md:hidden">
                <svg
                    className="absolute -top-20 -left-16 h-[150%] w-[150%] opacity-[0.08] animate-[float-drift_16s_ease-in-out_infinite]"
                    viewBox="0 0 500 500"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                >
                    <defs>
                        <linearGradient id="heroTopoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#533fec" />
                            <stop offset="100%" stopColor="#533fec" />
                        </linearGradient>
                    </defs>
                    <g fill="none" stroke="url(#heroTopoGradient)" strokeWidth="1">
                        <path d="M20 100 C90 60 150 160 240 110 C320 70 380 150 470 100" />
                        <path d="M10 150 C90 110 150 210 250 160 C330 120 390 200 490 150" />
                        <path d="M0 200 C80 160 160 260 260 210 C340 170 420 250 500 210" />
                        <path d="M20 250 C90 210 170 310 270 260 C350 220 430 300 500 260" />
                        <path d="M0 300 C70 260 160 360 260 310 C340 270 430 350 500 310" />
                    </g>
                </svg>
            </div>

            {/* Mobile layout */}
            <div className="relative z-10 md:hidden mx-auto max-w-[560px] px-5 sm:px-6 pt-36 pb-10 min-h-[62svh] flex flex-col items-center justify-center text-center">
                <RevealSection direction="up" className="w-full flex flex-col items-center">
                    <span className="pill-badge px-4 py-1.5 text-[11px] mb-5">
                        {landingCopy.hero.badge}
                    </span>
                    <h1 className="h1 mb-4 text-[clamp(2rem,9vw,2.6rem)] leading-[1.06]">
                        <span className="gradient-text-heading">The <span className="gradient-text-heading underline decoration-[var(--accent-2)] decoration-2 underline-offset-4">All-In-One</span> Platform for </span>
                        <span className="gradient-text-purple-vertical accent-glow-text">A-Levels.</span>
                    </h1>
                    <Link
                        href="#dashboard-preview"
                        className="mt-5 inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-medium cursor-pointer transition-colors hover:opacity-80 landing-muted"
                        style={{ borderColor: "#1e1e1e" }}
                    >
                        {landingCopy.hero.secondaryCta}
                    </Link>
                </RevealSection>
            </div>

            {/* Desktop/tablet layout */}
            <div className="hidden md:block mx-auto max-w-[900px] w-full px-6 lg:px-8 relative z-10 text-center pt-36 pb-16 lg:pt-40 lg:pb-20 min-h-[min(100dvh,720px)]">
                <RevealSection direction="up" className="flex flex-col items-center">
                    <span className="pill-badge px-4 py-1.5 text-[11px] sm:text-[12px] mb-6">
                        {landingCopy.hero.badge}
                    </span>
                    <h1 className="h1 mb-6 gradient-text-heading">
                        The <span className="gradient-text-heading underline decoration-[var(--accent-2)] decoration-2 underline-offset-4">All-In-One</span> Platform for{" "}
                        <span className="gradient-text-purple-vertical accent-glow-text">A-Levels.</span>
                    </h1>
                    <Link
                        href="#dashboard-preview"
                        className="mt-5 inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-medium cursor-pointer transition-colors hover:opacity-80 landing-muted"
                        style={{ borderColor: "#1e1e1e" }}
                    >
                        {landingCopy.hero.secondaryCta}
                    </Link>
                </RevealSection>
            </div>

            {/* Scroll indicator: scroll to dashboard preview */}
            <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center">
                <button
                    type="button"
                    onClick={() => {
                        const next = document.getElementById("dashboard-preview");
                        next?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
                    }}
                    className="flex flex-col items-center gap-1 transition-colors cursor-pointer bg-transparent border-0 landing-muted"
                    aria-label="Scroll to dashboard preview"
                >
                    <span className="text-[11px] font-medium tracking-wide uppercase">scroll</span>
                    <ChevronDown
                        className="h-5 w-5 animate-bounce"
                        strokeWidth={2.5}
                        aria-hidden
                    />
                </button>
            </div>

            {/* Bottom fade into dashboard area */}
            <div className="hero-bottom-fade absolute bottom-0 left-0 right-0 h-20 pointer-events-none" />
        </section>
    );
}
