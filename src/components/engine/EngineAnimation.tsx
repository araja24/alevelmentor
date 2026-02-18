"use client";

import {
  AlertCircle,
  BrainCircuit,
  Calendar,
  Clock,
  FileText,
  Map,
  Target,
  type LucideIcon,
} from "lucide-react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

type NodeItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  laneColor: string;
  chipClassName: string;
};

type PipelinePoints = {
  inputs: Point[];
  engineIn: Point | null;
  engineOut: Point | null;
  outputs: Point[];
};

type LanePath = {
  key: string;
  d: string;
  color: string;
  duration: number;
  delay: number;
};

type EngineAnimationProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  engineLabel?: string;
  showLabels?: boolean;
};

const INPUTS: NodeItem[] = [
  {
    label: "Target Grades",
    description: "Desired outcomes across subjects",
    icon: Target,
    laneColor: "#f59e0b",
    chipClassName: "text-amber-300 border-amber-500/35 bg-amber-500/10",
  },
  {
    label: "Exam Date",
    description: "Time pressure and remaining weeks",
    icon: Clock,
    laneColor: "#fbbf24",
    chipClassName: "text-yellow-300 border-yellow-500/35 bg-yellow-500/10",
  },
  {
    label: "Struggles",
    description: "Weak topics and confidence gaps",
    icon: AlertCircle,
    laneColor: "#ef4444",
    chipClassName: "text-rose-300 border-rose-500/35 bg-rose-500/10",
  },
];

const OUTPUTS: NodeItem[] = [
  {
    label: "Weekly Schedule",
    description: "Clear day-by-day study priorities",
    icon: Calendar,
    laneColor: "#22c55e",
    chipClassName: "text-emerald-300 border-emerald-500/35 bg-emerald-500/10",
  },
  {
    label: "Adaptive Plan",
    description: "Adjusts instantly when life changes",
    icon: Map,
    laneColor: "#14b8a6",
    chipClassName: "text-teal-300 border-teal-500/35 bg-teal-500/10",
  },
  {
    label: "Past Paper Engine",
    description: "Practice + feedback tied to your plan",
    icon: FileText,
    laneColor: "#3ed6ff",
    chipClassName: "text-cyan-300 border-cyan-500/35 bg-cyan-500/10",
  },
];

function buildBezierPath(from: Point, to: Point) {
  const deltaX = to.x - from.x;
  const curveStrength = Math.max(40, Math.abs(deltaX) * 0.42);
  const c1x = from.x + curveStrength;
  const c2x = to.x - curveStrength;
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
}

function DotOnPath({
  pathRefs,
  pathIndex,
  color,
  duration,
  delay,
  prefersReducedMotion,
}: {
  pathRefs: MutableRefObject<(SVGPathElement | null)[]>;
  pathIndex: number;
  color: string;
  duration: number;
  delay: number;
  prefersReducedMotion: boolean;
}) {
  const progress = useMotionValue(0);
  const dotX = useMotionValue(-9999);
  const dotY = useMotionValue(-9999);

  useMotionValueEvent(progress, "change", (latest) => {
    if (prefersReducedMotion) return;
    const path = pathRefs.current[pathIndex];
    if (!path) return;
    const total = path.getTotalLength();
    if (!Number.isFinite(total) || total <= 0) return;
    const normalized = ((latest % total) + total) % total;
    const point = path.getPointAtLength(normalized);
    dotX.set(point.x);
    dotY.set(point.y);
  });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const path = pathRefs.current[pathIndex];
    if (!path) return;
    const total = path.getTotalLength();
    if (!Number.isFinite(total) || total <= 0) return;

    progress.set(0);
    const controls = animate(progress, total, {
      duration,
      delay,
      ease: "linear",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [delay, duration, pathIndex, pathRefs, prefersReducedMotion, progress]);

  if (prefersReducedMotion) return null;

  return (
    <motion.circle
      cx={dotX}
      cy={dotY}
      r={3}
      fill={color}
      opacity={0.92}
      style={{
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
    />
  );
}

export function EngineAnimation({
  className,
  title = "The A Level Engine",
  subtitle = "Your raw data—target grades, exam dates, and current struggles—is instantly processed into a dynamic, day-by-day strategy that adapts as you work.",
  engineLabel = "AI Processing Core",
  showLabels = true,
}: EngineAnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<HTMLDivElement | null>(null);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const [points, setPoints] = useState<PipelinePoints>({
    inputs: [],
    engineIn: null,
    engineOut: null,
    outputs: [],
  });
  const [canvas, setCanvas] = useState({ width: 0, height: 0 });

  const measurePoints = useCallback(() => {
    const container = containerRef.current;
    const engine = engineRef.current;
    if (!container || !engine) return;

    const containerRect = container.getBoundingClientRect();
    const engineRect = engine.getBoundingClientRect();

    const engineIn: Point = { x: engineRect.left - containerRect.left, y: engineRect.top - containerRect.top + engineRect.height / 2 };
    const engineOut: Point = { x: engineRect.right - containerRect.left, y: engineRect.top - containerRect.top + engineRect.height / 2 };

    const inputPoints = INPUTS.map((_, i) => {
      const node = inputRefs.current[i];
      if (!node) return { x: 0, y: 0 };
      const rect = node.getBoundingClientRect();
      return {
        x: rect.right - containerRect.left,
        y: rect.top - containerRect.top + rect.height / 2,
      };
    });

    const outputPoints = OUTPUTS.map((_, i) => {
      const node = outputRefs.current[i];
      if (!node) return { x: 0, y: 0 };
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top + rect.height / 2,
      };
    });

    setCanvas({ width: containerRect.width, height: containerRect.height });
    setPoints({
      inputs: inputPoints,
      engineIn,
      engineOut,
      outputs: outputPoints,
    });
  }, []);

  useEffect(() => {
    let rafId = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measurePoints);
    };

    scheduleMeasure();
    window.addEventListener("resize", scheduleMeasure);

    const observer = new ResizeObserver(scheduleMeasure);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleMeasure);
      observer.disconnect();
    };
  }, [measurePoints]);
  const lanePaths = useMemo<LanePath[]>(() => {
    if (
      !points.engineIn ||
      !points.engineOut ||
      points.inputs.length !== INPUTS.length ||
      points.outputs.length !== OUTPUTS.length
    ) {
      return [];
    }

    const inputLanes = INPUTS.map((item, idx) => ({
      key: `in-${idx}`,
      d: buildBezierPath(points.inputs[idx], points.engineIn!),
      color: item.laneColor,
      duration: 2.5,
      delay: idx * 0.22,
    }));

    const outputLanes = OUTPUTS.map((item, idx) => ({
      key: `out-${idx}`,
      d: buildBezierPath(points.engineOut!, points.outputs[idx]),
      color: item.laneColor,
      duration: 2.6,
      delay: 0.85 + idx * 0.24,
    }));

    return [...inputLanes, ...outputLanes];
  }, [points]);

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-[1100px]">
        {showLabels && (
          <div className="text-center mb-10 md:mb-12">
            <h3 className="h2">{title}</h3>
            <p className="text-muted body mt-2 max-w-[68ch] mx-auto">{subtitle}</p>
          </div>
        )}

        <div ref={containerRef} className="relative py-2 md:py-4 overflow-visible">
          <svg
            className="pointer-events-none absolute inset-0 z-0 overflow-visible"
            width={canvas.width}
            height={canvas.height}
            viewBox={`0 0 ${Math.max(canvas.width, 1)} ${Math.max(canvas.height, 1)}`}
            fill="none"
            aria-hidden
          >
            {lanePaths.map((lane, laneIndex) => (
              <path
                key={lane.key}
                ref={(node) => {
                  pathRefs.current[laneIndex] = node;
                }}
                d={lane.d}
                stroke="rgba(255, 255, 255, 0.10)"
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
              />
            ))}

            {lanePaths.map((lane, laneIndex) => (
              <DotOnPath
                key={`${lane.key}-dot`}
                pathRefs={pathRefs}
                pathIndex={laneIndex}
                color={lane.color}
                duration={lane.duration}
                delay={lane.delay}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            ))}
          </svg>

          {/* Grid layout - Strictly symmetrical 3 columns */}
          <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center max-w-5xl mx-auto">
            {/* Inputs - Left Column (Text Right, Icon Inner) */}
            <div className="flex flex-col gap-6 md:gap-8 items-end">
              {INPUTS.map((item, idx) => (
                <div key={item.label} className="flex flex-row-reverse items-center gap-3 md:gap-4 text-right">
                  <div
                    ref={(node) => {
                      inputRefs.current[idx] = node;
                    }}
                    className="h-11 w-11 md:h-12 md:w-12 rounded-2xl border border-[var(--border-muted-strong)] bg-[color-mix(in_srgb,var(--bg-secondary)_70%,transparent)] backdrop-blur-[1px] flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <item.icon className="h-5 w-5" style={{ color: item.laneColor }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm md:text-[15px] font-semibold text-[var(--text-primary)]">{item.label}</p>
                    <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Engine - Center Column */}
            <div className="relative flex flex-col items-center justify-center px-4">
              <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0">
                <div className="absolute inset-2 md:inset-3 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.26)_0%,rgba(99,102,241,0.18)_38%,rgba(99,102,241,0)_72%)] blur-2xl" />
                {/* Rings */}
                {[0, 0.6, 1.2].map((delay, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-full border border-[var(--accent-2)]/28"
                    initial={prefersReducedMotion ? { opacity: 0.2, scale: 1 } : { opacity: 0.33, scale: 1 }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 0.2, scale: 1 }
                        : { opacity: [0.36, 0.08, 0], scale: [1, 1.5, 1.88] }
                    }
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 2.5, delay, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                ))}

                <div
                  ref={engineRef}
                  className="absolute inset-6 md:inset-8 rounded-full border border-[var(--border-muted-strong)] bg-[color-mix(in_srgb,var(--bg-card)_75%,transparent)] backdrop-blur-sm flex items-center justify-center shadow-lg"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent-3) 35%, transparent), transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--accent-2) 35%, transparent), transparent 62%)",
                  }}
                >
                  <BrainCircuit className="h-9 w-9 md:h-10 md:w-10 text-[var(--text-primary)]" />
                </div>
              </div>
              {/* Title as pill badge above/below? User said "place it above the engine thing" - but the rings are large. 
                  Placing it visually above the rings might cover them or be too high. 
                  Let's try placing it just below the rings or overlaying? 
                  "place it above the engine thing" -> likely means above the graphic. 
                  I'll place it above the `.relative` container or inside it at the top.
                  Actually, let's put it ABOVE the circle. */}
              {title && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="pill-badge px-3 py-1 text-[10px] font-semibold border-[var(--accent-2)]/20 bg-[var(--accent-2)]/5 text-[var(--accent-2)] uppercase tracking-wider">
                    {title}
                  </span>
                </div>
              )}
            </div>

            {/* Outputs - Right Column (Text Left, Icon Inner) */}
            <div className="flex flex-col gap-6 md:gap-8 items-start">
              {OUTPUTS.map((item, idx) => (
                <div key={item.label} className="flex items-center gap-3 md:gap-4 text-left">
                  <div
                    ref={(node) => {
                      outputRefs.current[idx] = node;
                    }}
                    className="h-11 w-11 md:h-12 md:w-12 rounded-2xl border border-[var(--border-muted-strong)] bg-[color-mix(in_srgb,var(--bg-secondary)_70%,transparent)] backdrop-blur-[1px] flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <item.icon className="h-5 w-5" style={{ color: item.laneColor }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm md:text-[15px] font-semibold text-[var(--text-primary)]">{item.label}</p>
                    <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineAnimation;
