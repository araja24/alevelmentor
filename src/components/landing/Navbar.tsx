"use client";

import { useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useMotionValueEvent,
    AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { ShimmerButton } from "./ShimmerButton";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const SHOW_AUTH_NAV = false;

const navLinks: { label: string; href: string }[] = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#text-highlight" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [useMobileIsland, setUseMobileIsland] = useState(false);
    const { scrollY } = useScroll();
    const { resolvedTheme } = useTheme();
    const isLight = resolvedTheme === "light";

    useEffect(() => setMounted(true), []);

    // Switch to the mobile island layout at <= 1608px
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1608px)");
        const update = () => setUseMobileIsland(mq.matches);
        update();

        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", update);
            return () => mq.removeEventListener("change", update);
        }

        mq.addListener(update);
        return () => mq.removeListener(update);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled((prev) => {
            const next = latest > 60;
            return next === prev ? prev : next;
        });
    });

    const logoSrc = !mounted
        ? "/logo_large_light.svg"
        : (isLight ? "/logo_large.svg" : "/logo_large_light.svg");

    // Small logo for the mobile island (requested)
    const smallLogoSrc = !mounted
        ? "/logo_small_light.svg"
        : (isLight ? "/logo_small.svg" : "/logo_small_light.svg");

    return (
        <>
            {/* ─── Normal flat navbar (visible when NOT scrolled) ─── */}
            <AnimatePresence>
                {!scrolled && !useMobileIsland && (
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
                                <Image src={logoSrc} alt="A Level Mentor" width={120} height={20} className="hidden xl:block h-5 w-auto" priority />
                                <Image src={smallLogoSrc} alt="Logo" width={20} height={20} className="xl:hidden h-[20px] w-auto" priority />
                            </Link>

                            {/* Center links */}
                            <nav className="hidden xl:flex items-center gap-8">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-[13px] font-medium text-muted hover:gradient-text-heading transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Right CTA */}
                            <div className="hidden xl:flex items-center gap-4">
                                <ThemeToggle />
                                {SHOW_AUTH_NAV && (
                                    <Link
                                        href="/login"
                                        className="text-[13px] font-medium text-muted hover:gradient-text-heading transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                )}
                                <ShimmerButton
                                    href="#join"
                                    className="px-5 py-2 text-base"
                                >
                                    Join the waitlist →
                                </ShimmerButton>
                            </div>

                            {/* Mobile Actions */}
                            <div className="flex xl:hidden items-center gap-3">
                                <ThemeToggle />
                                <Link
                                    href="#join"
                                    className="text-[13px] font-medium gradient-text-heading rounded-full px-4 py-2 border border-[var(--border-muted-strong)] bg-[var(--surface-subtle)]"
                                >
                                    Join
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted hover:gradient-text-heading"
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                >
                                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                                </Button>
                            </div>
                        </div>
                    </motion.header>
                )}
            </AnimatePresence>

            {/* ─── Floating Island (visible when scrolled) ─── */}
            <AnimatePresence>
                {(scrolled || useMobileIsland) && (
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
                            className="flex items-center gap-2 rounded-full p-1.5 sm:px-4 sm:py-2.5 pointer-events-auto mx-auto whitespace-nowrap border"
                            style={{ background: "var(--nav-island-bg)", borderColor: "var(--nav-island-border)" }}
                        >
                            {/* Logo Icon Only on Mobile/Tablet */}
                            <Link
                                href="/"
                                className="flex items-center pl-2 md:pr-4 py-1"
                            >
                                <Image src={logoSrc} alt="A Level Mentor" width={108} height={18} className="hidden xl:block h-[18px] w-auto" />
                                <Image src={smallLogoSrc} alt="Logo" width={20} height={20} className="xl:hidden h-[20px] w-auto" />
                            </Link>

                            {/* Divider */}
                            <div className="hidden xl:block w-px h-7 bg-[var(--border-muted)]" />

                            {/* Nav links (Desktop) */}
                            <nav className="hidden xl:flex items-center">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-[13px] font-medium text-muted hover:gradient-text-heading rounded-full px-4 py-2 transition-all duration-200 hover:bg-[var(--surface-subtle)]"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Menu Toggle (in Island) */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="xl:hidden text-muted hover:gradient-text-heading"
                                onClick={() => setMobileOpen(true)}
                            >
                                <Menu size={18} />
                            </Button>

                            {/* Divider */}
                            <div className="hidden xl:block w-px h-7 bg-[var(--border-muted)]" />

                            {/* Theme + Sign in */}
                            <div className="hidden xl:flex items-center gap-1">
                                <ThemeToggle />
                                {SHOW_AUTH_NAV && (
                                    <Link
                                        href="/login"
                                        className="text-[13px] font-medium text-muted hover:gradient-text-heading px-3 py-2 transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                )}
                            </div>

                            {/* CTA */}
                            <ShimmerButton
                                href="#join"
                                className="px-4 sm:px-5 py-2 text-sm sm:text-base"
                            >
                                <span className="hidden sm:inline">Join the waitlist →</span>
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
                        className="fixed inset-0 z-[60] bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-8 xl:hidden"
                    >
                        <div className="absolute top-6 right-6 flex items-center gap-2">
                            <ThemeToggle />
                            <Button
                                variant="outline"
                                size="icon"
                                className="gradient-text-heading rounded-full hover:opacity-90 bg-[var(--surface-subtle)] border-[var(--border-muted-strong)]"
                                onClick={() => setMobileOpen(false)}
                            >
                                <X size={24} />
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-3xl font-bold gradient-text-heading hover:gradient-text transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {SHOW_AUTH_NAV && (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-xl text-muted mt-4 hover:gradient-text-heading transition-colors"
                                >
                                    Sign in
                                </Link>
                            )}
                        </div>

                        <div className="mt-8" onClick={() => setMobileOpen(false)}>
                            <ShimmerButton
                                href="#join"
                                className="px-10 py-4"
                            >
                                Join the waitlist →
                            </ShimmerButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
