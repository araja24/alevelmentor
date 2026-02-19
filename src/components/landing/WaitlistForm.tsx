"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    Trophy,
    Copy,
    Check,
    TrendingUp,
    Users,
} from "lucide-react";
import { waitlistSchema } from "@/lib/validations";
import { landingCopy } from "@/content/landingCopy";

const JOIN_BUTTON_COLOR = "#533fec";

function WaitlistFormContent() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [referralLink, setReferralLink] = useState("");
    const [position, setPosition] = useState<number | null>(null);
    const [totalUsers, setTotalUsers] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
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
        return () => { cancelled = true; };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Client-side Zod Validation
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
                body: JSON.stringify({ email, referralCode }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setSuccess(true);
            setAlreadyRegistered(data.already_registered ?? false);
            setReferralLink(`${window.location.origin}/?ref=${data.referral_code}`);
            setPosition(data.rank);
            setTotalUsers(data.total_count);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto text-left animate-scale-in">
                <div className="glass-card mb-6 overflow-hidden rounded-[24px] bg-[var(--bg-card)] border-[var(--glass-border-strong)] shadow-2xl">
                    <div className="bg-gradient-to-r from-[var(--accent-2)]/20 to-[#3ed6ff]/10 p-8 border-b border-[var(--border-muted)] flex items-center gap-5">
                        <div className="bg-[var(--accent-2)] rounded-full p-3 text-white shadow-lg ring-4 ring-[var(--accent-2)]/20" style={{ boxShadow: "0 10px 24px color-mix(in srgb, var(--accent-2) 40%, transparent)" }}>
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)]">
                                {alreadyRegistered ? "Welcome back!" : "You're on the list!"}
                            </h3>
                            <p className="text-sm font-medium mt-1 text-[var(--accent-2)]">
                                {alreadyRegistered
                                    ? "You're already registered. Here's your current status."
                                    : "Welcome to the inner circle."}
                            </p>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-2 gap-4">
                        <div className="bg-[var(--surface-subtle)] p-5 rounded-[16px] border border-[var(--border-muted-strong)] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--glass-bg)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Your Rank</p>
                            <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">#{position?.toLocaleString()}</span>
                        </div>
                        <div className="bg-[var(--surface-subtle)] p-5 rounded-[16px] border border-[var(--border-muted-strong)] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--glass-bg)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Total Users</p>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">{totalUsers?.toLocaleString()}</span>
                                <span className="text-[10px] font-bold mt-1 flex items-center gap-1 text-[var(--color-text-green-accent)]">
                                    <TrendingUp className="w-3 h-3" /> +120 today
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        <p className="text-sm text-muted mb-4 leading-relaxed">
                            Invite friends to jump the queue. <span className="text-[var(--text-primary)] font-semibold">First 50 Get Pro Free. <span className="text-[var(--accent-2)]">Forever.</span></span>
                        </p>

                        <div className="flex gap-3">
                            <div className="flex-1 h-12 px-4 rounded-[12px] border border-[var(--border-muted)] flex items-center text-sm font-mono truncate select-all shadow-inner bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                                {referralLink}
                            </div>
                            <Button
                                onClick={copyToClipboard}
                                size="icon"
                                className={cn(
                                    "shrink-0 h-12 w-12 rounded-[12px] transition-all duration-200 border-0 shadow-lg",
                                    copied ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-white text-black hover:bg-white/90"
                                )}
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto px-4 sm:px-0">
            {/* Same layout as hero section: stacked on mobile, row on sm+ */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-3 gap-y-3 items-center">
                <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-1 sm:col-span-1 h-12 w-full rounded-xl border-0 px-5 text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-0 bg-[var(--surface-subtle)] text-[var(--text-primary)]"
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="col-span-1 sm:col-span-1 h-12 w-full sm:w-auto rounded-xl px-6 font-bold shrink-0 cursor-pointer text-white sm:col-start-2 sm:row-start-1"
                    style={{ backgroundColor: JOIN_BUTTON_COLOR }}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        landingCopy.waitlist.submit
                    )}
                </Button>
            </form>

            {error && (
                <p className="text-red-400 text-sm mt-4 text-center animate-fade-in-up">
                    {error}
                </p>
            )}

            <p className="flex items-center justify-center gap-1.5 mt-4 text-center text-[11px] sm:text-xs text-neutral-500">
                <Users className="h-3.5 w-3.5 shrink-0" />
                <span>
                    {waitlistCount !== null
                        ? `${waitlistCount.toLocaleString()} ${landingCopy.waitlist.peopleOnWaitlist}`
                        : "—"}
                </span>
                <span>• You&apos;ll be notified when we launch.</span>
            </p>
        </div>
    );
}

export function WaitlistForm() {
    return (
        <Suspense fallback={<div className="h-14 w-full max-w-[480px] bg-[var(--surface-subtle)] rounded-2xl animate-pulse" />}>
            <WaitlistFormContent />
        </Suspense>
    );
}
