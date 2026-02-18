"use client";

import { RevealSection } from "@/components/landing/RevealSection";
import { ShimmerButton } from "@/components/landing/ShimmerButton";

/**
 * One short, punchy outcome or "how it works" block; outcome-focused copy.
 */
export function TextHighlightSection() {
    return (
        <section
            className="relative z-10 py-16 md:py-20"
            style={{ background: "var(--bg-secondary)" }}
        >
            <div className="mx-auto max-w-[800px] px-6 text-center">
                <RevealSection fast>
                    <h2 className="h2 gradient-text-heading mb-4 max-w-[65ch] mx-auto">
                        Less time planning. More time improving your grades.
                    </h2>
                    <p className="body-lg leading-relaxed text-muted max-w-[55ch] mx-auto mb-10">
                        We build your week-by-week plan from your subjects and exam board. It adapts to topic tests, sick days, and lazy days — we manage the rest so you can follow worry-free and focus on what actually moves the needle.
                    </p>
                    <ShimmerButton href="#join" className="inline-flex justify-center px-5 py-2 text-base">
                        Get instant feedback
                    </ShimmerButton>
                </RevealSection>
            </div>
        </section>
    );
}
