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
      <h2 className="text-xl font-semibold text-white mb-2">How many hours per week can you revise?</h2>
      <p className="text-sm text-white/50 mb-8">Be realistic. We&apos;ll never overload you.</p>

      <p className="text-5xl font-bold text-white mb-2">{value}h</p>
      <p className="text-sm text-white/50 mb-8">
        That&apos;s about{' '}
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
