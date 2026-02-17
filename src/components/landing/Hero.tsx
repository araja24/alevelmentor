"use client";

import { RevealSection } from "./RevealSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ShimmerButton } from "./ShimmerButton";
import { UniversityLogoCarousel } from "./UniversityLogoCarousel";

export function Hero() {
    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center overflow-hidden min-h-[min(100dvh,720px)] pt-24 pb-16 lg:pt-28 lg:pb-20"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Vertical purple glow streaming down from CTA — hidden in light via .light .hero-glows */}
            <div className="hero-glows absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-[52%] w-[300px] h-[600px] blur-[80px]"
                    style={{
                        background: "linear-gradient(180deg, rgba(90,53,248,0.5) 0%, rgba(90,53,248,0.15) 40%, transparent 100%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-[900px] w-full px-6 relative z-10 text-center">
                <RevealSection direction="up" className="flex flex-col items-center">
                    {/* Pill badge (Crypton style) */}
                    <span className="pill-badge px-4 py-1.5 text-[11px] sm:text-[12px] mb-6">
                        Built by students, for students
                    </span>

                    <h1 className="h1 mb-6 gradient-text-heading">
                        You need A*s. <span className="gradient-text-purple-vertical">We have the solution.</span>
                    </h1>

                    <p className="body-lg leading-relaxed text-muted max-w-[600px] mx-auto mb-10">
                        Stop wasting hours on color-coded timetables. We generate a{" "}
                        <span className="relative inline-block gradient-text-heading font-medium">
                            personalized plan
                            <svg
                                className="absolute -bottom-1 -left-1 w-[105%] h-[8px] lg:h-[10px] text-[var(--accent-2)] -rotate-1 opacity-80"
                                viewBox="0 0 200 9"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M2.00025 6.99998C28.5368 7.37346 116.326 2.01633 197.999 3.00004C108.665 4.50854 36.9142 -0.871185 2.00025 6.99998Z"
                                    fill="currentColor"
                                    stroke="none"
                                />
                            </svg>
                        </span>{" "}
                        that adapts to real life — topic tests, sick days, lazy days and all. We manage everything so you can de-stress and follow worry-free. Spend 0% of your time planning and 100% improving your grade.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <ShimmerButton href="#join" className="w-full sm:w-auto justify-center px-8 py-3">
                            Join the waitlist
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </ShimmerButton>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto text-center text-base font-medium gradient-text-heading rounded-full px-8 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--glass-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] border border-[var(--border-muted-strong)] hover:bg-[var(--surface-subtle)]"
                        >
                            Browse features
                        </Link>
                    </div>

                </RevealSection>
                    {/* Carousel: no blur (noBlur), Cormorant, full uni names */}
                    <RevealSection direction="none" noBlur className="flex flex-col items-center w-full mt-8">
                        <UniversityLogoCarousel />
                    </RevealSection>
            </div>

            {/* Bottom fade into dashboard area */}
            <div className="hero-bottom-fade absolute bottom-0 left-0 right-0 h-20 pointer-events-none" />
        </section>
    );
}
