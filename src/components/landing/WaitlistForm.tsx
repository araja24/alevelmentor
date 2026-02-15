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
                <div className="glass-card mb-6 overflow-hidden rounded-[24px] bg-[#121214] border-white/10 shadow-2xl">
                    <div className="bg-gradient-to-r from-[#5a35f8]/20 to-[#3ed6ff]/10 p-8 border-b border-white/5 flex items-center gap-5">
                        <div className="bg-[#5a35f8] rounded-full p-3 text-white shadow-lg shadow-[#5a35f8]/40 ring-4 ring-[#5a35f8]/20">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {alreadyRegistered ? "Welcome back!" : "You're on the list!"}
                            </h3>
                            <p className="text-sm text-[#5a35f8] font-medium mt-1">
                                {alreadyRegistered
                                    ? "You're already registered. Here's your current status."
                                    : "Welcome to the inner circle."}
                            </p>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-2 gap-4">
                        <div className="bg-[#18181b] p-5 rounded-[16px] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-[#a1a1aa] text-[10px] font-bold uppercase tracking-widest mb-2">Your Rank</p>
                            <span className="text-3xl font-bold text-white tracking-tight">#{position?.toLocaleString()}</span>
                        </div>
                        <div className="bg-[#18181b] p-5 rounded-[16px] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-[#a1a1aa] text-[10px] font-bold uppercase tracking-widest mb-2">Total Users</p>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white tracking-tight">{totalUsers?.toLocaleString()}</span>
                                <span className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> +120 today
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        <p className="text-sm text-[#a1a1aa] mb-4 leading-relaxed">
                            Invite friends to jump the queue. <span className="text-white font-semibold">First 50 Get Pro Free. <span className="text-[#5a35f8]">Forever.</span></span>
                        </p>

                        <div className="flex gap-3">
                            <div className="flex-1 bg-[#09090b] h-12 px-4 rounded-[12px] border border-white/10 flex items-center text-sm text-[#d4d4d8] font-mono truncate select-all shadow-inner">
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
                "md:p-2 md:rounded-full md:bg-[#18181b] md:border md:border-white/10 md:shadow-2xl md:transition-all md:duration-300",
                "md:focus-within:border-[#5a35f8]/50 md:focus-within:shadow-[0_0_40px_rgba(90,53,248,0.15)]"
            )}>
                <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                        "w-full h-14 text-white text-[16px] placeholder:text-white/20 focus:outline-none focus:ring-0 transition-all",
                        // Mobile: Separated transparent box
                        "bg-white/5 border border-white/10 rounded-2xl px-6 text-center focus:border-[#5a35f8]/50 focus:bg-[#5a35f8]/5",
                        // Desktop: Integrated transparent field
                        "md:bg-transparent md:border-0 md:rounded-full md:px-6 md:text-left md:focus:bg-transparent"
                    )}
                />
                <ShimmerButton
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "h-14 w-full md:w-auto px-8 font-medium shadow-[0_0_12px_rgba(90,53,248,0.4)] hover:shadow-[0_0_20px_rgba(90,53,248,0.6)] shrink-0 text-[15px]",
                        "rounded-2xl md:rounded-full"
                    )}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-[12px] font-semibold text-emerald-100">Free beta access</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-[12px] font-semibold text-amber-100">First 50 Get Pro Free. <span className="font-bold underline">Forever.</span></span>
                </div>
            </div>
        </form>
    );
}

export function WaitlistForm() {
    return (
        <Suspense fallback={<div className="h-14 w-full max-w-[480px] bg-white/5 rounded-2xl animate-pulse" />}>
            <WaitlistFormContent />
        </Suspense>
    );
}
