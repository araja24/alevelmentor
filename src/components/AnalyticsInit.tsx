"use client";

import { useEffect } from "react";

/**
 * Inits PostHog after paint to avoid competing with LCP and reduce TBT.
 * Delay of 2s keeps analytics out of the critical path.
 */
export function AnalyticsInit() {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        if (!key) return;

        const timer = setTimeout(() => {
            import("posthog-js").then(({ default: posthog }) => {
                posthog.init(key, {
                    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
                    defaults: "2026-01-30",
                });
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return null;
}
