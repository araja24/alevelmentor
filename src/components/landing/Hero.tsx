"use client";

import { RevealSection } from "./RevealSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ShimmerButton } from "./ShimmerButton";
import { UniversityLogoCarousel } from "./UniversityLogoCarousel";
import { landingCopy } from "@/content/landingCopy";

export function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
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
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#5a35f8" />
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

            {/* Vertical purple glow streaming down from CTA — desktop/tablet only */}
            <div className="hero-glows absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-[52%] w-[340px] h-[620px]"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(90,53,248,0.25) 0%, rgba(90,53,248,0.12) 38%, transparent 72%)",
                    }}
                />
            </div>

            {/* Mobile layout */}
            <div className="relative z-10 md:hidden mx-auto max-w-[560px] px-5 sm:px-6 pt-24 pb-10 min-h-[62svh] flex items-center justify-center">
                <RevealSection direction="up" className="w-full flex flex-col items-center text-center">
                    <span className="pill-badge px-4 py-1.5 text-[11px] mb-5">
                        {landingCopy.hero.badge}
                    </span>
                    <h1 className="h1 mb-4 text-[clamp(2rem,9vw,2.6rem)] leading-[1.06]">
                        <span className="gradient-text-heading">The All-In-One Platform for </span>
                        <span className="gradient-text-purple-vertical mobile-purple-glow">A-Levels.</span>
                    </h1>
                    <p className="text-base text-muted mb-7">{landingCopy.hero.subline}</p>
                    <ShimmerButton
                        href="#join"
                        className="w-full justify-center h-12 px-6 py-3.5 text-base"
                        data-ph-capture="hero_cta_click"
                        data-ph-target="hero_cta"
                    >
                        {landingCopy.hero.primaryCta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </ShimmerButton>
                </RevealSection>
            </div>

            {/* Desktop/tablet layout */}
            <div className="hidden md:block mx-auto max-w-[900px] w-full px-6 lg:px-8 relative z-10 text-center pt-24 pb-16 lg:pt-28 lg:pb-20 min-h-[min(100dvh,720px)]">
                <RevealSection direction="up" className="flex flex-col items-center">
                    <span className="pill-badge px-4 py-1.5 text-[11px] sm:text-[12px] mb-6">
                        {landingCopy.hero.badge}
                    </span>

                    <h1 className="h1 mb-6 gradient-text-heading">
                        The All-In-One Platform for{" "}
                        <span className="gradient-text-purple-vertical">A-Levels.</span>
                    </h1>

                    <p className="body-lg leading-relaxed text-muted max-w-[600px] mx-auto mb-10">
                        {landingCopy.hero.subline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <ShimmerButton
                            href="#join"
                            className="w-full sm:w-auto justify-center h-12 px-8 py-3 text-base"
                            data-ph-capture="hero_cta_click"
                            data-ph-target="hero_cta"
                        >
                            {landingCopy.hero.primaryCta}
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </ShimmerButton>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto text-center text-base font-medium gradient-text-heading rounded-full h-12 px-8 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--glass-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] border border-[var(--border-muted-strong)] hover:bg-[var(--surface-subtle)]"
                        >
                            {landingCopy.hero.secondaryCta}
                        </Link>
                    </div>
                </RevealSection>
                <RevealSection direction="none" noBlur className="flex flex-col items-center w-full mt-8">
                    <UniversityLogoCarousel />
                </RevealSection>
            </div>

            {/* Bottom fade into dashboard area */}
            <div className="hero-bottom-fade absolute bottom-0 left-0 right-0 h-20 pointer-events-none" />
        </section>
    );
}
