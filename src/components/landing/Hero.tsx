"use client";

import { useState, useEffect, useRef } from "react";
import { RevealSection } from "./RevealSection";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { landingCopy } from "@/content/landingCopy";
import { DashboardPreviewSection } from "./DashboardPreviewSection";

const TYPEWRITER_PHRASES = [
    "A Level Physics",
    "A Level Maths",
    "A Level Chemistry",
    "A Level Biology",
    "A Level Computer Science",
];

const TYPING_SPEED_MS = 90;
const DELETING_SPEED_MS = 55;
const PAUSE_AFTER_WORD_MS = 1800;
const CURSOR_BLINK_MS = 530;

function TypewriterSubject({ className = "" }: { className?: string }) {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const currentPhrase = TYPEWRITER_PHRASES[wordIndex % TYPEWRITER_PHRASES.length];

    // Type / delete cycle
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const delay = isDeleting ? DELETING_SPEED_MS : TYPING_SPEED_MS;

        if (!isDeleting && charIndex < currentPhrase.length) {
            timeoutRef.current = setTimeout(() => {
                setDisplayed(currentPhrase.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, delay);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_WORD_MS);
        } else if (isDeleting && charIndex > 0) {
            timeoutRef.current = setTimeout(() => {
                setDisplayed(currentPhrase.slice(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }, delay);
        } else if (isDeleting && charIndex === 0) {
            timeoutRef.current = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex((i) => (i + 1) % TYPEWRITER_PHRASES.length);
            }, 400);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [charIndex, isDeleting, wordIndex, currentPhrase]);

    // Reset charIndex when moving to next phrase
    useEffect(() => {
        if (!isDeleting) setCharIndex(0);
    }, [wordIndex, isDeleting]);

    // Blinking cursor
    useEffect(() => {
        blinkRef.current = setInterval(() => setShowCursor((v) => !v), CURSOR_BLINK_MS);
        return () => {
            if (blinkRef.current) clearInterval(blinkRef.current);
        };
    }, []);

    return (
        <span className={className} aria-live="polite">
            {displayed}
            <span
                aria-hidden
                className="inline-block w-0.5 h-[0.9em] align-baseline ml-0.5 bg-current rounded-sm transition-opacity duration-100"
                style={{ opacity: showCursor ? 1 : 0 }}
            />
        </span>
    );
}

export function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            {/* Mobile layout */}
            <div className="relative z-10 md:hidden mx-auto max-w-[560px] px-5 sm:px-6 pt-36 pb-10 min-h-[62svh] flex flex-col items-center justify-center text-center">
                <RevealSection direction="up" className="w-full flex flex-col items-center">
                    <span className="pill-badge px-4 py-1.5 text-[11px] mb-5">
                        {landingCopy.hero.badge}
                    </span>
                    <h1 className="h1 mb-4 text-[clamp(2rem,9vw,2.6rem)] leading-[1.06]">
                        <span className="gradient-text-heading">The All-In-One Platform for </span>
                        <TypewriterSubject className="gradient-text-purple-vertical" />
                    </h1>
                    <Link
                        href="#text-highlight"
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
                    <h1 className="h1 mb-6">
                        <span className="gradient-text-heading">The All-In-One Platform for</span>{" "}
                        <TypewriterSubject className="gradient-text-purple-vertical" />
                    </h1>
                    <Link
                        href="#text-highlight"
                        className="mt-5 inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-medium cursor-pointer transition-colors hover:opacity-80 landing-muted"
                        style={{ borderColor: "#1e1e1e" }}
                    >
                        {landingCopy.hero.secondaryCta}
                    </Link>
                </RevealSection>
            </div>

            {/* Scroll indicator */}
            <div className="relative z-10 flex flex-col items-center mt-[calc(3rem-5vh)] mb-[calc(3rem+5vh)]">
                <button
                    type="button"
                    onClick={() => {
                        const dashboard = document.getElementById("dashboard-preview");
                        dashboard?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
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

            {/* Dashboard preview */}
            <div className="relative z-10 w-full flex justify-center px-4 md:px-6">
                <DashboardPreviewSection embedInHero />
            </div>

            {/* Bottom fade into dashboard area */}
            <div className="hero-bottom-fade absolute bottom-0 left-0 right-0 h-20 pointer-events-none" />
        </section>
    );
}
