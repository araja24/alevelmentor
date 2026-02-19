"use client";

import { useEffect, useRef, type ReactNode } from "react";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

function setupNativeAnchorScroll(): () => void {
  const handleAnchorClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor || !anchor.hash) return;
    const id = anchor.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  document.addEventListener("click", handleAnchorClick, true);
  return () => document.removeEventListener("click", handleAnchorClick, true);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const teardownRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isTouchDevice()) {
      return setupNativeAnchorScroll();
    }

    let cancelled = false;
    let cancelSchedule: (() => void) | null = null;

    // Defer Lenis until after first paint to avoid blocking LCP (main-thread)
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(() => {
        if (cancelled) return;
        import("lenis").then((LenisModule) => {
          if (cancelled) return;
          const Lenis = LenisModule.default;
          const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.2,
            smoothWheel: true,
            autoRaf: true,
            touchMultiplier: 2,
          });

          const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!anchor || !anchor.hash) return;
            const elId = anchor.hash.slice(1);
            const el = document.getElementById(elId);
            if (el) {
              e.preventDefault();
              lenis.scrollTo(el, { offset: 0, duration: 1.2 });
            }
          };

          document.addEventListener("click", handleAnchorClick, true);
          teardownRef.current = () => {
            document.removeEventListener("click", handleAnchorClick, true);
            lenis.destroy();
            teardownRef.current = null;
          };
        });
      }, { timeout: 2500 });
      cancelSchedule = () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => {
        if (cancelled) return;
        import("lenis").then((LenisModule) => {
          if (cancelled) return;
          const Lenis = LenisModule.default;
          const lenis = new Lenis({
            lerp: 0.1,
            duration: 1.2,
            smoothWheel: true,
            autoRaf: true,
            touchMultiplier: 2,
          });

          const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!anchor || !anchor.hash) return;
            const elId = anchor.hash.slice(1);
            const el = document.getElementById(elId);
            if (el) {
              e.preventDefault();
              lenis.scrollTo(el, { offset: 0, duration: 1.2 });
            }
          };

          document.addEventListener("click", handleAnchorClick, true);
          teardownRef.current = () => {
            document.removeEventListener("click", handleAnchorClick, true);
            lenis.destroy();
            teardownRef.current = null;
          };
        });
      }, 100);
      cancelSchedule = () => clearTimeout(id);
    }

    return () => {
      cancelled = true;
      cancelSchedule?.();
      teardownRef.current?.();
    };
  }, []);

  return <>{children}</>;
}
