"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WaitlistData {
  rank: number;
  referral_code: string;
  referral_count: number;
  total_count: number;
  already_registered: boolean;
}

function SuccessState({ data }: { data: WaitlistData }) {
  const [copied, setCopied] = useState(false);

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://alevelmentor.com";
  const referralLink = `${origin}?ref=${data.referral_code}`;

  async function copyLink() {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6">
        <div className="flex items-center gap-2 justify-center mb-4">
          <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg
              className="h-3.5 w-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold">
            {data.already_registered ? "Welcome back" : "You\u2019re on the list"}
          </p>
        </div>

        <div className="text-center mb-4">
          <span className="text-4xl font-bold">#{data.rank}</span>
          <span className="text-sm ml-1.5 text-muted-foreground">in line</span>
          {data.total_count > 0 && (
            <p className="text-xs mt-1 text-muted-foreground">
              of {data.total_count.toLocaleString()} students
            </p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-muted/50 p-3 mb-4">
          <p className="text-[11px] font-medium mb-2 text-muted-foreground">
            Your referral link
          </p>
          <div className="flex items-center gap-2">
            <code className="text-xs flex-1 truncate text-foreground/80">
              {referralLink}
            </code>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={`shrink-0 px-3 py-1.5 text-[11px] ${
                copied
                  ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : ""
              }`}
              onClick={copyLink}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Each referral moves you up.{" "}
          <span className="font-medium text-[#5a35f8]">
            Top 100 unlock early beta access.
          </span>
        </p>

        {data.referral_count > 0 && (
          <p className="text-xs text-center mt-2 font-medium text-emerald-600 dark:text-emerald-400">
            {data.referral_count} referral
            {data.referral_count !== 1 ? "s" : ""} so far
          </p>
        )}
      </div>
    </motion.div>
  );
}

function WaitlistFormInner({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [data, setData] = useState<WaitlistData | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ref }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong");
      }

      setData(json);
      setState("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setState("error");
    }
  }

  if (state === "success" && data) {
    return <SuccessState data={data} />;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={compact ? "" : "max-w-md mx-auto"}
      >
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input-glow flex-1 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#5a35f8]/20 focus:border-[#5a35f8]/40"
          />
          <Button
            type="submit"
            disabled={state === "loading"}
            variant="gradient"
            className="group shrink-0 whitespace-nowrap"
          >
            {state === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-3.5 w-3.5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-20"
                  />
                  <path
                    d="M12 2a10 10 0 019.95 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Joining…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Join Waitlist
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {state === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-center text-red-500"
          >
            {error}{" "}
            <button
              onClick={() => setState("idle")}
              className="underline hover:no-underline"
            >
              Try again
            </button>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function WaitlistFormSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-2.5 ${
        compact ? "" : "max-w-md mx-auto"
      }`}
    >
      <div className="flex-1 h-12 rounded-xl animate-pulse bg-muted" />
      <div className="h-12 w-36 rounded-xl animate-pulse bg-muted" />
    </div>
  );
}

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  return (
    <Suspense fallback={<WaitlistFormSkeleton compact={compact} />}>
      <WaitlistFormInner compact={compact} />
    </Suspense>
  );
}
