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
        ${selected
          ? 'border-[var(--accent-2)]/50 shadow-[var(--accent-glow)]'
          : disabled
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:bg-[var(--surface-subtle)] hover:border-[var(--glass-border-strong)]'
        }
      `}
      style={{
        background: selected ? 'color-mix(in srgb, var(--accent-2) 15%, transparent)' : 'var(--glass-bg)',
        borderColor: selected ? undefined : 'var(--glass-border)',
      }}
    >
      {children}
    </button>
  );
}
