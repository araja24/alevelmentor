'use client';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function OptionCard({ selected, onClick, disabled, children }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left p-4 rounded-xl border transition-all duration-200
        ${
          selected
            ? 'bg-[#5a35f8]/15 border-[#5a35f8]/50 shadow-[0_0_20px_rgba(90,53,248,0.15)]'
            : disabled
              ? 'bg-white/[0.02] border-white/5 opacity-40 cursor-not-allowed'
              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
        }
      `}
    >
      {children}
    </button>
  );
}
