"use client";

import {
  AlertCircle,
  BarChart3,
  BrainCircuit,
  Calendar,
  CheckSquare,
  Clock,
  FileQuestion,
  FileText,
  Map,
  MessageCircle,
  Route,
  Target,
  Timer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { cn } from "@/lib/utils";

// ViewBox extended left so inputs sit farther out; diagram spans ~2/3 horizontal feel
const VIEWBOX_MIN_X = -25;
const VIEWBOX_WIDTH = 135; // 110 - (-25); content runs from -25 to 110
const VIEWBOX_HEIGHT = 100;

type Point = { x: number; y: number };

type NodeDef = {
  id: string;
  label: string;
  tooltip: string;
  icon: LucideIcon;
  color: string;
  point: Point;
  isRectChip?: boolean;
};

type PathDef = {
  key: string;
  from: Point;
  to: Point;
  color: string;
  duration: number;
  delay: number;
  fromId?: string;
  toId?: string;
};

// Timing constants from docs/engine-animation-dot-timings.md
const INPUT_DURATION = 2.5;
const INPUT_DELAY_STEP = 0.22;
const OUTPUT_DURATION = 2.6;
const OUTPUT_DELAY_STEP = 0.24;
const NUM_INPUTS = 3;
const LAST_INPUT_ARRIVAL = (NUM_INPUTS - 1) * INPUT_DELAY_STEP + INPUT_DURATION;

/** Horizontal-bias Bezier: control points extend along x so curves stay in lane. Center-to-center. */
function buildBezierPath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const k = Math.max(4, Math.abs(dx) * 0.3);
  const c1x = from.x + k;
  const c2x = to.x - k;
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
}

/** Left/right edge of engine in viewBox units so input/output lines merge at one point. */
const ENGINE_LEFT_OFFSET = 4;
const ENGINE_RIGHT_OFFSET = 4;

/** Input path: from input node to center-left "port" of engine. Lines bundle inward so they converge
 *  at a single point (engineIn) and do not enter at the top/bottom edges of the brain. */
function buildInputPath(fromCenter: Point, engineIn: Point): string {
  const k = Math.max(4, (engineIn.x - fromCenter.x) * 0.25);
  const c1x = fromCenter.x + k;
  // Pull toward center-left: second control at engine y so all three curves bundle before the port
  const c2x = engineIn.x - 12;
  const c2y = engineIn.y;
  return `M ${fromCenter.x} ${fromCenter.y} C ${c1x} ${fromCenter.y}, ${c2x} ${c2y}, ${engineIn.x} ${engineIn.y}`;
}

/** Output path: from a single engineOut point so all three lines emerge from one point, then fan out. */
function buildOutputPath(engineOut: Point, toCenter: Point): string {
  const c1x = engineOut.x + 6;
  const c1y = engineOut.y;
  const c2x = toCenter.x - 4;
  return `M ${engineOut.x} ${engineOut.y} C ${c1x} ${c1y}, ${c2x} ${toCenter.y}, ${toCenter.x} ${toCenter.y}`;
}

/** Feedback: one smooth parabolic arc (single Quadratic Bezier) well clear of all nodes, lines, icons, and text. */
function buildFeedbackPathQuad(from: Point, to: Point): string {
  const controlX = (from.x + to.x) / 2;
  const controlY = 175;
  return `M ${from.x} ${from.y} Q ${controlX} ${controlY}, ${to.x} ${to.y}`;
}

function DotOnPath({
  pathRefs,
  pathIndex,
  pathD,
  color,
  duration,
  delay,
  prefersReducedMotion,
}: {
  pathRefs: MutableRefObject<(SVGPathElement | null)[]>;
  pathIndex: number;
  pathD: string;
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
  }, [delay, duration, pathD, pathIndex, pathRefs, prefersReducedMotion, progress]);

  if (prefersReducedMotion) return null;

  // Dot size: slightly smaller and distinct (plan: r=0.5); solid colors matching source node
  return (
    <motion.circle
      cx={dotX}
      cy={dotY}
      r={0.5}
      fill={color}
      opacity={0.92}
      style={{
        filter: `drop-shadow(0 0 6px ${color})`,
      }}
    />
  );
}

// Vertical symmetry: inputs (left) mirror first output column (right) — same top % = same horizontal line
// Lane 1 (y 15): Target Grades ← → Weekly Schedule → Topic Practice
// Lane 2 (y 50): Exam Date ← → Past Paper Engine → …
// Lane 3 (y 85): Struggles ← → Adaptive Plan → Recall → AI Follow-up
const NODES: NodeDef[] = [
  { id: "targetGrades", label: "Target Grades", tooltip: "Desired outcomes across subjects", icon: Target, color: "#f59e0b", point: { x: -20, y: 15 } },
  { id: "examDate", label: "Exam Date", tooltip: "Time pressure and remaining weeks", icon: Clock, color: "#fbbf24", point: { x: -20, y: 50 } },
  { id: "struggles", label: "Struggles", tooltip: "Weak topics and confidence gaps", icon: AlertCircle, color: "#ef4444", point: { x: -20, y: 85 } },
  { id: "engine", label: "A Level Engine", tooltip: "Central intelligence", icon: BrainCircuit, color: "#8b5cf6", point: { x: 21, y: 50 } },
  { id: "weeklySchedule", label: "Weekly Schedule", tooltip: "Clear day-by-day study priorities", icon: Calendar, color: "#22c55e", point: { x: 45, y: 15 } },
  { id: "pastPaperEngine", label: "Past Paper Engine", tooltip: "Practice + feedback tied to your plan", icon: FileText, color: "#3ed6ff", point: { x: 45, y: 50 } },
  { id: "adaptivePlan", label: "Adaptive Plan", tooltip: "Adjusts instantly when life changes", icon: Map, color: "#14b8a6", point: { x: 45, y: 85 } },
  { id: "topicPractice", label: "Topic Practice", tooltip: "Past-paper style questions by topic", icon: FileQuestion, color: "#22c55e", point: { x: 65, y: 15 } },
  { id: "markInSeconds", label: "Mark in Seconds", tooltip: "Instant mark and feedback", icon: Timer, color: "#3ed6ff", point: { x: 60, y: 50 } },
  { id: "markSchemeCompare", label: "Mark Scheme Compare", tooltip: "See how your answer stacks up", icon: CheckSquare, color: "#06b6d4", point: { x: 75, y: 50 } },
  { id: "trackProgress", label: "Track Progress", tooltip: "Performance trends and topic insights", icon: BarChart3, color: "#8b5cf6", point: { x: 90, y: 50 } },
  { id: "livePredictedGrade", label: "Live Predicted Grade", tooltip: "Prediction moves with every paper", icon: TrendingUp, color: "#f59e0b", point: { x: 105, y: 50 } },
  { id: "recallByTopic", label: "Recall by Topic", tooltip: "Run through recall questions by topic", icon: Route, color: "#a855f7", point: { x: 65, y: 85 } },
  { id: "aiFollowUp", label: "AI Follow-up", tooltip: "Dive deeper with your AI tutor", icon: MessageCircle, color: "#a855f7", point: { x: 80, y: 85 } },
];

// Arrival times: a dot must not leave a node until all incoming dots have arrived.
// Engine: last input arrives at LAST_INPUT_ARRIVAL (2.94s); output dots start at LAST_INPUT_ARRIVAL + idx*OUTPUT_DELAY_STEP.
const ARRIVAL_WEEKLY = LAST_INPUT_ARRIVAL + 0 * OUTPUT_DELAY_STEP + OUTPUT_DURATION;
const ARRIVAL_ADAPTIVE = LAST_INPUT_ARRIVAL + 2 * OUTPUT_DELAY_STEP + OUTPUT_DURATION;
const PAST_PAPER_ARRIVAL = LAST_INPUT_ARRIVAL + 1 * OUTPUT_DELAY_STEP + OUTPUT_DURATION;
const MARK_ARRIVAL = PAST_PAPER_ARRIVAL + OUTPUT_DURATION;
const SCHEME_ARRIVAL = MARK_ARRIVAL + OUTPUT_DURATION;
const TRACK_ARRIVAL = SCHEME_ARRIVAL + OUTPUT_DURATION;
const LIVE_ARRIVAL = TRACK_ARRIVAL + OUTPUT_DURATION;
const ARRIVAL_RECALL = ARRIVAL_ADAPTIVE + OUTPUT_DURATION;

function getNode(id: string): NodeDef {
  const n = NODES.find((x) => x.id === id);
  if (!n) throw new Error(`Unknown node: ${id}`);
  return n;
}

function buildPathDefs(): PathDef[] {
  const engine = getNode("engine").point;
  const inputLanes = [
    { id: "targetGrades", idx: 0 },
    { id: "examDate", idx: 1 },
    { id: "struggles", idx: 2 },
  ].map(({ id, idx }) => ({
    key: `in-${id}`,
    from: getNode(id).point,
    to: engine,
    color: getNode(id).color,
    duration: INPUT_DURATION,
    delay: idx * INPUT_DELAY_STEP,
    fromId: id,
    toId: "engine",
  }));

  // Three lanes only: engine → Weekly Schedule, Past Paper Engine, Adaptive Plan
  const branchOrder = ["weeklySchedule", "pastPaperEngine", "adaptivePlan"] as const;
  const outputLanes: PathDef[] = branchOrder.map((id, idx) => ({
    key: `out-${id}`,
    from: engine,
    to: getNode(id).point,
    color: getNode(id).color,
    duration: OUTPUT_DURATION,
    delay: LAST_INPUT_ARRIVAL + idx * OUTPUT_DELAY_STEP,
    fromId: "engine",
    toId: id,
  }));

  // Lane 1: Weekly → Topic Practice (dot leaves Weekly only after it has arrived)
  const lane1: PathDef[] = [
    { key: "weekly-topic", from: getNode("weeklySchedule").point, to: getNode("topicPractice").point, color: "#22c55e", duration: OUTPUT_DURATION, delay: ARRIVAL_WEEKLY, fromId: "weeklySchedule", toId: "topicPractice" },
  ];

  // Lane 2: Past Paper pipeline + feedback
  const lane2: PathDef[] = [
    { key: "pastPaper-mark", from: getNode("pastPaperEngine").point, to: getNode("markInSeconds").point, color: "#3ed6ff", duration: OUTPUT_DURATION, delay: PAST_PAPER_ARRIVAL, fromId: "pastPaperEngine", toId: "markInSeconds" },
    { key: "mark-scheme", from: getNode("markInSeconds").point, to: getNode("markSchemeCompare").point, color: "#06b6d4", duration: OUTPUT_DURATION, delay: MARK_ARRIVAL, fromId: "markInSeconds", toId: "markSchemeCompare" },
    { key: "scheme-track", from: getNode("markSchemeCompare").point, to: getNode("trackProgress").point, color: "#8b5cf6", duration: OUTPUT_DURATION, delay: SCHEME_ARRIVAL, fromId: "markSchemeCompare", toId: "trackProgress" },
    { key: "track-live", from: getNode("trackProgress").point, to: getNode("livePredictedGrade").point, color: "#f59e0b", duration: OUTPUT_DURATION, delay: TRACK_ARRIVAL, fromId: "trackProgress", toId: "livePredictedGrade" },
    { key: "feedback", from: getNode("livePredictedGrade").point, to: engine, color: "#f59e0b", duration: OUTPUT_DURATION, delay: LIVE_ARRIVAL, fromId: "livePredictedGrade", toId: "engine" },
  ];

  // Lane 3: Adaptive → Recall → AI Follow-up (dot leaves each node only after arrival)
  const lane3: PathDef[] = [
    { key: "adaptive-recall", from: getNode("adaptivePlan").point, to: getNode("recallByTopic").point, color: "#a855f7", duration: OUTPUT_DURATION, delay: ARRIVAL_ADAPTIVE, fromId: "adaptivePlan", toId: "recallByTopic" },
    { key: "recall-ai", from: getNode("recallByTopic").point, to: getNode("aiFollowUp").point, color: "#a855f7", duration: OUTPUT_DURATION, delay: ARRIVAL_RECALL, fromId: "recallByTopic", toId: "aiFollowUp" },
  ];

  return [...inputLanes, ...outputLanes, ...lane1, ...lane2, ...lane3];
}

const ALL_PATHS = buildPathDefs();

function pathTouchesNode(path: PathDef, nodeId: string): boolean {
  return path.fromId === nodeId || path.toId === nodeId;
}

function getNeighbourIds(nodeId: string): Set<string> {
  const set = new Set<string>();
  for (const p of ALL_PATHS) {
    if (p.fromId === nodeId) set.add(p.toId!);
    if (p.toId === nodeId) set.add(p.fromId!);
  }
  return set;
}

export function EngineAnimationLarge({ className }: { className?: string } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const lanePaths = useMemo(() => {
    const engine = getNode("engine").point;
    const engineIn: Point = { x: engine.x - ENGINE_LEFT_OFFSET, y: engine.y };
    const engineOut: Point = { x: engine.x + ENGINE_RIGHT_OFFSET, y: engine.y };
    return ALL_PATHS.map((p) => {
      let d: string;
      if (p.key.startsWith("in-")) {
        d = buildInputPath(p.from, engineIn);
      } else if (p.key.startsWith("out-")) {
        d = buildOutputPath(engineOut, p.to);
      } else if (p.key === "feedback") {
        d = buildFeedbackPathQuad(p.from, p.to);
      } else {
        d = buildBezierPath(p.from, p.to);
      }
      return { ...p, d };
    });
  }, []);

  const neighbourIds = useMemo(() => (hoveredId ? getNeighbourIds(hoveredId) : new Set<string>()), [hoveredId]);

  // Engine at x=21; viewBox runs from VIEWBOX_MIN_X; position diagram so engine is at page center
  const engineCenterFraction = (21 - VIEWBOX_MIN_X) / VIEWBOX_WIDTH;

  return (
    <section className={cn("w-full min-w-0 overflow-visible", className)}>
      <div className="relative w-full min-h-[480px] md:min-h-[520px] lg:min-h-[600px]">
        <div
          className="absolute left-[48%] overflow-visible min-h-[480px] md:min-h-[520px] lg:min-h-[600px] w-full max-w-[1100px]"
          style={{
            aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}`,
            transform: `translateX(calc(-${engineCenterFraction * 100}%))`,
          }}
        >
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none overflow-visible z-0"
            viewBox={`${VIEWBOX_MIN_X} 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden
          >
            {/* Paths: thin lines to match commit f11a063 / reference image; viewBox 100 so use ~0.2 for equivalent thinness */}
            {lanePaths.map((lane, i) => {
              const isFeedback = lane.key === "feedback";
              const isHighlight = hoveredId && (pathTouchesNode(ALL_PATHS[i], hoveredId));
              return (
                <path
                  key={lane.key}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d={lane.d}
                  stroke={isHighlight ? lane.color : "rgba(255, 255, 255, 0.10)"}
                  strokeWidth="0.18"
                  strokeLinecap="round"
                  fill="none"
                  strokeOpacity={isFeedback ? 0.2 : 1}
                  style={isHighlight ? { filter: `drop-shadow(0 0 6px ${lane.color})` } : undefined}
                />
              );
            })}
            {/* Dots */}
            {lanePaths.map((lane, laneIndex) => (
              <DotOnPath
                key={`${lane.key}-dot`}
                pathRefs={pathRefs}
                pathIndex={laneIndex}
                pathD={lane.d}
                color={lane.color}
                duration={lane.duration}
                delay={lane.delay}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            ))}
          </svg>

          {/* HTML nodes - above SVG so lines/dots pass underneath (tunnel effect) */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="relative w-full h-full z-10" style={{ pointerEvents: "none" }}>
              {NODES.map((node) => {
                const isHovered = hoveredId === node.id;
                const isRelated = hoveredId ? neighbourIds.has(node.id) : false;
                const isEngine = node.id === "engine";
                const isRectChip = node.isRectChip === true;
                return (
                  <div
                    key={node.id}
                    className="absolute z-10 pointer-events-auto flex flex-col items-center"
                    style={{
                      left: `${((node.point.x - VIEWBOX_MIN_X) / VIEWBOX_WIDTH) * 100}%`,
                      top: `${node.point.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {isEngine && (
                      <p
                        className={cn(
                          "mb-1.5 text-center text-[10px] font-medium max-w-[110px] leading-tight whitespace-nowrap",
                          isHovered || isRelated ? "text-[var(--text-primary)]" : "text-muted"
                        )}
                      >
                        {node.label}
                      </p>
                    )}
                    <motion.div
                      className={cn(
                        "flex flex-col items-center justify-center cursor-default transition-colors shrink-0",
                        !isEngine && "border border-[var(--border-muted-strong)] bg-[var(--bg-secondary)]",
                        !isEngine && (isRectChip ? "rounded-lg px-2" : "rounded-xl")
                      )}
                      style={{
                        width: isEngine ? undefined : isRectChip ? 52 : 44,
                        height: isEngine ? undefined : isRectChip ? 36 : 44,
                        boxShadow: !isEngine && (isHovered || isRelated) ? `0 0 20px ${node.color}40` : undefined,
                      }}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      whileHover={isEngine ? undefined : { scale: 1.08 }}
                      title={node.tooltip}
                    >
                      {isEngine ? (
                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 flex-shrink-0">
                          <div className="absolute inset-2 md:inset-3 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.26)_0%,rgba(99,102,241,0.18)_38%,rgba(99,102,241,0)_72%)] blur-2xl" />
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
                            className="absolute inset-4 sm:inset-5 md:inset-6 lg:inset-8 rounded-full border border-[var(--border-muted-strong)] bg-[color-mix(in_srgb,var(--bg-card)_75%,transparent)] backdrop-blur-sm flex items-center justify-center shadow-lg"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent-3) 35%, transparent), transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--accent-2) 35%, transparent), transparent 62%)",
                            }}
                          >
                            <BrainCircuit className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-[var(--text-primary)]" />
                          </div>
                        </div>
                      ) : (
                        <node.icon className="h-5 w-5 shrink-0" style={{ color: node.color }} />
                      )}
                    </motion.div>
                    {!isEngine && (
                      <p
                        className={cn(
                          "mt-1.5 text-center text-[10px] font-medium max-w-[110px] leading-tight whitespace-nowrap",
                          isHovered || isRelated ? "text-[var(--text-primary)]" : "text-muted"
                        )}
                      >
                        {node.label}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineAnimationLarge;
