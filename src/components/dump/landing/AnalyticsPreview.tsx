"use client";

import { RevealSection } from "@/components/landing/RevealSection";
import { motion, useReducedMotion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const performanceData = [
  { week: "W1", score: 52 },
  { week: "W2", score: 58 },
  { week: "W3", score: 55 },
  { week: "W4", score: 63 },
  { week: "W5", score: 68 },
  { week: "W6", score: 72 },
  { week: "W7", score: 70 },
  { week: "W8", score: 78 },
  { week: "W9", score: 82 },
  { week: "W10", score: 85 },
];

const performanceChartConfig = { score: { label: "Score", color: "var(--accent-2)" } } satisfies ChartConfig;

const weakTopicsChartConfig = {
  Electrochem: { label: "Electrochem", color: "#ef4444" },
  "Org. Synth": { label: "Org. Synth", color: "#f59e0b" },
  Equilibria: { label: "Equilibria", color: "#f59e0b" },
  Thermo: { label: "Thermo", color: "#22c55e" },
  Kinetics: { label: "Kinetics", color: "#22c55e" },
} satisfies ChartConfig;

const weakTopicsData = [
  { topic: "Electrochem", marks: 14, fill: "#ef4444" },
  { topic: "Org. Synth", marks: 11, fill: "#f59e0b" },
  { topic: "Equilibria", marks: 9, fill: "#f59e0b" },
  { topic: "Thermo", marks: 7, fill: "#22c55e" },
  { topic: "Kinetics", marks: 5, fill: "#22c55e" },
];

export function AnalyticsPreview() {
  const prefersReduced = useReducedMotion();
  const animDuration = prefersReduced ? 0 : 2000;
  const animBegin = prefersReduced ? 0 : 300;
  const barAnimDuration = prefersReduced ? 0 : 1500;
  const barAnimBegin = prefersReduced ? 0 : 500;

  return (
    <section id="analytics" className="py-28 px-6 relative">
      <div className="mx-auto max-w-6xl">
        <RevealSection className="text-center mb-16">
          <p className="text-xs text-[var(--accent-2)] uppercase tracking-wider font-semibold mb-3">
            Live Analytics
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            See your progress. Fix your gaps.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Real-time data on your performance, weak areas, and trajectory.
            No guessing — just clarity.
          </p>
        </RevealSection>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Performance Growth Chart */}
          <RevealSection delay={0.1}>
            <motion.div
              className="rounded-2xl border border-border bg-card p-6 card-hover"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold">
                    Performance Growth
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Weekly average score trend
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    +33% growth
                  </span>
                </div>
              </div>

              <div className="h-64">
                <ChartContainer config={performanceChartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient
                          id="areaGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--accent-2)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--accent-2)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(128,128,128,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="week"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#71717a", fontSize: 11 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#71717a", fontSize: 11 }}
                        domain={[40, 100]}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="var(--color-score)"
                        strokeWidth={2}
                        fill="url(#areaGradient)"
                        animationDuration={animDuration}
                        animationBegin={animBegin}
                        animationEasing="ease-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </motion.div>
          </RevealSection>

          {/* Weak Topics Chart */}
          <RevealSection delay={0.2}>
            <motion.div
              className="rounded-2xl border border-border bg-card p-6 card-hover"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold">
                    Marks Lost by Topic
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Where you need to improve most
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-red-500">
                    5 weak areas
                  </span>
                </div>
              </div>

              <div className="h-64">
                <ChartContainer config={weakTopicsChartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weakTopicsData} layout="vertical">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(128,128,128,0.1)"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#71717a", fontSize: 11 }}
                      />
                      <YAxis
                        dataKey="topic"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#a1a1aa", fontSize: 11 }}
                        width={80}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) => [value != null ? `Lost: ${value} marks` : "", undefined]}
                          />
                        }
                        cursor={{ fill: "rgba(90,53,248,0.06)" }}
                      />
                      <Bar
                        dataKey="marks"
                        radius={[0, 6, 6, 0]}
                        animationDuration={barAnimDuration}
                        animationBegin={barAnimBegin}
                        animationEasing="ease-out"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </motion.div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
