"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Users,
    Trophy,
    Copy,
    Check,
    ArrowRight,
    TrendingUp,
    Sparkles
} from "lucide-react";
import { ShimmerButton } from "./ShimmerButton";
import { waitlistSchema } from "@/lib/validations";

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

    const referralCode = searchParams.get("ref");

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
            const res = await fetch("/api/waitlist", {
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
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto text-left"
            >
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
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[540px] mx-auto relative group">
            <div className={cn(
                "relative flex flex-col md:flex-row items-center gap-3 md:gap-0",
                // Desktop Styles
                "md:p-2 md:rounded-full md:bg-[var(--surface-subtle)] md:border md:border-[var(--border-muted-strong)] md:shadow-2xl md:transition-all md:duration-300",
                "md:focus-within:border-[var(--accent-2)]/50 md:focus-within:shadow-[0_0_40px_color-mix(in_srgb,var(--accent-2)_15%,transparent)]"
            )}>
                <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                        "w-full h-14 text-[16px] focus:outline-none focus:ring-0 transition-all text-[var(--text-primary)] placeholder:text-muted",
                        // Mobile: Separated box
                        "bg-[var(--surface-subtle)] border border-[var(--border-muted-strong)] rounded-2xl px-6 text-center focus:border-[var(--accent-2)]/50 focus:bg-[var(--accent-2)]/5",
                        // Desktop: Integrated field
                        "md:bg-transparent md:border-0 md:rounded-full md:px-6 md:text-left md:focus:bg-transparent"
                    )}
                />
                <ShimmerButton
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "h-14 w-full md:w-auto px-8 font-medium shrink-0 text-[15px]",
                        "rounded-2xl md:rounded-full"
                    )}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-[var(--text-secondary)]/30 border-t-[var(--text-primary)] rounded-full animate-spin" />
                    ) : (
                        "Join Waitlist →"
                    )}
                </ShimmerButton>
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-4 text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg"
                >
                    {error}
                </motion.p>
            )}

            <div className="mt-12 flex items-center justify-center gap-5 sm:gap-8 flex-wrap">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-pill-light-green-bg)] border border-[var(--color-text-green-accent)]/30">
                    <Check className="w-4 h-4 text-[var(--color-text-green-accent)]" />
                    <span className="text-[12px] font-semibold text-[var(--color-text-green-accent)]">Free beta access</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-pill-light-orange-bg)] border border-[var(--color-text-orange-accent)]/30">
                    <Sparkles className="w-4 h-4 text-[var(--color-text-orange-accent)]" />
                    <span className="text-[12px] font-semibold text-[var(--color-text-orange-accent)]">First 50 Get Pro Free. <span className="font-bold underline">Forever.</span></span>
                </div>
            </div>
        </form>
    );
}

export function WaitlistForm() {
    return (
        <Suspense fallback={<div className="h-14 w-full max-w-[480px] bg-[var(--surface-subtle)] rounded-2xl animate-pulse" />}>
            <WaitlistFormContent />
        </Suspense>
    );
}
