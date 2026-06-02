import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-brand text-white shadow-[0_14px_28px_-14px_rgba(234,88,12,0.85)] hover:bg-brand-dark",
        secondary: "bg-slate-900 text-amber-50 ring-1 ring-slate-800 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-200 dark:hover:bg-white",
        ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
        outline: "ring-1 ring-amber-300/70 text-amber-900 hover:bg-amber-50 dark:ring-amber-400/50 dark:text-amber-200 dark:hover:bg-amber-400/10",
        danger: "bg-rose-600 text-white hover:bg-rose-700",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
