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
                                <img src="/logo_large_light.svg" alt="A Level Mentor" className="h-5 w-auto" />
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
                                <Link
                                    href="#join"
                                    className="relative overflow-hidden text-[13px] font-semibold text-white bg-[#5a35f8] hover:bg-[#4c2de0] rounded-full px-5 py-2 transition-all duration-200 shadow-[0_0_12px_rgba(90,53,248,0.4)]"
                                >
                                    Join Waitlist →
                                    <span className="pointer-events-none absolute inset-0 shimmer-sweep" />
                                </Link>
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
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div
                            className="flex items-center gap-2 rounded-full px-4 py-2.5"
                            style={{
                                background: "rgba(18, 18, 20, 0.75)",
                                backdropFilter: "blur(24px) saturate(1.4)",
                                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                boxShadow:
                                    "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
                            }}
                        >
                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center pl-2 pr-3 py-1"
                            >
                                <img src="/logo_large_light.svg" alt="A Level Mentor" className="h-[18px] w-auto" />
                            </Link>

                            {/* Divider */}
                            <div className="w-px h-7 bg-white/[0.08]" />

                            {/* Nav links */}
                            <nav className="hidden sm:flex items-center">
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

                            {/* Divider */}
                            <div className="w-px h-7 bg-white/[0.08] hidden sm:block" />

                            {/* Sign in */}
                            <Link
                                href="/login"
                                className="hidden sm:block text-[13px] font-medium text-white/50 hover:text-white px-3 py-2 transition-colors"
                            >
                                Sign in
                            </Link>

                            {/* CTA */}
                            <Link
                                href="#join"
                                className="relative overflow-hidden text-[13px] font-semibold text-white bg-[#5a35f8] hover:bg-[#4c2de0] rounded-full px-5 py-2 transition-all duration-200 shadow-[0_0_12px_rgba(90,53,248,0.4)]"
                            >
                                Join Waitlist →
                                <span className="pointer-events-none absolute inset-0 shimmer-sweep" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Mobile Menu ─── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-[#09090b]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <button
                            className="absolute top-5 right-6 text-white/80"
                            onClick={() => setMobileOpen(false)}
                        >
                            <X size={24} />
                        </button>
                        {navLinks.map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl font-semibold text-white/90 hover:text-white"
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-4 mt-4 items-center">
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="text-lg text-white/60"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="#join"
                                onClick={() => setMobileOpen(false)}
                                className="relative overflow-hidden text-lg font-semibold text-white bg-[#5a35f8] rounded-full px-8 py-3"
                            >
                                Join Waitlist →
                                <span className="pointer-events-none absolute inset-0 shimmer-sweep" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
