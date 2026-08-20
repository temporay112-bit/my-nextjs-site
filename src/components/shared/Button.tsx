import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sora font-bold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slots-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-electric-lime text-slots-black hover:bg-[#a8eb00] hover:shadow-cta-glow rounded-full",
      secondary:
        "bg-graphite text-slots-white hover:bg-carbon-grey rounded-full",
      outline:
        "border border-slots-black text-slots-black hover:bg-slots-black hover:text-slots-white rounded-full",
      ghost:
        "text-slots-black hover:bg-light-grey/60 rounded-full",
    };

    const sizeStyles = {
      sm: "text-xs tracking-wider px-4 py-2",
      md: "text-xs md:text-sm tracking-wider px-6 py-2.5 md:py-3",
      lg: "text-sm md:text-base tracking-wider px-8 py-3.5 md:py-4",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
