"use client";

import { useEffect } from "react";

/** Delay (ms): mobile gets 4s to keep TBT low; desktop 2s. */
function getAnalyticsDelay(): number {
    if (typeof window === "undefined") return 2000;
    const mobile =
        window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches;
    return mobile ? 4000 : 2000;
}

/**
 * Inits PostHog after paint to avoid competing with LCP and reduce TBT.
 * Mobile: 4s delay to reduce main-thread work; desktop: 2s.
 */
export function AnalyticsInit() {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        if (!key) return;

        const delay = getAnalyticsDelay();
        const timer = setTimeout(() => {
            import("posthog-js").then(({ default: posthog }) => {
                posthog.init(key, {
                    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
                    person_profiles: "identified_only",
                    defaults: "2026-01-30",
                });
            });
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    return null;
}
