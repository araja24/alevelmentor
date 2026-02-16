'use client';

import type { TargetGrade } from '@/types/db';

const GRADES: TargetGrade[] = ['A*', 'A', 'B', 'C'];

interface Props {
  subjects: string[];
  examDates: Record<string, string>;
  targetGrades: Record<string, TargetGrade>;
  onDatesChange: (v: Record<string, string>) => void;
  onGradesChange: (v: Record<string, TargetGrade>) => void;
}

export function StepExamDatesGrades({
  subjects,
  examDates,
  targetGrades,
  onDatesChange,
  onGradesChange,
}: Props) {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 24);
  const max = maxDate.toISOString().split('T')[0];

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">Exam dates & target grades</h2>
      <p className="text-sm text-white/50 mb-6">Set a date and target for each subject.</p>

      <div className="space-y-6">
        {subjects.map((subject) => (
          <div
            key={subject}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left"
          >
            <p className="text-sm font-semibold text-white mb-4">{subject}</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-white/60 mb-1.5 block">Exam date</label>
                <input
                  type="date"
                  value={examDates[subject] ?? ''}
                  min={today}
                  max={max}
                  onChange={(e) => onDatesChange({ ...examDates, [subject]: e.target.value })}
                  className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white focus:border-[#5a35f8]/50 focus:bg-[#5a35f8]/5 focus:outline-none focus:ring-1 focus:ring-[#5a35f8]/50 transition-all [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-white/60 mb-1.5 block">Target grade</label>
                <div className="grid grid-cols-4 gap-2">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onGradesChange({ ...targetGrades, [subject]: g })}
                      className={`
                        py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border
                        ${
                          targetGrades[subject] === g
                            ? 'bg-[#5a35f8]/15 border-[#5a35f8]/50 text-white shadow-[0_0_16px_rgba(90,53,248,0.15)]'
                            : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06] hover:border-white/20'
                        }
                      `}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
