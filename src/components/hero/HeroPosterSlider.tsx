"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { HERO_SLIDES, type HeroSlide } from "@/data/hero";
import { cn } from "@/lib/utils";

interface HeroPosterSliderProps {
  onSlideChange?: (index: number) => void;
  className?: string;
}

const AUTOPLAY_INTERVAL = 5000;

export function HeroPosterSlider({ onSlideChange, className }: HeroPosterSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const onSlideChangeRef = useRef(onSlideChange);

  // Keep the onSlideChange ref in sync
  useEffect(() => {
    onSlideChangeRef.current = onSlideChange;
  }, [onSlideChange]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Pause when browser tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = (index + totalSlides) % totalSlides;
      setCurrentIndex(newIndex);
      onSlideChangeRef.current?.(newIndex);
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % totalSlides;
      onSlideChangeRef.current?.(next);
      return next;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + totalSlides) % totalSlides;
      onSlideChangeRef.current?.(next);
      return next;
    });
  }, [totalSlides]);

  // Autoplay — stable interval that only recreates when paused/hidden/motion changes
  useEffect(() => {
    if (isPaused || isTabHidden || prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, isTabHidden, prefersReducedMotion, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <div
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="SLOTS SPORTSWEAR Featured Categories"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative w-full h-full select-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime",
        className
      )}
    >
      {/* Slides Track */}
      <div
        className={cn(
          "flex w-full h-full transition-transform ease-out",
          prefersReducedMotion ? "duration-0" : "duration-700"
        )}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${totalSlides}: ${slide.title}`}
            aria-hidden={currentIndex !== index}
            className="relative w-full h-full flex-shrink-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              quality={95}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slots-black/90 via-slots-black/60 to-slots-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slots-black/90 via-transparent to-slots-black/40" />
          </div>
        ))}
      </div>

      {/* Numbered Indicators Bar at Bottom */}
      <div className="absolute bottom-6 md:bottom-10 left-4 right-4 md:left-8 md:right-8 z-30 flex items-center justify-center md:justify-end gap-3 md:gap-4 pointer-events-auto">
        <div className="flex items-center gap-2 md:gap-3 bg-slots-black/70 border border-light-grey/20 backdrop-blur-md px-3.5 py-2 md:px-5 md:py-2.5 rounded-full">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = currentIndex === idx;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={cn(
                  "group relative flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime",
                  isActive ? "text-slots-white" : "text-technical-grey hover:text-light-grey"
                )}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "font-sora text-xs md:text-sm font-bold transition-colors",
                    isActive ? "text-electric-lime" : "text-technical-grey group-hover:text-light-grey"
                  )}
                >
                  {slide.number}
                </span>

                <span className="hidden sm:inline font-inter text-[11px] uppercase tracking-wider font-semibold">
                  {slide.category.split(" ")[0]}
                </span>

                <div className="w-6 md:w-8 h-[2px] bg-carbon-grey/80 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full bg-electric-lime transition-all",
                      isActive ? "w-full duration-500" : "w-0 duration-200"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
