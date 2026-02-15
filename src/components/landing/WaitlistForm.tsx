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
                <div className="glass-card mb-6 overflow-hidden rounded-[24px] bg-[#121214] border-white/10 shadow-2xl">
                    <div className="bg-gradient-to-r from-[#5a35f8]/20 to-[#3ed6ff]/10 p-8 border-b border-white/5 flex items-center gap-5">
                        <div className="bg-[#5a35f8] rounded-full p-3 text-white shadow-lg shadow-[#5a35f8]/40 ring-4 ring-[#5a35f8]/20">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">You're on the list!</h3>
                            <p className="text-sm text-[#5a35f8] font-medium mt-1">Welcome to the inner circle.</p>
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
                            Invite friends to jump the queue. <span className="text-white font-semibold">Top 500 get lifetime free access.</span>
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
        <form onSubmit={handleSubmit} className="w-full max-w-[480px] mx-auto relative group">
            <div className="relative flex items-center p-1.5 rounded-[20px] bg-[#18181b] border border-white/10 shadow-2xl transition-all duration-300 focus-within:border-[#5a35f8]/50 focus-within:shadow-[0_0_40px_rgba(90,53,248,0.15)]">
                <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 bg-transparent border-0 px-4 text-white text-[15px] placeholder:text-white/20 focus:outline-none focus:ring-0"
                />
                <ShimmerButton
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full px-6 font-medium shadow-lg shadow-[#5a35f8]/20 hover:shadow-[#5a35f8]/40 shrink-0"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>Join Waitlist <ArrowRight className="w-4 h-4" /></>
                    )}
                </ShimmerButton>
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

            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] font-semibold text-emerald-100">Free beta access</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5a35f8]/10 border border-[#5a35f8]/20">
                    <Users className="w-3.5 h-3.5 text-[#5a35f8]" />
                    <span className="text-[11px] font-semibold text-[#a594fd]">10,000+ joined</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-semibold text-amber-100">Top 500 get Pro free</span>
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
