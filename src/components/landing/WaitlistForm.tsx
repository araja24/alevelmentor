"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Users,
    Trophy,
    Copy,
    Check,
    ArrowRight,
    TrendingUp,
    Share2
} from "lucide-react";

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

    const referralCode = searchParams.get("ref");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, referralCode }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Something went wrong");

            setSuccess(true);
            setReferralLink(data.referralLink);
            setPosition(data.position);
            setTotalUsers(data.totalUsers);
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
                <div className="glass-card mb-6 overflow-hidden rounded-[20px] bg-[#121214] border-white/10">
                    <div className="bg-[#5a35f8]/10 p-6 border-b border-[#5a35f8]/20 flex items-center gap-4">
                        <div className="bg-[#5a35f8] rounded-full p-2 text-white shadow-lg shadow-[#5a35f8]/30">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">You're on the list!</h3>
                            <p className="text-sm text-[#5a35f8]">Welcome to the inner circle.</p>
                        </div>
                    </div>

                    <div className="p-6 grid grid-cols-2 gap-4">
                        <div className="bg-[#18181b] p-4 rounded-[12px] border border-white/5">
                            <p className="text-[#a1a1aa] text-xs font-medium uppercase tracking-wider mb-1">Your Rank</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-white">#{position?.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="bg-[#18181b] p-4 rounded-[12px] border border-white/5">
                            <p className="text-[#a1a1aa] text-xs font-medium uppercase tracking-wider mb-1">Total Users</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-white">{totalUsers?.toLocaleString()}</span>
                                <span className="text-xs text-emerald-400 font-medium">+120 today</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        <p className="text-sm text-[#a1a1aa] mb-3">
                            Invite friends to jump the queue. <span className="text-white font-medium">Top 500 get lifetime free access.</span>
                        </p>

                        <div className="flex gap-2">
                            <div className="flex-1 bg-[#09090b] h-10 px-3 rounded-[8px] border border-white/10 flex items-center text-sm text-[#d4d4d8] font-mono truncate select-all">
                                {referralLink}
                            </div>
                            <Button
                                onClick={copyToClipboard}
                                size="icon"
                                className={cn(
                                    "shrink-0 h-10 w-10 transition-all duration-200 border-0",
                                    copied ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-white text-black hover:bg-white/90"
                                )}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-[12px] p-4 flex items-start gap-3"
                >
                    <TrendingUp className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-emerald-100/90 leading-relaxed">
                        <span className="font-semibold text-emerald-400">Bonus:</span> You've unlocked our exclusive A-Level Cheatsheets. Check your email to download them now.
                    </p>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[400px] mx-auto relative group">
            <div className="relative flex items-center">
                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 bg-[#121214] border border-white/10 rounded-[14px] px-4 text-white placeholder:text-[#52525b] focus:outline-none focus:ring-2 focus:ring-[#5a35f8]/50 focus:border-[#5a35f8] transition-all"
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 h-auto rounded-[10px] bg-[#5a35f8] hover:bg-[#4c2de0] text-white px-4 font-medium transition-all shadow-[0_0_15px_rgba(90,53,248,0.4)] hover:shadow-[0_0_25px_rgba(90,53,248,0.6)] border-0 overflow-hidden"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <span className="flex items-center gap-2">Join <ArrowRight className="w-4 h-4" /></span>
                    )}
                    <span className="pointer-events-none absolute inset-0 shimmer-sweep" />
                </Button>
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg"
                >
                    {error}
                </motion.p>
            )}

            <div className="mt-6 flex items-center justify-center gap-6 text-[#71717a]">
                <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs">Free beta access</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#5a35f8]" />
                    <span className="text-xs">10,000+ joined</span>
                </div>
            </div>
        </form>
    );
}

export function WaitlistForm() {
    return (
        <Suspense fallback={<div className="h-12 w-full max-w-[400px] bg-white/5 rounded-xl animate-pulse" />}>
            <WaitlistFormContent />
        </Suspense>
    );
}
