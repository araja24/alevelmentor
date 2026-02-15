import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    children: React.ReactNode;
    className?: string;
}

export function ShimmerButton({ href, children, className, disabled, ...props }: ShimmerButtonProps) {
    const baseStyles = cn(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#5a35f8] px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300",
        "shadow-[0_0_24px_rgba(90,53,248,0.4)] hover:shadow-[0_0_40px_rgba(90,53,248,0.55)]",
        "hover:scale-[1.03] active:scale-[0.98]",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none",
        className
    );

    const shimmer = (
        <span
            className="pointer-events-none absolute inset-0 animate-shimmer-sweep"
            style={{
                background:
                    "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)",
            }}
        />
    );

    if (href) {
        return (
            <Link href={href} className={baseStyles}>
                {shimmer}
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </Link>
        );
    }

    return (
        <button className={baseStyles} {...props}>
            {shimmer}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
}
