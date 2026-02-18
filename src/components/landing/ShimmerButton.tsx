import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    children: React.ReactNode;
    className?: string;
}

const shadowStyle = {
    backgroundColor: "var(--shimmer-btn-bg)",
    boxShadow: "var(--shimmer-btn-shadow)",
} as React.CSSProperties;

export function ShimmerButton({ href, children, className, disabled, ...props }: ShimmerButtonProps) {
    const baseStyles = cn(
        "shimmer-btn group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 text-base sm:text-[18px] font-semibold text-white transition-all duration-300",
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

    const content = (
        <>
            {shimmer}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
    );

    if (href) {
        return (
            <Button
                variant="unstyled"
                size="unstyled"
                asChild
                className={baseStyles}
                style={shadowStyle}
                {...props}
            >
                <Link href={href}>{content}</Link>
            </Button>
        );
    }

    return (
        <Button
            variant="unstyled"
            size="unstyled"
            className={baseStyles}
            style={shadowStyle}
            disabled={disabled}
            {...props}
        >
            {content}
        </Button>
    );
}
