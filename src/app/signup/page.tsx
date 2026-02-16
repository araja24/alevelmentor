"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { AnimatedBackground } from "@/components/landing/AnimatedBackground";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  async function handleGoogleSignup() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }

  if (success) {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <AnimatedBackground />

        <GlassCard className="w-full max-w-md p-8 text-center" gradient>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-pill-light-green-bg)] border border-[var(--color-text-green-accent)]/20 shadow-[0_0_30px_rgba(6,95,70,0.15)]">
            <Check className="h-8 w-8 text-[var(--color-text-green-accent)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Check your email</h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            We&apos;ve sent a confirmation link to <br />
            <strong className="text-[var(--text-primary)] font-medium">{email}</strong>.
            <br />Click it to activate your account.
          </p>
          <div className="bg-[var(--glass-bg)] rounded-xl p-4 border border-[var(--glass-border)] text-xs text-[var(--text-dimmed)]">
            Check your spam folder if you don't see it within a minute.
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <AnimatedBackground />

      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[var(--text-dimmed)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              alevel<span className="text-[var(--accent-2)]">mentor</span>
            </h1>
          </Link>
        </div>

        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-pill-light-orange-bg)] border border-[var(--accent-2)]/20 mb-4">
              <Sparkles className="w-3 h-3 text-[var(--accent-2)]" />
              <span className="text-[10px] font-semibold text-[var(--accent-2)] uppercase tracking-wide">Start for free</span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Create your account</h2>
            <p className="text-sm text-muted">
              Join thousands of students getting A*s
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 bg-[var(--glass-bg)] border-[var(--glass-border)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] text-[var(--text-secondary)] gap-3 rounded-xl transition-all"
            onClick={handleGoogleSignup}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--glass-border)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[var(--bg-card)] px-4 text-[10px] uppercase tracking-widest text-[var(--text-dimmed)]">
                Or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="text-xs font-medium text-[var(--text-secondary)] ml-1"
              >
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                required
                className="w-full h-11 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dimmed)] focus:border-[var(--accent-2)]/50 focus:bg-[var(--accent-2)]/5 focus:outline-none focus:ring-1 focus:ring-[var(--accent-2)]/50 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-[var(--text-secondary)] ml-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-11 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dimmed)] focus:border-[var(--accent-2)]/50 focus:bg-[var(--accent-2)]/5 focus:outline-none focus:ring-1 focus:ring-[var(--accent-2)]/50 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-[var(--text-secondary)] ml-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                minLength={8}
                className="w-full h-11 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dimmed)] focus:border-[var(--accent-2)]/50 focus:bg-[var(--accent-2)]/5 focus:outline-none focus:ring-1 focus:ring-[var(--accent-2)]/50 transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-red-400 text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[var(--shimmer-btn-bg)] hover:opacity-90 text-white rounded-xl text-sm font-semibold shadow-[var(--shimmer-btn-shadow)] hover:shadow-[var(--shimmer-btn-shadow-hover)] transition-all mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--text-dimmed)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[var(--accent-2)] hover:opacity-80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
