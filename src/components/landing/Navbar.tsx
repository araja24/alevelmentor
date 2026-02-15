"use client";

import { useState } from "react";
import {
    motion,
    useScroll,
    useMotionValueEvent,
    AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ShimmerButton } from "./ShimmerButton";

const navLinks = ["Features", "How It Works", "Community", "FAQ"];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 60);
    });

    return (
        <>
            {/* ─── Normal flat navbar (visible when NOT scrolled) ─── */}
            <AnimatePresence>
                {!scrolled && (
                    <motion.header
                        key="full-nav"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
                    >
                        <div className="mx-auto max-w-[1200px] flex items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2.5 shrink-0">
                                <img src="/logo_large_light.svg" alt="A Level Mentor" className="hidden md:block h-5 w-auto" />
                                <img src="/logo_small.svg" alt="Logo" className="md:hidden h-[20px] w-auto" />
                            </Link>

                            {/* Center links */}
                            <nav className="hidden md:flex items-center gap-8">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item}
                                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-200"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </nav>

                            {/* Right CTA */}
                            <div className="hidden md:flex items-center gap-5">
                                <Link
                                    href="/login"
                                    className="text-[13px] font-medium text-white/60 hover:text-white transition-colors"
                                >
                                    Sign in
                                </Link>
                                <ShimmerButton
                                    href="#join"
                                    className="px-5 py-2 text-[13px] shadow-[0_0_12px_rgba(90,53,248,0.4)] hover:shadow-[0_0_20px_rgba(90,53,248,0.6)]"
                                >
                                    Join Waitlist →
                                </ShimmerButton>
                            </div>

                            {/* Mobile toggle */}
                            <button
                                className="md:hidden text-white/80"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </motion.header>
                )}
            </AnimatePresence>

            {/* ─── Floating Island (visible when scrolled) ─── */}
            <AnimatePresence>
                {scrolled && (
                    <motion.div
                        key="floating-island"
                        initial={{ opacity: 0, y: -30, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 pointer-events-none"
                    >
                        <div
                            className="flex items-center gap-2 rounded-full p-1.5 sm:px-4 sm:py-2.5 pointer-events-auto mx-auto"
                            style={{
                                background: "rgba(18, 18, 20, 0.75)",
                                backdropFilter: "blur(24px) saturate(1.4)",
                                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                boxShadow:
                                    "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
                            }}
                        >
                            {/* Logo Icon Only on Mobile/Tablet */}
                            <Link
                                href="/"
                                className="flex items-center pl-2 md:pr-4 py-1"
                            >
                                <img src="/logo_large_light.svg" alt="A Level Mentor" className="hidden md:block h-[18px] w-auto" />
                                <img src="/logo_small.svg" alt="Logo" className="md:hidden h-[20px] w-auto" />
                            </Link>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-7 bg-white/[0.08]" />

                            {/* Nav links (Desktop) */}
                            <nav className="hidden md:flex items-center">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item}
                                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.06] rounded-full px-4 py-2 transition-all duration-200"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Menu Toggle (in Island) */}
                            <button
                                className="md:hidden p-2 text-white/70 hover:text-white"
                                onClick={() => setMobileOpen(true)}
                            >
                                <Menu size={18} />
                            </button>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-7 bg-white/[0.08]" />

                            {/* Sign in */}
                            <Link
                                href="/login"
                                className="hidden sm:block text-[13px] font-medium text-white/50 hover:text-white px-3 py-2 transition-colors"
                            >
                                Sign in
                            </Link>

                            {/* CTA */}
                            <ShimmerButton
                                href="#join"
                                className="px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] shadow-[0_0_12px_rgba(90,53,248,0.4)] hover:shadow-[0_0_20px_rgba(90,53,248,0.6)]"
                            >
                                <span className="hidden sm:inline">Join Waitlist →</span>
                                <span className="sm:hidden">Join</span>
                            </ShimmerButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Mobile Menu Overlay ─── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-[#09090b]/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <button
                            className="absolute top-6 right-6 text-white/80 p-2 bg-white/5 rounded-full"
                            onClick={() => setMobileOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col items-center gap-6">
                            {navLinks.map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-3xl font-bold text-white/90 hover:text-[#5a35f8] transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="text-xl text-white/60 mt-4"
                            >
                                Sign in
                            </Link>
                        </div>

                        <div className="mt-8" onClick={() => setMobileOpen(false)}>
                            <ShimmerButton
                                href="#join"
                                className="px-10 py-4 text-lg shadow-[0_0_30px_rgba(90,53,248,0.3)]"
                            >
                                Join Waitlist →
                            </ShimmerButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
