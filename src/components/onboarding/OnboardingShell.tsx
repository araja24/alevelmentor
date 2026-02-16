'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';
import { ThemeToggle } from '@/components/landing/ThemeToggle';
import { useOnboardingAnalytics } from '@/hooks/useOnboardingAnalytics';
import { StepYearGroup } from './steps/StepYearGroup';
import { StepSubjects } from './steps/StepSubjects';
import { StepExamBoard } from './steps/StepExamBoard';
import { StepExamDatesGrades } from './steps/StepExamDatesGrades';
import { StepStruggle } from './steps/StepStruggle';
import { StepWeeklyHours } from './steps/StepWeeklyHours';
import { AnalyticsPanel } from './AnalyticsPanel';
import type {
  OnboardingData,
  YearGroup,
  ExamBoard,
  TargetGrade,
  PrimaryStruggle,
  Profile,
} from '@/types/db';
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarDays,
  Brain,
  Clock,
} from 'lucide-react';

const TOTAL_STEPS = 6;
const STEP_ICONS = [GraduationCap, BookOpen, ClipboardList, CalendarDays, Brain, Clock];
const STEP_LABELS = [
  'Year group',
  'Subjects',
  'Exam board',
  'Dates & grades',
  'Your challenge',
  'Weekly commitment',
];

function deriveStartStep(p: Profile | null): number {
  if (!p) return 0;
  if (!p.year_group) return 0;
  if (!p.subjects || (Array.isArray(p.subjects) && p.subjects.length === 0)) return 1;
  if (!p.exam_board) return 2;
  if (!p.target_grades || Object.keys(p.target_grades).length === 0) return 3;
  if (!p.primary_struggle) return 4;
  return 5;
}

interface Props {
  userId: string;
  userEmail: string;
  existingProfile: Profile | null;
}

export function OnboardingShell({ userId, userEmail: _userEmail, existingProfile }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const analytics = useOnboardingAnalytics(userId);

  const [step, setStep] = useState(() => deriveStartStep(existingProfile));
  const [dir, setDir] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<OnboardingData>({
    year_group: (existingProfile?.year_group as YearGroup) ?? null,
    subjects: Array.isArray(existingProfile?.subjects) ? existingProfile.subjects as string[] : [],
    exam_board: (existingProfile?.exam_board as ExamBoard) ?? null,
    exam_dates: (existingProfile?.exam_dates as Record<string, string>) ?? {},
    target_grades: (existingProfile?.target_grades as Record<string, TargetGrade>) ?? {},
    primary_struggle: (existingProfile?.primary_struggle as PrimaryStruggle) ?? null,
    weekly_revision_hours: existingProfile?.weekly_revision_hours ?? 15,
  });

  useEffect(() => {
    analytics.trackStepEnter(step);
  }, [step, analytics]);

  const update = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setError(null);
    },
    []
  );

  const handleYearGroup = useCallback((v: YearGroup) => update('year_group', v), [update]);
  const handleSubjects = useCallback((v: string[]) => update('subjects', v), [update]);
  const handleExamBoard = useCallback((v: ExamBoard) => update('exam_board', v), [update]);
  const handleExamDates = useCallback((v: Record<string, string>) => update('exam_dates', v), [update]);
  const handleTargetGrades = useCallback((v: Record<string, TargetGrade>) => update('target_grades', v), [update]);
  const handlePrimaryStruggle = useCallback((v: PrimaryStruggle) => update('primary_struggle', v), [update]);
  const handleWeeklyHours = useCallback((v: number) => update('weekly_revision_hours', v), [update]);

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return data.year_group !== null;
      case 1: return data.subjects.length > 0;
      case 2: return data.exam_board !== null;
      case 3: {
        const hasDate = data.subjects.every(s => data.exam_dates[s]);
        const hasGrade = data.subjects.every(s => data.target_grades[s]);
        return hasDate && hasGrade;
      }
      case 4: return data.primary_struggle !== null;
      case 5: return data.weekly_revision_hours >= 5 && data.weekly_revision_hours <= 40;
      default: return false;
    }
  };

  const persistProfile = async (fields: Record<string, unknown>) => {
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (!existing) {
      const { error: insertErr } = await supabase
        .from('profiles')
        .insert({ id: userId, ...fields });
      if (insertErr) throw insertErr;
    } else {
      const { error: updateErr } = await supabase
        .from('profiles')
        .update(fields)
        .eq('id', userId);
      if (updateErr) throw updateErr;
    }
  };

  const next = async () => {
    if (!canProceed()) return;
    setSaving(true);
    setError(null);

    try {
      if (step === TOTAL_STEPS - 1) {
        await persistProfile({
          ...data,
          onboarding_completed: true,
        });
        await analytics.trackStepComplete(step, { final: true });
        router.push('/dashboard');
        return;
      }

      await analytics.trackStepComplete(step);
      setDir(1);
      setStep((s) => s + 1);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const back = () => {
    if (step > 0) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  };

  const Icon = STEP_ICONS[step];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            alevel<span className="text-[var(--accent-2)]">mentor</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-dimmed)]">
              {STEP_LABELS[step]}
            </span>
            <ThemeToggle />
          </div>
        </header>

        {/* Progress bar */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[var(--text-dimmed)]">
              Step {step + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-[11px] font-medium text-[var(--text-dimmed)]">
              {Math.round(((step + 1) / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--glass-bg)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'var(--shimmer-btn-bg)' }}
              initial={false}
              animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Main content: two-panel layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 px-6 py-8 max-w-7xl mx-auto w-full">
          {/* Left: Step form */}
          <div className="flex flex-col justify-center max-w-[520px] mx-auto w-full lg:max-w-none">
            <div
              className="relative overflow-hidden rounded-[20px] p-8"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="absolute inset-0 rounded-[20px] ring-1 ring-inset pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px var(--card-ring)' }}
              />

              {/* Step icon */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center border"
                  style={{
                    background: 'color-mix(in srgb, var(--accent-2) 15%, transparent)',
                    borderColor: 'color-mix(in srgb, var(--accent-2) 30%, transparent)',
                    boxShadow: 'var(--accent-glow)',
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--accent-2)' }} />
                </div>
              </div>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 && <StepYearGroup value={data.year_group} onChange={handleYearGroup} />}
                  {step === 1 && <StepSubjects value={data.subjects} onChange={handleSubjects} />}
                  {step === 2 && <StepExamBoard value={data.exam_board} onChange={handleExamBoard} />}
                  {step === 3 && (
                    <StepExamDatesGrades
                      subjects={data.subjects}
                      examDates={data.exam_dates}
                      targetGrades={data.target_grades}
                      onDatesChange={handleExamDates}
                      onGradesChange={handleTargetGrades}
                    />
                  )}
                  {step === 4 && <StepStruggle value={data.primary_struggle} onChange={handlePrimaryStruggle} />}
                  {step === 5 && <StepWeeklyHours value={data.weekly_revision_hours} onChange={handleWeeklyHours} />}
                </motion.div>
              </AnimatePresence>

              {error && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-xs text-red-400 text-center">{error}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="flex items-center gap-2 text-sm font-medium hover:text-[var(--text-primary)] disabled:opacity-0 disabled:pointer-events-none transition-all"
                  style={{ color: 'var(--text-dimmed)' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={next}
                  disabled={!canProceed() || saving}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100"
                  style={{
                    background: 'var(--shimmer-btn-bg)',
                    boxShadow: 'var(--shimmer-btn-shadow)',
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 animate-shimmer-sweep"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : step === TOTAL_STEPS - 1 ? (
                      'Finish setup'
                    ) : (
                      <>
                        Continue <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Analytics panel */}
          <div className="hidden lg:flex items-center justify-center">
            <AnalyticsPanel step={step} data={data} />
          </div>
        </div>

        {/* Mobile: Collapsed analytics below step on small screens */}
        <div className="lg:hidden px-6 pb-8">
          <AnalyticsPanel step={step} data={data} mobile />
        </div>
      </div>
    </div>
  );
}
