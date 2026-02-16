"use client";

import { RevealSection } from "./RevealSection";
import Link from "next/link";

/**
 * Bridge section after Problem: "That's why we built you a complete A-Level revision system."
 * Leads naturally into FeaturePreviews.
 */
export function SystemBridge() {
    return (
        <section
            id="system-intro"
            className="section-pad relative z-10"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="mx-auto max-w-[800px] px-6 text-center">
                <RevealSection direction="up">
                    <h2 className="h2 gradient-text-heading">
                        That&apos;s why we built you a complete{" "}
                        <span className="whitespace-nowrap gradient-text-purple-vertical">A Level revision system</span>.
                    </h2>
                    <p className="body-lg mt-4 text-muted">
                        One place for your plan, past papers, and progress.
                    </p>
                    <Link
                        href="#features"
                        className="mt-6 inline-block body font-medium gradient-text hover:opacity-90 transition-opacity"
                    >
                        See how it works →
                    </Link>
                </RevealSection>
            </div>
        </section>
    );
}
