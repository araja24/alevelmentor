import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)]/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--text-primary)] text-[var(--bg-primary)] hover:brightness-110 hover:scale-[1.03] shadow-sm rounded-[14px]",
        outline:
          "border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl text-[var(--text-primary)] hover:bg-white/[0.06] hover:border-white/[0.14] hover:scale-[1.02] rounded-[14px]",
        ghost:
          "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04] rounded-[14px]",
        gradient:
          "btn-shine bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-3)] text-white shadow-[0_0_40px_-10px_var(--accent-1)] hover:shadow-[0_0_50px_-8px_var(--accent-2)] hover:scale-[1.03] hover:brightness-110 rounded-[14px]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 py-3.5 text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const mergedClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<any>,
        {
          className: cn(
            mergedClassName,
            (children as React.ReactElement<any>).props.className
          ),
          ref,
          ...props,
        } as any
      );
    }

    return (
      <button
        className={mergedClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
