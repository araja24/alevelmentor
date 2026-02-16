import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    children: React.ReactNode;
    className?: string;
}

export function ShimmerButton({ href, children, className, disabled, ...props }: ShimmerButtonProps) {
    const baseStyles = cn(
        "shimmer-btn group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300",
        "hover:scale-[1.03] active:scale-[0.98]",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none",
        className
    );
    const shadowStyle = {
        backgroundColor: "var(--shimmer-btn-bg)",
        boxShadow: "var(--shimmer-btn-shadow)",
    } as React.CSSProperties;

    const shimmer = (
        <span
            className="pointer-events-none absolute inset-0 animate-shimmer-sweep"
            style={{
                background:
                    "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)",
            }}
        />
    );

    const content = (
        <>
            {shimmer}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={baseStyles} style={shadowStyle}>
                {content}
            </Link>
        );
    }

    return (
        <button className={baseStyles} style={shadowStyle} {...props}>
            {content}
        </button>
    );
}
