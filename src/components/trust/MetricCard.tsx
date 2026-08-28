"use client";

import React, { useEffect, useRef, useState } from "react";
import { Clock, Users, Factory, Layers, LucideProps } from "lucide-react";
import type { CapabilityMetric } from "@/data/site-stats";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<CapabilityMetric["icon"], React.ComponentType<LucideProps>> = {
  Clock,
  Users,
  Factory,
  Layers,
};

interface MetricCardProps {
  metric: CapabilityMetric;
  index: number;
  className?: string;
}

export function MetricCard({ metric, index, className }: MetricCardProps) {
  const IconComponent = ICON_MAP[metric.icon] ?? Factory;
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(metric.numericValue);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1200; // ms
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;
          const increment = metric.numericValue / steps;

          const timer = setInterval(() => {
            currentStep += 1;
            if (currentStep >= steps) {
              setCount(metric.numericValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(increment * currentStep));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [hasAnimated, metric.numericValue]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col justify-between p-4 sm:p-7 rounded-2xl h-full",
        "bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm",
        "hover:border-[#BFDBFE] hover:shadow-md",
        "transition-all duration-300",
        className
      )}
    >
      <div>
        {/* Decorative top-right subtle index */}
        <span
          className="absolute top-3 right-4 sm:top-5 sm:right-6 font-barlow text-2xl sm:text-3xl font-black text-[#E5E7EB] select-none group-hover:text-electric-lime transition-colors duration-300"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Metric Icon */}
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] group-hover:bg-electric-lime group-hover:border-electric-lime group-hover:text-[#050505] transition-all duration-300 mb-3 sm:mb-5 shrink-0"
          aria-hidden="true"
        >
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
        </div>

        {/* Large Numerical Display */}
        <div className="flex items-baseline gap-0.5 sm:gap-1">
          <span className="font-sora text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight leading-none">
            {hasAnimated ? count : metric.numericValue}
          </span>
          {metric.suffix && (
            <span className="font-sora text-xl sm:text-3xl lg:text-4xl font-extrabold text-electric-lime leading-none">
              {metric.suffix}
            </span>
          )}
        </div>

        {/* Metric Label */}
        <h3 className="font-sora text-[11px] sm:text-xs md:text-sm font-bold text-[#171717] uppercase tracking-technical mt-2 sm:mt-3 line-clamp-1">
          {metric.label}
        </h3>

        {/* Metric Supporting Description */}
        <p className="font-inter text-[10px] sm:text-xs text-[#4B5563] leading-relaxed mt-1 sm:mt-1.5 line-clamp-2 sm:line-clamp-none">
          {metric.description}
        </p>
      </div>

      {/* Verified Data Indicator */}
      <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-[#F3F4F6] flex items-center justify-between text-[9.5px] sm:text-[11px] font-inter text-[#6B7280]">
        <span>Verified Indicator</span>
        <span className="w-1.5 h-1.5 rounded-full bg-electric-lime" aria-hidden="true" />
      </div>
    </div>
  );
}
