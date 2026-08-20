import React from "react";
import { Button } from "@/components/shared/Button";
import { PRIMARY_CTA } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface HeaderCTAProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function HeaderCTA({ className, size = "md", fullWidth = false }: HeaderCTAProps) {
  return (
    <Button
      variant="primary"
      size={size}
      href={PRIMARY_CTA.href}
      fullWidth={fullWidth}
      className={cn("shadow-sm hover:shadow-cta-glow transition-all duration-200", className)}
      aria-label="Get a Custom Sportswear Quote"
    >
      {PRIMARY_CTA.label}
    </Button>
  );
}
