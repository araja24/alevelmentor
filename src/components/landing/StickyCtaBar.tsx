"use client";

import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "./ShimmerButton";

export function StickyCtaBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[70] border-t border-[var(--border-muted)] bg-[var(--bg-primary)]/95 px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto max-w-[560px] flex items-center gap-3">
        <p className="text-[11px] leading-tight text-muted flex-1">
          Get Early Access to A-Level Mentor
        </p>
        <ShimmerButton
          href="#join"
          className="h-11 px-6 py-2.5 text-sm shrink-0"
          data-ph-capture="sticky_cta_click"
          data-ph-target="sticky_cta"
        >
          Join Waitlist
          <ArrowRight className="h-4 w-4" />
        </ShimmerButton>
      </div>
    </div>
  );
}
