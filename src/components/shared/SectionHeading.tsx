import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  headline: string;
  supportingText?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  headline,
  supportingText,
  align = "center",
  theme = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {/* Eyebrow label */}
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon-grey/80 border border-light-grey/10 text-xs font-sora font-bold uppercase tracking-widest-brand text-electric-lime mb-3 sm:mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" />
          <span>{eyebrow}</span>
        </div>
      )}

      {/* Semantic H2 Headline */}
      <h2
        className={cn(
          "font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.12]",
          isDark ? "text-slots-white" : "text-slots-black"
        )}
      >
        {headline}
      </h2>

      {/* Supporting Text */}
      {supportingText && (
        <p
          className={cn(
            "font-inter text-sm sm:text-base md:text-lg max-w-2xl mt-3 sm:mt-4 leading-relaxed",
            isDark ? "text-technical-grey" : "text-carbon-grey"
          )}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
}
