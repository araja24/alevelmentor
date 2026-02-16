"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { AnimatedBackground } from "@/components/landing/AnimatedBackground";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarDays,
  Target,
  Brain,
  Clock,
} from "lucide-react";
import type {
  OnboardingData,
  YearGroup,
  ExamBoard,
  TargetGrade,
  PrimaryObstacle,
} from "@/types/db";

const TOTAL_STEPS = 7;

const OBSTACLE_COPY: Record<PrimaryObstacle, { stat: string; message: string }> = {
  Procrastination: {
    stat: "82%",
    message:
      "of students struggle with procrastination. We remove decision fatigue by telling you exactly what to study next.",
  },
  "Lack of structure": {
    stat: "73%",
    message:
      "of students don't fail from lack of effort — they fail from lack of structure. We fix that.",
  },
  "Poor revision techniques": {
    stat: "68%",
    message:
      "of students use ineffective revision methods. We apply proven, evidence-based techniques for you.",
  },
  "Time management": {
    stat: "77%",
    message:
      "of students underestimate time needed. We build a realistic, week-by-week plan that fits your life.",
  },
  Burnout: {
    stat: "61%",
    message:
      "of students burn out before exams. We pace your revision to peak at the right moment.",
  },
};

interface OnboardingFlowProps {
  userId: string;
  userEmail: string;
  existingData: Record<string, unknown> | null;
}

function deriveInitialStep(data: Record<string, unknown> | null): number {
  if (!data) return 0;
  if (!data.year_group) return 0;
  if (
    !data.subjects ||
    (Array.isArray(data.subjects) && data.subjects.length === 0)
  )
    return 1;
  if (!data.exam_board) return 2;
  if (!data.exam_date) return 3;
  if (!data.target_grade) return 4;
  if (!data.primary_obstacle) return 5;
  if (!data.weekly_revision_hours) return 6;
  return 6;
}

export function OnboardingFlow({
  userId,
  userEmail,
  existingData,
}: OnboardingFlowProps) {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(() => deriveInitialStep(existingData));
  const [direction, setDirection] = useState(1);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<OnboardingData>({
    year_group: (existingData?.year_group as YearGroup) ?? null,
    subjects: Array.isArray(existingData?.subjects) ? (existingData.subjects as string[]) : [],
    exam_board: (existingData?.exam_board as ExamBoard) ?? null,
    exam_date: (existingData?.exam_date as string) ?? null,
    target_grade: (existingData?.target_grade as TargetGrade) ?? null,
    primary_obstacle: (existingData?.primary_obstacle as PrimaryObstacle) ?? null,
    weekly_revision_hours:
      typeof existingData?.weekly_revision_hours === "number"
        ? existingData.weekly_revision_hours
        : 12,
  });

  const update = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const persist = async (fields: Partial<OnboardingData> & { onboarding_completed?: boolean }) => {
    setSaving(true);
    try {
      const { error: selectError, data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (!existing) {
        await supabase.from("users").insert({
          id: userId,
          email: userEmail,
          ...fields,
        });
      } else {
        await supabase.from("users").update(fields).eq("id", userId);
      }
    } finally {
      setSaving(false);
    }
  };

  const next = async () => {
    const fieldsForStep: Record<number, Partial<OnboardingData>> = {
      0: { year_group: data.year_group },
      1: { subjects: data.subjects },
      2: { exam_board: data.exam_board },
      3: { exam_date: data.exam_date },
      4: { target_grade: data.target_grade },
      5: { primary_obstacle: data.primary_obstacle },
      6: { weekly_revision_hours: data.weekly_revision_hours },
    };

    await persist(fieldsForStep[step]);

    if (step === TOTAL_STEPS - 1) {
      await persist({ onboarding_completed: true } as any);
      router.push("/dashboard");
      return;
    }

    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return data.year_group !== null;
      case 1: return data.subjects.length > 0;
      case 2: return data.exam_board !== null;
      case 3: return data.exam_date !== null && new Date(data.exam_date) > new Date();
      case 4: return data.target_grade !== null;
      case 5: return data.primary_obstacle !== null;
      case 6: return data.weekly_revision_hours >= 5;
      default: return false;
    }
  };

  const stepIcons = [
    GraduationCap,
    BookOpen,
    ClipboardList,
    CalendarDays,
    Target,
    Brain,
    Clock,
  ];
  const StepIcon = stepIcons[step];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-[520px]">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              alevel<span className="text-[#5a35f8]">mentor</span>
            </h1>
          </Link>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
              Step {step + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-[11px] font-medium text-white/40">
              {Math.round(((step + 1) / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9]"
              initial={false}
              animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step card */}
        <GlassCard className="p-8" gradient>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Step icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="h-12 w-12 rounded-2xl bg-[#5a35f8]/15 border border-[#5a35f8]/30 flex items-center justify-center shadow-[0_0_24px_rgba(90,53,248,0.15)]">
                  <StepIcon className="w-6 h-6 text-[#8b6cf9]" />
                </div>
              </div>

              {/* Step content */}
              {step === 0 && <StepYearGroup value={data.year_group} onChange={(v) => update("year_group", v)} />}
              {step === 1 && <StepSubjects value={data.subjects} onChange={(v) => update("subjects", v)} />}
              {step === 2 && <StepExamBoard value={data.exam_board} onChange={(v) => update("exam_board", v)} />}
              {step === 3 && <StepExamDate value={data.exam_date} onChange={(v) => update("exam_date", v)} />}
              {step === 4 && <StepTargetGrade value={data.target_grade} onChange={(v) => update("target_grade", v)} />}
              {step === 5 && <StepObstacle value={data.primary_obstacle} onChange={(v) => update("primary_obstacle", v)} />}
              {step === 6 && <StepWeeklyHours value={data.weekly_revision_hours} onChange={(v) => update("weekly_revision_hours", v)} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={next}
              disabled={!canProceed() || saving}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#5a35f8] px-7 py-3 text-[14px] font-semibold text-white transition-all duration-300 shadow-[0_0_24px_rgba(90,53,248,0.4)] hover:shadow-[0_0_40px_rgba(90,53,248,0.55)] hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <span className="pointer-events-none absolute inset-0 animate-shimmer-sweep" style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)" }} />
              <span className="relative z-10 flex items-center gap-2">
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : step === TOTAL_STEPS - 1 ? (
                  "Finish setup"
                ) : (
                  <>Continue <ArrowRight className="w-4 h-4" /></>
                )}
              </span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP COMPONENTS
   ───────────────────────────────────────────── */

function OptionCard({
  selected,
  onClick,
  disabled,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left p-4 rounded-xl border transition-all duration-200
        ${
          selected
            ? "bg-[#5a35f8]/15 border-[#5a35f8]/50 shadow-[0_0_20px_rgba(90,53,248,0.15)]"
            : disabled
              ? "bg-white/[0.02] border-white/5 opacity-40 cursor-not-allowed"
              : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
        }
      `}
    >
      {children}
    </button>
  );
}

function StepYearGroup({
  value,
  onChange,
}: {
  value: YearGroup | null;
  onChange: (v: YearGroup) => void;
}) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        What year are you in?
      </h2>
      <p className="text-sm text-white/50 mb-6">
        This determines the urgency and pacing of your plan.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {([12, 13] as const).map((y) => (
          <OptionCard key={y} selected={value === y} onClick={() => onChange(y)}>
            <p className="text-lg font-bold text-white text-center">Year {y}</p>
            <p className="text-xs text-white/50 text-center mt-1">
              {y === 12 ? "Building foundations" : "Final push"}
            </p>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepSubjects({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const subjects = [
    { name: "Mathematics", enabled: true },
    { name: "Further Maths", enabled: false },
    { name: "Physics", enabled: false },
    { name: "Chemistry", enabled: false },
    { name: "Biology", enabled: false },
    { name: "Economics", enabled: false },
  ];

  const toggle = (name: string) => {
    if (value.includes(name)) {
      onChange(value.filter((s) => s !== name));
    } else {
      onChange([...value, name]);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        What are your A-Level subjects?
      </h2>
      <p className="text-sm text-white/50 mb-6">
        Select your subjects. More coming soon.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {subjects.map((s) => (
          <OptionCard
            key={s.name}
            selected={value.includes(s.name)}
            onClick={() => s.enabled && toggle(s.name)}
            disabled={!s.enabled}
          >
            <p className="text-sm font-medium text-white text-center">
              {s.name}
            </p>
            {!s.enabled && (
              <p className="text-[10px] text-white/30 text-center mt-1 uppercase tracking-wider">
                Coming soon
              </p>
            )}
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepExamBoard({
  value,
  onChange,
}: {
  value: ExamBoard | null;
  onChange: (v: ExamBoard) => void;
}) {
  const boards: { name: ExamBoard; enabled: boolean }[] = [
    { name: "Edexcel", enabled: true },
    { name: "AQA", enabled: false },
    { name: "OCR", enabled: false },
  ];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        What exam board are you studying?
      </h2>
      <p className="text-sm text-white/50 mb-6">
        Your roadmap is tailored to the exact specification.
      </p>
      <div className="space-y-3">
        {boards.map((b) => (
          <OptionCard
            key={b.name}
            selected={value === b.name}
            onClick={() => b.enabled && onChange(b.name)}
            disabled={!b.enabled}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">{b.name}</p>
              {!b.enabled && (
                <span className="text-[10px] text-white/30 uppercase tracking-wider">
                  Coming soon
                </span>
              )}
              {b.enabled && value === b.name && (
                <div className="w-5 h-5 rounded-full bg-[#5a35f8] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepExamDate({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string) => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 24);
  const max = maxDate.toISOString().split("T")[0];

  const isTooSoon = value ? (new Date(value).getTime() - Date.now()) / (1000 * 60 * 60 * 24) < 14 : false;

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        When is your exam?
      </h2>
      <p className="text-sm text-white/50 mb-6">
        We&apos;ll count backwards from this to build your plan.
      </p>
      <input
        type="date"
        value={value ?? ""}
        min={today}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white focus:border-[#5a35f8]/50 focus:bg-[#5a35f8]/5 focus:outline-none focus:ring-1 focus:ring-[#5a35f8]/50 transition-all [color-scheme:dark]"
      />
      {isTooSoon && value && (
        <p className="mt-3 text-xs text-amber-400/80">
          That&apos;s less than 2 weeks away. Your plan will be very intensive.
        </p>
      )}
    </div>
  );
}

function StepTargetGrade({
  value,
  onChange,
}: {
  value: TargetGrade | null;
  onChange: (v: TargetGrade) => void;
}) {
  const grades: { grade: TargetGrade; label: string }[] = [
    { grade: "A*", label: "The highest" },
    { grade: "A", label: "Strong performance" },
    { grade: "B", label: "Solid result" },
    { grade: "C", label: "Pass with confidence" },
  ];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        What grade are you aiming for?
      </h2>
      <p className="text-sm text-white/50 mb-6">
        We optimise every hour of revision toward this target.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {grades.map((g) => (
          <OptionCard
            key={g.grade}
            selected={value === g.grade}
            onClick={() => onChange(g.grade)}
          >
            <p className="text-2xl font-bold text-white text-center">
              {g.grade}
            </p>
            <p className="text-xs text-white/50 text-center mt-1">
              {g.label}
            </p>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepObstacle({
  value,
  onChange,
}: {
  value: PrimaryObstacle | null;
  onChange: (v: PrimaryObstacle) => void;
}) {
  const options: PrimaryObstacle[] = [
    "Procrastination",
    "Lack of structure",
    "Poor revision techniques",
    "Time management",
    "Burnout",
  ];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        What&apos;s holding you back?
      </h2>
      <p className="text-sm text-white/50 mb-6">
        Be honest. We&apos;ll build your plan around it.
      </p>
      <div className="space-y-2.5">
        {options.map((o) => (
          <OptionCard key={o} selected={value === o} onClick={() => onChange(o)}>
            <p className="text-sm font-medium text-white text-center">{o}</p>
          </OptionCard>
        ))}
      </div>

      {/* Dynamic infographic */}
      <AnimatePresence mode="wait">
        {value && (
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 rounded-xl bg-[#5a35f8]/10 border border-[#5a35f8]/20"
          >
            <p className="text-[32px] font-bold bg-gradient-to-r from-[#5a35f8] to-[#8b6cf9] bg-clip-text text-transparent">
              {OBSTACLE_COPY[value].stat}
            </p>
            <p className="text-sm text-white/70 mt-1 leading-relaxed">
              {OBSTACLE_COPY[value].message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepWeeklyHours({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const hoursPerDay = (value / 7).toFixed(1);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        How many hours per week can you revise?
      </h2>
      <p className="text-sm text-white/50 mb-8">
        Be realistic. We&apos;ll never overload you.
      </p>

      <p className="text-5xl font-bold text-white mb-2">{value}h</p>
      <p className="text-sm text-white/50 mb-8">
        That&apos;s about{" "}
        <span className="text-[#8b6cf9] font-medium">{hoursPerDay} hours per day</span>
      </p>

      <div className="relative px-2">
        <input
          type="range"
          min={5}
          max={40}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-slider"
          style={{
            background: `linear-gradient(to right, #5a35f8 0%, #8b6cf9 ${((value - 5) / 35) * 100}%, rgba(255,255,255,0.06) ${((value - 5) / 35) * 100}%, rgba(255,255,255,0.06) 100%)`,
          }}
        />
        <div className="flex justify-between mt-2 text-xs text-white/30">
          <span>5h</span>
          <span>40h</span>
        </div>
      </div>

      {value < 8 && (
        <p className="mt-4 text-xs text-amber-400/80">
          Less than 8 hours may limit your progress. Consider aiming higher.
        </p>
      )}
    </div>
  );
}
