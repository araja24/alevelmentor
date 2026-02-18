"use client";

import { BookOpen, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";

const cards = [
  {
    title: "Smart weekly plan",
    body: "Your revision adapts to sick days, tests, and real life.",
    icon: Sparkles,
  },
  {
    title: "Past paper engine",
    body: "Do papers digitally or upload for instant marking.",
    icon: BookOpen,
  },
  {
    title: "Progress tracking",
    body: "Spot weak topics fast and focus where it matters most.",
    icon: TrendingUp,
  },
];

export function MobileProductPreview() {
  return (
    <div className="md:hidden w-full max-w-[560px] mx-auto px-4">
      <div className="space-y-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-[var(--border-muted-strong)] bg-[var(--surface-subtle)] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-[var(--accent-2)]/15 text-[var(--accent-2)] flex items-center justify-center shrink-0">
                <card.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{card.title}</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">{card.body}</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
