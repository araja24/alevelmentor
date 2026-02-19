"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { waitlistSchema } from "@/lib/validations";
import { landingCopy } from "@/content/landingCopy";

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
            className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center py-16 px-6 md:py-20"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            <div className="w-full max-w-md flex flex-col items-center text-center">
                <p className="text-sm text-muted mb-6 mx-auto max-w-[50ch]">
                    {landingCopy.finalCta.disclaimer}
                </p>
                {success ? (
                    <p className="text-lg landing-muted">You&apos;re on the list. We&apos;ll be in touch.</p>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center"
                    >
                        <Input
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 w-full rounded-xl border-0 px-5 text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-0 bg-[var(--surface-subtle)] text-[var(--text-primary)]"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 w-full sm:w-auto rounded-xl px-6 font-bold shrink-0 cursor-pointer text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed sm:col-start-2 sm:row-start-1"
                            style={{ backgroundColor: JOIN_BUTTON_COLOR }}
                        >
                            {loading ? (
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                                landingCopy.waitlist.submit
                            )}
                        </Button>
                    </form>
                )}
                <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] mt-4 opacity-90 whitespace-nowrap text-muted">
                    <Users className="h-3 w-3 shrink-0" />
                    <span>
                        {waitlistCount !== null
                            ? `${waitlistCount.toLocaleString()} ${landingCopy.waitlist.peopleOnWaitlist}`
                            : "—"}
                    </span>
                    <span>· You&apos;ll be notified when we launch.</span>
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
            </div>
        </section>
    );
}

export function WaitlistWithDashboardSection() {
    return (
        <WaitlistWithDashboardContent />
    );
}
