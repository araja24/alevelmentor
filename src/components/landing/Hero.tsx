"use client";

import { useState, useEffect, useRef } from "react";
import { RevealSection } from "./RevealSection";
import { ShimmerButton } from "./ShimmerButton";
import { landingCopy } from "@/content/landingCopy";
import { DashboardPreviewSection } from "./DashboardPreviewSection";
import { Meteors } from "@/components/ui/meteors";
import { HandwrittenAnnotation } from "@/components/HandwrittenAnnotation";

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
      {/* Background effect */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Meteors number={36} className="opacity-40 bg-[#533fec]" />
      </div>

            {/* Mobile layout */}
      <div className="relative z-10 md:hidden mx-auto max-w-[560px] px-5 sm:px-6 pt-36 pb-6 flex flex-col items-center justify-center text-center">
                <RevealSection direction="up" className="w-full flex flex-col items-center">
                    <span className="pill-badge px-4 py-1.5 text-[11px] mb-5">
                        {landingCopy.hero.badge}
                    </span>
                    <h1 className="h1 mb-4 text-[clamp(2rem,9vw,2.6rem)] leading-[1.06]">
                        <span className="gradient-text-heading">The All-In-One Platform for </span>
                        <TypewriterSubject className="gradient-text-purple-vertical" />
                    </h1>
          <div className="mt-8">
            <ShimmerButton href="#join" className="px-6 py-2.5 w-full justify-center">
              {landingCopy.hero.primaryCta}
            </ShimmerButton>
          </div>
                </RevealSection>

                {/* Inline annotation (mobile) */}
                <div className="mt-10 w-full flex justify-end">
                  <HandwrittenAnnotation text="Secure A* grades with ALevelMentor*" delay={0.5} direction="down-left" />
                </div>
            </div>

            {/* Desktop/tablet layout */}
      <div className="hidden md:block mx-auto max-w-6xl px-6 lg:px-8 relative z-10 pt-36 pb-10 lg:pt-40 lg:pb-12">
                <RevealSection direction="up" className="flex flex-col items-center text-center">
                    <span className="pill-badge px-4 py-1.5 text-[11px] sm:text-[12px] mb-6">
                        {landingCopy.hero.badge}
                    </span>
                    <h1 className="h1 mb-6">
                        <span className="gradient-text-heading">The All-In-One Platform for</span>{" "}
                        <TypewriterSubject className="gradient-text-purple-vertical" />
                    </h1>
          <div className="mt-6">
            <ShimmerButton href="#join" className="px-6 py-2.5">
              {landingCopy.hero.primaryCta}
            </ShimmerButton>
          </div>
                </RevealSection>

                {/* Inline annotation + screenshot (desktop) */}
                <div className="mt-10 w-full flex justify-end">
                  <HandwrittenAnnotation text="Secure A* grades with ALevelMentor*" delay={0.5} direction="down-left" />
                </div>
            </div>

            {/* Dashboard preview (wider, matches previous sizing) */}
            <div className="relative z-10 w-full flex justify-center px-4 md:px-6 lg:px-[6rem] mt-3">
              <DashboardPreviewSection embedInHero />
            </div>

            {/* Bottom fade into dashboard area */}
            <div className="hero-bottom-fade absolute bottom-0 left-0 right-0 h-20 pointer-events-none" />
        </section>
    );
}
