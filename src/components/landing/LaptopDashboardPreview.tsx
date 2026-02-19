"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  User,
  BookOpen,
  LayoutDashboard,
  Route,
  BookMarked,
  Settings,
  Zap,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Lock,
  Star,
  Plus,
  Search,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const STUDY_HOURS_DATA = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 5 },
  { day: "Sat", hours: 8 },
  { day: "Sun", hours: 6 },
];
const STUDY_HOURS_TOTAL = STUDY_HOURS_DATA.reduce((s, d) => s + d.hours, 0);

const SIDEBAR_LINKS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Roadmap", icon: Route },
  { label: "Subjects", icon: BookMarked },
  { label: "Settings", icon: Settings },
];

const GET_STARTED_STEPS = [
  {
    title: "Complete profile",
    description: "Add your subjects and exam dates",
    icon: User,
    cta: "Complete",
  },
  {
    title: "Pick subjects",
    description: "Choose AQA, OCR, Edexcel or WJEC",
    icon: BookOpen,
    cta: "Connect",
  },
  {
    title: "Start first session",
    description: "Get your plan — it adapts to your life so you follow worry-free",
    icon: Zap,
    cta: "Start",
  },
];

const UP_NEXT_ROWS = [
  { task: "Organic Mechanisms — Past Paper", subject: "Chemistry", time: "Today", trend: "+2%" },
  { task: "Equilibria Practice Set", subject: "Chemistry", time: "Tomorrow", trend: "+1%" },
  { task: "Electricity Topic Test", subject: "Physics", time: "Wed", trend: "0%" },
];

/** Inline sparkline with draw-in animation; trend "+2%" -> up, "0%" -> flat, negative -> down */
function Sparkline({ trend }: { trend: string }) {
  const isUp = trend.startsWith("+") && trend !== "0%";
  const isFlat = trend === "0%";
  const pathD = isUp
    ? "M 2 14 L 12 10 L 22 8 L 32 5 L 42 2"
    : isFlat
      ? "M 2 8 L 12 8 L 22 8 L 32 8 L 42 8"
      : "M 2 2 L 12 5 L 22 8 L 32 10 L 42 14";
  const stroke = isUp ? "#22c55e" : isFlat ? "#A1A1AA" : "#ef4444";
  return (
    <svg width={48} height={18} viewBox="0 0 48 18" className="shrink-0 overflow-visible">
      <motion.path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Study hours this week — Recharts AreaChart; animation disabled on reduced motion for mobile performance */
function StudyHoursLineChart() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="w-full h-[88px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={STUDY_HOURS_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="studyAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-2)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--accent-2-dark)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#A1A1AA", fontSize: 9 }}
          />
          <YAxis
            hide
            domain={[0, "auto"]}
          />
          <Area
            type="monotone"
            dataKey="hours"
            stroke="var(--accent-2)"
            strokeWidth={2}
            fill="url(#studyAreaGrad)"
            isAnimationActive={!prefersReducedMotion}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LaptopDashboardPreview() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  useEffect(() => setMounted(true), []);
  const sidebarLogoSrc = !mounted ? "/logo_small_light.svg" : (isLight ? "/logo_small.svg" : "/logo_small_light.svg");

  return (
    <div className="w-full h-full min-h-0 max-w-[1200px] mx-auto flex flex-col">
      {/* Browser chrome — match reference: nav, URL pill (lock, domain, star), tabs */}
      <div className="rounded-t-2xl px-4 py-2.5 flex items-center gap-3 bg-[var(--bg-card)]">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-1 shrink-0 text-muted">
          <button type="button" className="p-1.5 rounded hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] transition-colors" aria-label="Back">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" className="p-1.5 rounded hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] transition-colors" aria-label="Forward">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button type="button" className="p-1.5 rounded hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] transition-colors" aria-label="Refresh">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex-1 flex justify-center min-w-0">
          <div className="rounded-full pl-3 pr-3 py-2 flex items-center gap-2 min-w-[180px] max-w-[320px] w-full bg-[var(--surface-subtle)] border border-[var(--border-muted)]">
            <Lock className="h-3.5 w-3.5 text-muted shrink-0" />
            <span className="text-[11px] text-[var(--text-primary)] truncate flex-1 text-center">alevelmentor.com</span>
            <Star className="h-3.5 w-3.5 text-muted shrink-0" />
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <div className="rounded-t-lg border-b-0 px-3 py-1.5 text-[11px] bg-[var(--surface-subtle)] border border-[var(--border-muted-strong)] text-[var(--text-primary)]">
            Dashboard
          </div>
          <button type="button" className="p-1.5 rounded text-muted hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] transition-colors" aria-label="New tab">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Window content — subtle purple tint to match UI theme */}
      <div className="flex-1 rounded-b-2xl overflow-hidden flex min-h-[480px] relative bg-[var(--bg-secondary)]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(88, 28, 135, 0.08) 0%, transparent 50%)",
          }}
        />
        {/* Sidebar — logo + tagline at top (match reference Crypton + Top Crypto Assets) */}
        <aside className="relative z-10 w-[180px] shrink-0 border-r border-[var(--border-muted)] py-4 px-2 flex flex-col">
          <div className="mb-4 px-3">
            <Image
              src={sidebarLogoSrc}
              alt="A Level Mentor"
              width={100}
              height={28}
              className="h-7 w-auto shrink-0"
            />
            <p className="text-[10px] text-muted mt-1">Your revision system</p>
          </div>
          {SIDEBAR_LINKS.map((item) => (
            <Link
              key={item.label}
              href="#"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium transition-colors ${
                item.active
                  ? "bg-gradient-to-r from-[var(--accent-2)]/20 to-[var(--accent-2-dark)]/20 text-[var(--text-primary)] border border-[var(--border-muted)]"
                  : "text-muted hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
          <div className="mt-auto pt-4">
            <div className="bento-card rounded-xl p-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-[var(--accent-2)]" />
              <span className="text-[11px] font-semibold text-[var(--text-primary)]">Activate Super</span>
            </div>
            <p className="text-[9px] text-muted mt-1 px-1">Unlock all features</p>
          </div>
        </aside>

        {/* Main content */}
        <div className="relative z-10 flex-1 p-4 overflow-auto space-y-4 min-w-0">
          {/* Top header row — avatar, CTA, bell, search, Settings */}
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--border-muted)]">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="h-8 w-8 rounded-full bg-[var(--surface-subtle)] flex items-center justify-center text-[11px] font-semibold text-[var(--text-primary)]">
                Y
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[var(--text-primary)]">Your plan</p>
                <p className="text-[10px] text-muted">Student</p>
              </div>
            </div>
            <Link
              href="#join"
              className="text-[11px] font-semibold text-white bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-2-dark)] rounded-full px-4 py-2 hover:opacity-90 transition-opacity shrink-0"
            >
              Open dashboard
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <Bell className="h-4 w-4 text-muted" />
                <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="rounded-lg bg-[var(--bg-card)] border border-[var(--border-muted)] pl-2.5 pr-3 py-1.5 flex items-center gap-2 min-w-[120px]">
                <Search className="h-3.5 w-3.5 text-muted" />
                <span className="text-[11px] text-muted">Search…</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted shrink-0">
                <Settings className="h-4 w-4" />
                <span className="text-[11px]">Settings</span>
              </div>
            </div>
          </div>

          {/* Mini line chart: Study hours this week (animated) */}
          <div className="bento-card rounded-2xl p-3 border border-[var(--glass-border-strong)] bg-[var(--bg-card)]">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Study hours this week</p>
            <StudyHoursLineChart />
            <p className="text-[9px] text-muted mt-1.5">{STUDY_HOURS_TOTAL}h total</p>
          </div>

          {/* Get started row — arrow-in-circle top-right on each card */}
          <div>
            <h3 className="text-[13px] font-semibold text-[var(--text-primary)] mb-3">Get started</h3>
            <div className="grid grid-cols-3 gap-2">
              {GET_STARTED_STEPS.map((step) => (
                <div
                  key={step.title}
                  className="bento-card rounded-2xl p-4 flex flex-col gap-2 transition-colors relative"
                >
                  <div className="absolute top-2.5 right-2.5 h-6 w-6 rounded-full bg-[var(--surface-subtle)] flex items-center justify-center">
                    <ArrowUpRight className="h-3 w-3 text-[var(--text-secondary)]" />
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-[var(--surface-subtle)] flex items-center justify-center">
                    <step.icon className="h-4 w-4 text-[var(--text-secondary)]" />
                  </div>
                  <p className="text-[12px] font-semibold text-[var(--text-primary)]">{step.title}</p>
                  <p className="text-[10px] text-muted leading-snug">{step.description}</p>
                  <button
                    type="button"
                    className="mt-1 text-[10px] font-semibold text-white bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-2-dark)] rounded-full px-3 py-1.5 hover:opacity-90 transition-opacity w-fit"
                  >
                    {step.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Featured card + table row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Your Revision Dashboard — featured card (reference: Liquid Staking Portfolio) */}
            <div className="lg:col-span-2 bento-card rounded-2xl p-4 relative overflow-hidden border border-[var(--glass-border-strong)] bg-[var(--bg-card)]">
              <div className="absolute top-2 right-2">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-2-dark)] text-white px-2 py-0.5 rounded-full">
                  New
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-2-dark)] flex items-center justify-center shrink-0">
                  <LayoutDashboard className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Your Revision Dashboard</h3>
                  <p className="text-[11px] text-muted mt-1 leading-relaxed">
                    Your plan adapts to topic tests, sick days, and real life — we manage the rest. See weak spots and predicted grades in one place.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Link
                      href="#join"
                      className="text-[11px] font-semibold text-white bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-2-dark)] rounded-full px-4 py-2 hover:opacity-90 transition-opacity"
                    >
                      Open dashboard
                    </Link>
                    <button
                      type="button"
                      className="text-[11px] font-medium text-[var(--text-primary)] border border-[var(--border-muted-strong)] rounded-full px-4 py-2 hover:bg-[var(--surface-subtle)] transition-colors"
                    >
                      View plan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Up next table */}
            <div className="bento-card rounded-2xl p-4 flex flex-col bg-[var(--bg-card)] border border-[var(--glass-border-strong)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                  This week
                </h3>
                <span className="text-[10px] text-muted">Show all</span>
              </div>
              <div className="space-y-2 flex-1">
                {UP_NEXT_ROWS.map((row) => (
                  <div
                    key={row.task}
                    className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 border border-[var(--border-muted)] bg-[var(--surface-subtle)] hover:bg-[var(--glass-bg)] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-[var(--text-primary)] truncate">{row.task}</p>
                      <p className="text-[9px] text-muted">{row.subject} · <span className="text-[var(--color-text-green-accent)]">{row.time}</span></p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] font-medium text-emerald-500">{row.trend}</span>
                      <button
                        type="button"
                        className="text-[9px] font-medium text-[var(--text-primary)] border border-[var(--border-muted-strong)] rounded-full px-2.5 py-1 hover:bg-[var(--surface-subtle)] transition-colors"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom table strip — tabs + See all, secondary-style row buttons */}
          <div className="bento-card rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--glass-border-strong)]">
            <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2 border-b border-[var(--border-muted)]">
              <div className="flex gap-1">
                {["This week", "Next week", "Past papers", "Weak spots"].map((tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    className={`text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      i === 0 ? "bg-[var(--surface-subtle)] text-[var(--text-primary)]" : "text-muted hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-muted hover:text-[var(--text-primary)] cursor-pointer">See all →</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-[1fr_auto_auto_48px_auto] gap-4 text-[10px] text-muted uppercase tracking-wider mb-2">
                <span>Topic</span>
                <span>Subject</span>
                <span>Due</span>
                <span className="w-12">Perf</span>
                <span></span>
              </div>
              {UP_NEXT_ROWS.map((row) => (
                <div
                  key={row.task}
                  className="grid grid-cols-[1fr_auto_auto_48px_auto] gap-4 items-center py-2 border-t border-[var(--border-muted)] text-[12px]"
                >
                  <span className="text-[var(--text-primary)] font-medium truncate">{row.task}</span>
                  <span className="text-muted">{row.subject}</span>
                  <span className="text-[var(--color-text-green-accent)]">{row.time}</span>
                  <div className="flex justify-center w-12">
                    <Sparkline trend={row.trend} />
                  </div>
                  <button
                    type="button"
                    className="text-[11px] font-medium text-[var(--text-primary)] border border-[var(--border-muted-strong)] rounded-full px-3 py-1.5 hover:bg-[var(--surface-subtle)] transition-colors w-fit"
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
