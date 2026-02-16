'use client';

import { OptionCard } from '../OptionCard';

const SUBJECTS = [
  { name: 'Mathematics', enabled: true },
  { name: 'Further Maths', enabled: false },
  { name: 'Physics', enabled: false },
  { name: 'Chemistry', enabled: false },
  { name: 'Biology', enabled: false },
  { name: 'Economics', enabled: false },
];

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

export function StepSubjects({ value, onChange }: Props) {
  const toggle = (name: string) => {
    if (value.includes(name)) onChange(value.filter((s) => s !== name));
    else onChange([...value, name]);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>What are your A-Level subjects?</h2>
      <p className="text-sm text-muted mb-6">Select your subjects. More coming soon.</p>
      <div className="grid grid-cols-2 gap-3">
        {SUBJECTS.map((s) => (
          <OptionCard
            key={s.name}
            selected={value.includes(s.name)}
            onClick={() => s.enabled && toggle(s.name)}
            disabled={!s.enabled}
          >
            <p className="text-sm font-medium text-center" style={{ color: 'var(--text-primary)' }}>{s.name}</p>
            {!s.enabled && (
              <p className="text-[10px] text-[var(--text-dimmed)] text-center mt-1 uppercase tracking-wider">Coming soon</p>
            )}
          </OptionCard>
        ))}
      </div>
    </div>
  );
}
