"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const SHOW_AUTH_NAV = false;

const navLinks: { label: string; href: string }[] = [
    { label: "How It Works", href: "#features" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
];

function NavbarInner() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
    const { resolvedTheme } = useTheme();
    const isLight = resolvedTheme === "light";

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    useEffect(() => setMounted(true), []);

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

    useEffect(() => {
        const onScroll = () => setScrolled((prev) => {
            const next = typeof window !== "undefined" && window.scrollY > 60;
            return next === prev ? prev : next;
        });
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const logoSrc = !mounted
        ? "/logo_large_light.svg"
        : (isLight ? "/logo_large.svg" : "/logo_large_light.svg");

    // Small logo for the mobile island (requested)
    const smallLogoSrc = !mounted
        ? "/logo_small_light.svg"
        : (isLight ? "/logo_small.svg" : "/logo_small_light.svg");

    return (
        <>
            {/* ─── Normal flat navbar (visible when NOT scrolled — mobile and desktop) ─── */}
            {!scrolled && (
                    <header
                        className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-6 sm:px-8 sm:py-8 lg:px-24"
                    >
                        <div className="w-full flex items-center justify-between">
                            {/* Logo — far left; on home page click scrolls to top */}
                            <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={handleLogoClick}>
                                <Image src={logoSrc} alt="A Level Mentor" width={120} height={20} className="hidden xl:block h-5 w-auto" priority />
                                <Image src={smallLogoSrc} alt="Logo" width={20} height={20} className="xl:hidden h-[20px] w-auto" priority />
                            </Link>

                            {/* Center links */}
                            <nav className="hidden xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="text-[13px] font-medium text-muted hover:gradient-text-heading transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Right CTA — far right, small button */}
                            <div className="hidden xl:flex items-center gap-4 shrink-0">
                                <ThemeToggle />
                                {SHOW_AUTH_NAV && (
                                    <Link
                                        href="/login"
                                        className="text-[13px] font-medium text-muted hover:gradient-text-heading transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                )}
                                <Link
                                    href="#join"
                                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white px-4 py-2 rounded-full transition-all cursor-pointer hover:opacity-90"
                                    style={{ backgroundColor: "#533fec" }}
                                >
                                    Join the waitlist
                                    {waitlistCount !== null && (
                                        <span className="text-[10px] font-medium opacity-75">
                                            · {waitlistCount.toLocaleString()} joined
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {/* Mobile Actions — logo left; full waitlist button + hamburger right (theme in menu) */}
                            <div className="flex xl:hidden items-center gap-3">
                                <Link
                                    href="#join"
                                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white px-4 py-2 rounded-full hover:opacity-90 transition-all shrink-0 cursor-pointer"
                                    style={{ backgroundColor: "#533fec" }}
                                >
                                    Join the waitlist
                                    {waitlistCount !== null && (
                                        <span className="text-[10px] font-medium opacity-75">· {waitlistCount.toLocaleString()} joined</span>
                                    )}
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted hover:gradient-text-heading shrink-0 cursor-pointer"
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                                    aria-expanded={mobileOpen}
                                >
                                    {mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
                                </Button>
                            </div>
                        </div>
                    </header>
                )}

            {/* ─── Floating Island (visible only when scrolled) ─── */}
            {scrolled && (
                    <div
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 pointer-events-none animate-fade-in-up"
                        style={{ animationDuration: "0.4s" }}
                    >
                        <div
                            className="flex items-center gap-2 rounded-full p-1.5 sm:px-4 sm:py-2.5 pointer-events-auto mx-auto whitespace-nowrap border"
                            style={{ background: "var(--nav-island-bg)", borderColor: "var(--nav-island-border)" }}
                        >
                            {/* Logo Icon Only on Mobile/Tablet */}
                            <Link
                                href="/"
                                className="flex items-center pl-2 md:pr-4 py-1"
                                onClick={handleLogoClick}
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
                                        key={item.label}
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
                                className="xl:hidden text-muted hover:gradient-text-heading cursor-pointer"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu size={18} aria-hidden />
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

                            {/* CTA — full text on all viewports */}
                            <Link
                                href="#join"
                                className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white px-4 py-2 rounded-full transition-all hover:opacity-90 whitespace-nowrap cursor-pointer"
                                style={{ backgroundColor: "#533fec" }}
                            >
                                Join the waitlist
                                {waitlistCount !== null && (
                                    <span className="text-[10px] font-medium opacity-75">
                                        · {waitlistCount.toLocaleString()} joined
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                )}

            {/* ─── Mobile Menu Overlay ─── */}
            {mobileOpen && (
                    <div
                        className="fixed inset-0 z-[60] bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-8 xl:hidden animate-fade-in-up"
                        style={{ animationDuration: "0.2s" }}
                    >
                        <div className="absolute top-6 right-6 flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="gradient-text-heading rounded-full hover:opacity-90 bg-[var(--surface-subtle)] border-[var(--border-muted-strong)] cursor-pointer"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                            >
                                <X size={24} aria-hidden />
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-muted">Theme</span>
                                <ThemeToggle />
                            </div>
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
                            <Link
                                href="#join"
                                className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white px-6 py-3 rounded-full hover:opacity-90 transition-all"
                                style={{ backgroundColor: "#533fec" }}
                            >
                                Join the waitlist
                                {waitlistCount !== null && (
                                    <span className="text-[10px] font-medium opacity-75">· {waitlistCount.toLocaleString()} joined</span>
                                )}
                            </Link>
                        </div>
                    </div>
                )}
        </>
    );
}

export const Navbar = memo(NavbarInner);
