'use client';

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export function StepWeeklyHours({ value, onChange }: Props) {
  const hoursPerDay = (value / 7).toFixed(1);

  const status =
    value < 10 ? 'low' : value <= 25 ? 'optimal' : 'high';

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>How many hours per week can you revise?</h2>
      <p className="text-sm text-muted mb-8">Be realistic. We&apos;ll never overload you.</p>

      <p className="text-5xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{value}h</p>
      <p className="text-sm text-muted mb-8">
        That&apos;s about{' '}
        <span className="font-medium" style={{ color: 'var(--accent-2)' }}>{hoursPerDay} hours per day</span>
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
            background: `linear-gradient(to right, var(--accent-2) 0%, var(--accent-2-dark) ${((value - 5) / 35) * 100}%, var(--glass-bg) ${((value - 5) / 35) * 100}%, var(--glass-bg) 100%)`,
          }}
        />
        <div className="flex justify-between mt-2 text-xs text-[var(--text-dimmed)]">
          <span>5h</span>
          <span>40h</span>
        </div>
      </div>

      {status === 'low' && (
        <p className="mt-4 text-xs text-amber-400/80">Less than 10 hours may limit your progress.</p>
      )}
      {status === 'optimal' && (
        <p className="mt-4 text-xs text-emerald-400/80">Great range — optimal for consistent progress.</p>
      )}
      {status === 'high' && (
        <p className="mt-4 text-xs text-red-400/80">Over 30 hours risks burnout. Make sure you take breaks.</p>
      )}
    </div>
  );
}
