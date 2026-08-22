import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MarqueeLogoItem {
  id: string;
  name: string;
  shortName?: string;
  logo: string;
  altText: string;
  documentPath?: string;
}

interface InfiniteLogoMarqueeProps {
  items: MarqueeLogoItem[];
  direction?: "left" | "right";
  speedSeconds?: number;
  className?: string;
  logoHeightClass?: string;
  gapClass?: string;
  showLabels?: boolean;
  theme?: "dark" | "light";
  labelTheme?: "dark" | "light";
  pauseOnHover?: boolean;
}

/**
 * InfiniteLogoMarquee — Production-ready reusable horizontal logo marquee
 *
 * Core Features:
 * 1. Clean standalone floating logos without individual container backgrounds, cards, shadows, or borders.
 * 2. Continuous linear movement in configurable directions: "left" (default) or "right" (right-to-left).
 * 3. Duplicated track (4x) ensuring seamless infinite loop across all viewport widths.
 * 4. Transparent fade edge gradient masks corresponding to section theme (dark or light).
 * 5. Full native accessibility with prefers-reduced-motion fallback and decorative aria-hidden tags.
 *
 * Shared between:
 * - TASK 09: OUR CERTIFICATES
 * - TASK 10: SHIPPING METHODS
 * - TASK 11: PAYMENT METHODS
 */
export function InfiniteLogoMarquee({
  items,
  direction = "left",
  speedSeconds = 32,
  className,
  logoHeightClass = "h-14 sm:h-16 md:h-20",
  gapClass = "gap-12 sm:gap-16 lg:gap-24",
  showLabels = true,
  theme = "dark",
  labelTheme = "dark",
  pauseOnHover = false,
}: InfiniteLogoMarqueeProps) {
  if (!items || items.length === 0) return null;

  // Quadruple items to guarantee track is much wider than any 4K screen
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const isDark = theme === "dark";
  const isLabelDark = labelTheme === "dark";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none py-4 sm:py-6",
        className
      )}
      aria-label="Continuous Logistical & Certification Credentials Marquee"
    >
      {/* Left and Right Edge Fade Masks */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 z-10 bg-gradient-to-r",
          isDark
            ? "from-slots-black via-slots-black/80 to-transparent"
            : "from-slots-white via-slots-white/80 to-transparent"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 z-10 bg-gradient-to-l",
          isDark
            ? "from-slots-black via-slots-black/80 to-transparent"
            : "from-slots-white via-slots-white/80 to-transparent"
        )}
        aria-hidden="true"
      />

      {/* Marquee Track Container */}
      <div
        className={cn(
          direction === "right"
            ? "animate-marquee-infinite-reverse"
            : "animate-marquee-infinite",
          "flex items-center",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${speedSeconds}s`,
        }}
      >
        {/* Sequence Set 1 */}
        <div className={cn("flex items-center shrink-0", gapClass, "pr-12 sm:pr-16 lg:pr-24")}>
          {duplicatedItems.map((item, index) => {
            const isDecorativeDuplicate = index >= items.length;
            return (
              <div
                key={`${item.id}-${index}`}
                aria-hidden={isDecorativeDuplicate ? "true" : undefined}
                className="flex flex-col items-center justify-center shrink-0 group"
              >
                {/* Standalone Logo Wrapper (Clean transparent floating logo without card boxes/shadows) */}
                <div
                  className={cn(
                    "relative flex items-center justify-center bg-transparent transition-transform duration-300 group-hover:scale-105",
                    logoHeightClass
                  )}
                >
                  <Image
                    src={item.logo}
                    alt={item.altText}
                    width={200}
                    height={80}
                    className={cn(
                      "w-auto max-h-full object-contain filter transition-all duration-300",
                      isDark
                        ? "brightness-95 contrast-105 group-hover:brightness-110"
                        : "brightness-100 contrast-100 group-hover:opacity-90"
                    )}
                    loading="lazy"
                  />
                </div>

                {/* Accessible Label */}
                {showLabels && (
                  <span
                    className={cn(
                      "font-sora text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-3 text-center max-w-[180px] sm:max-w-[220px] truncate transition-colors duration-200",
                      isLabelDark
                        ? "text-technical-grey group-hover:text-slots-white"
                        : "text-carbon-grey group-hover:text-slots-black"
                    )}
                  >
                    {item.shortName || item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Sequence Set 2 for seamless 50% loop */}
        <div
          className={cn("flex items-center shrink-0", gapClass, "pr-12 sm:pr-16 lg:pr-24")}
          aria-hidden="true"
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`dup-${item.id}-${index}`}
              className="flex flex-col items-center justify-center shrink-0 group"
            >
              {/* Standalone Logo Wrapper */}
              <div
                className={cn(
                  "relative flex items-center justify-center bg-transparent transition-transform duration-300 group-hover:scale-105",
                  logoHeightClass
                )}
              >
                <Image
                  src={item.logo}
                  alt={item.altText}
                  width={200}
                  height={80}
                  className={cn(
                    "w-auto max-h-full object-contain filter transition-all duration-300",
                    isDark
                      ? "brightness-95 contrast-105 group-hover:brightness-110"
                      : "brightness-100 contrast-100 group-hover:opacity-90"
                  )}
                  loading="lazy"
                />
              </div>

              {/* Accessible Label */}
              {showLabels && (
                <span
                  className={cn(
                    "font-sora text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-3 text-center max-w-[180px] sm:max-w-[220px] truncate transition-colors duration-200",
                    isLabelDark
                      ? "text-technical-grey group-hover:text-slots-white"
                      : "text-carbon-grey group-hover:text-slots-black"
                  )}
                >
                  {item.shortName || item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
