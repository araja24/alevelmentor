"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { waitlistSchema } from "@/lib/validations";
import { landingCopy } from "@/content/landingCopy";
import { DashboardPreviewSection } from "./DashboardPreviewSection";

const JOIN_BUTTON_COLOR = "#533fec";

function WaitlistWithDashboardContent() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

    const referralCode = searchParams.get("ref");

    useEffect(() => {
        let cancelled = false;
        fetch("/api/waitlist")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (!cancelled && data && typeof data.total_count === "number") {
                    setWaitlistCount(data.total_count);
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const result = waitlistSchema.safeParse({ email, referralCode });
        if (!result.success) {
            setError(result.error.issues[0].message);
            setLoading(false);
            return;
        }
        try {
            const apiBase = typeof window !== "undefined" ? window.location.origin : "";
            const res = await fetch(`${apiBase}/api/waitlist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: result.data.email, referralCode: result.data.referralCode }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");
            setSuccess(true);
            if (typeof data.total_count === "number") setWaitlistCount(data.total_count);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="join"
            className="relative z-10 flex min-h-[75vh] flex-col items-center justify-center py-16 md:min-h-[80vh] md:flex-row md:justify-between md:items-center md:px-8 lg:px-0"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            {/* Mobile: dashboard first (centered); desktop: left block */}
            <div className="order-2 w-full max-w-md flex flex-col items-center text-center px-6 md:order-1 lg:absolute lg:left-[5%] xl:left-[10%] lg:top-1/2 lg:-translate-y-1/2 lg:items-end lg:text-right z-10">
                <h2 className="mb-10 max-w-md text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                    Your entire{" "}
                    <span className="underline decoration-2 underline-offset-4" style={{ textDecorationColor: JOIN_BUTTON_COLOR }}>A-Level</span>{" "}
                    <span className="underline decoration-2 underline-offset-4" style={{ textDecorationColor: JOIN_BUTTON_COLOR }}>revision workflow</span>{" "}
                    <span style={{ color: "var(--text-primary)", opacity: 0.5 }}>in one place.</span>
                </h2>

                {success ? (
                    <p className="text-lg" style={{ color: "var(--text-primary)", opacity: 0.9 }}>You&apos;re on the list. We&apos;ll be in touch.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full max-w-md grid grid-cols-[1fr_auto] gap-x-3 gap-y-3 items-center">
                        <Input
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-2 sm:col-span-1 h-12 w-full rounded-xl border-0 px-5 text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-0 bg-[var(--surface-subtle)] text-[var(--text-primary)]"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="col-span-2 sm:col-span-1 h-12 rounded-xl px-6 font-bold shrink-0 cursor-pointer text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed sm:col-start-2 sm:row-start-1"
                            style={{ backgroundColor: JOIN_BUTTON_COLOR }}
                        >
                            {loading ? (
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                                landingCopy.waitlist.submit
                            )}
                        </Button>
                        {/* Count + launch note: centered on mobile, left-aligned on desktop */}
                        <div className="col-span-2 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] mt-1.5 sm:justify-start sm:ml-4 sm:ml-5 opacity-70 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                            <Users className="h-3 w-3 shrink-0" />
                            <span>
                                {waitlistCount !== null
                                    ? `${waitlistCount.toLocaleString()} ${landingCopy.waitlist.peopleOnWaitlist}`
                                    : "—"}
                            </span>
                            <span>· You&apos;ll be notified when we launch.</span>
                        </div>
                    </form>
                )}

                {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
            </div>

            {/* Mobile: first (centered); desktop: far right */}
            <div className="order-1 flex min-h-[200px] w-full max-w-full flex-1 items-center justify-center md:order-2 md:mt-12 md:min-h-0 md:justify-end md:pl-4 md:pr-6 lg:absolute lg:right-[5%] xl:right-[10%] lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[50%]">
                <div className="origin-right h-auto max-h-[78vh] w-[94%] md:w-[85%] max-w-full flex items-center justify-center md:justify-end">
                    <div className="h-auto max-h-[78vh] w-full max-w-full">
                        <DashboardPreviewSection embedded />
                    </div>
                </div>
            </div>
        </section>
    );
}

export function WaitlistWithDashboardSection() {
    return (
        <WaitlistWithDashboardContent />
    );
}
