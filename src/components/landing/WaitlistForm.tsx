"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface WaitlistData {
  rank: number;
  referral_code: string;
  referral_count: number;
  total_count: number;
  already_registered: boolean;
}

// ---------------------------------------------------------------------------
// Success state — rank, referral link, copy
// ---------------------------------------------------------------------------
function SuccessState({
  data,
  compact,
}: {
  data: WaitlistData;
  compact: boolean;
}) {
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`rounded-2xl border p-6 ${
          compact
            ? "border-zinc-200/60 bg-white/80 backdrop-blur-sm"
            : "border-zinc-700/60 bg-zinc-800/60 backdrop-blur-sm"
        }`}
      >
        {/* Header */}
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
          <p
            className={`text-sm font-semibold ${
              compact ? "text-zinc-900" : "text-white"
            }`}
          >
            {data.already_registered ? "Welcome back" : "You\u2019re on the list"}
          </p>
        </div>

        {/* Rank */}
        <div className="text-center mb-4">
          <span
            className={`text-4xl font-bold ${
              compact ? "text-zinc-900" : "text-white"
            }`}
          >
            #{data.rank}
          </span>
          <span
            className={`text-sm ml-1.5 ${
              compact ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            in line
          </span>
          {data.total_count > 0 && (
            <p
              className={`text-xs mt-1 ${
                compact ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              of {data.total_count.toLocaleString()} students
            </p>
          )}
        </div>

        {/* Referral link */}
        <div
          className={`rounded-xl border p-3 mb-4 ${
            compact
              ? "border-zinc-200 bg-zinc-50"
              : "border-zinc-700 bg-zinc-900/50"
          }`}
        >
          <p
            className={`text-[11px] font-medium mb-2 ${
              compact ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            Your referral link
          </p>
          <div className="flex items-center gap-2">
            <code
              className={`text-xs flex-1 truncate ${
                compact ? "text-zinc-700" : "text-zinc-300"
              }`}
            >
              {referralLink}
            </code>
            <button
              onClick={copyLink}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                copied
                  ? "bg-emerald-100 text-emerald-700"
                  : compact
                    ? "bg-zinc-900 text-white hover:bg-zinc-800"
                    : "bg-white text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Referral info */}
        <p
          className={`text-xs text-center ${
            compact ? "text-zinc-500" : "text-zinc-400"
          }`}
        >
          Each referral moves you up.{" "}
          <span
            className={`font-medium ${
              compact ? "text-violet-600" : "text-violet-400"
            }`}
          >
            Top 100 unlock early beta access.
          </span>
        </p>

        {data.referral_count > 0 && (
          <p
            className={`text-xs text-center mt-2 font-medium ${
              compact ? "text-emerald-600" : "text-emerald-400"
            }`}
          >
            {data.referral_count} referral
            {data.referral_count !== 1 ? "s" : ""} so far
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Inner form (reads search params — must be wrapped in Suspense)
// ---------------------------------------------------------------------------
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

  // ---- Success view ----
  if (state === "success" && data) {
    return <SuccessState data={data} compact={compact} />;
  }

  // ---- Form view ----
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
            className={`flex-1 rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${
              compact
                ? "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400"
                : "border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-500 focus:border-violet-500"
            }`}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className={`group shrink-0 rounded-xl px-6 py-3 text-sm font-medium transition-all disabled:opacity-50 ${
              compact
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-white text-zinc-900 hover:bg-zinc-100"
            }`}
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
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {state === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 text-sm text-center ${
              compact ? "text-red-600" : "text-red-400"
            }`}
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

// ---------------------------------------------------------------------------
// Skeleton while Suspense resolves search params
// ---------------------------------------------------------------------------
function WaitlistFormSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-2.5 ${
        compact ? "" : "max-w-md mx-auto"
      }`}
    >
      <div
        className={`flex-1 h-12 rounded-xl animate-pulse ${
          compact ? "bg-zinc-100" : "bg-zinc-800"
        }`}
      />
      <div
        className={`h-12 w-36 rounded-xl animate-pulse ${
          compact ? "bg-zinc-200" : "bg-zinc-700"
        }`}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exported component — wraps inner in Suspense for useSearchParams
// ---------------------------------------------------------------------------
export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  return (
    <Suspense fallback={<WaitlistFormSkeleton compact={compact} />}>
      <WaitlistFormInner compact={compact} />
    </Suspense>
  );
}
