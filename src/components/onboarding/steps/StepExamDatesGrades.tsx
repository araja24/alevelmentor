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
      <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Exam dates & target grades</h2>
      <p className="text-sm text-muted mb-6">Set a date and target for each subject.</p>

      <div className="space-y-6">
        {subjects.map((subject) => (
          <div
            key={subject}
            className="rounded-xl border p-5 text-left"
            style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}
          >
            <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{subject}</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Exam date</label>
                <input
                  type="date"
                  value={examDates[subject] ?? ''}
                  min={today}
                  max={max}
                  onChange={(e) => onDatesChange({ ...examDates, [subject]: e.target.value })}
                  className="w-full h-11 rounded-xl border px-4 text-sm focus:outline-none focus:ring-1 transition-all [color-scheme:dark]"
                  style={{
                    borderColor: 'var(--glass-border)',
                    background: 'var(--glass-bg)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Target grade</label>
                <div className="grid grid-cols-4 gap-2">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onGradesChange({ ...targetGrades, [subject]: g })}
                      className="py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border"
                      style={{
                        background: targetGrades[subject] === g ? 'color-mix(in srgb, var(--accent-2) 15%, transparent)' : 'var(--glass-bg)',
                        borderColor: targetGrades[subject] === g ? 'color-mix(in srgb, var(--accent-2) 50%, transparent)' : 'var(--glass-border)',
                        color: 'var(--text-primary)',
                        boxShadow: targetGrades[subject] === g ? 'var(--accent-glow)' : undefined,
                      }}
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
