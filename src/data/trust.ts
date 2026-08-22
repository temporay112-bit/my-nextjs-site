/**
 * SLOTS SPORTSWEAR — Trust & Why Choose Data
 *
 * Combines:
 *  1. TrustBadge / TRUST_BADGES  — used by TrustBadges section (TASK 03)
 *  2. WhyChoosePoint / WHY_CHOOSE_POINTS — used by WhyChoose section (TASK 12)
 *
 * STRICT CONTENT RULE: Only publish content supported by approved project
 * information. Do not invent metrics, certifications, or claims.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TASK 03 — TRUST BADGES
// ─────────────────────────────────────────────────────────────────────────────

export interface TrustBadge {
  id: string;
  number: string;
  icon: "ShieldCheck" | "Layers3" | "Clock3" | "Globe2";
  title: string;
  description: string;
}

export const TRUST_BADGES: TrustBadge[] = [
  {
    id: "premium-quality",
    number: "01",
    icon: "ShieldCheck",
    title: "PREMIUM QUALITY",
    description: "Structured quality control across every stage of production.",
  },
  {
    id: "low-moq",
    number: "02",
    icon: "Layers3",
    title: "LOW MOQ",
    description: "Accessible minimum order quantities for B2B brand development.",
  },
  {
    id: "on-time-delivery",
    number: "03",
    icon: "Clock3",
    title: "ON-TIME DELIVERY",
    description: "Production timelines coordinated with verified international shipping.",
  },
  {
    id: "global-export",
    number: "04",
    icon: "Globe2",
    title: "GLOBAL EXPORT",
    description: "B2B manufacturing structured for international buyers.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TASK 12 — WHY CHOOSE SLOTS SPORTSWEAR?
// ─────────────────────────────────────────────────────────────────────────────

export interface WhyChoosePoint {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Lucide icon component name */
  icon: string;
  /** true = rendered publicly. All 8 are approved per project brief. */
  published: boolean;
}

export const WHY_CHOOSE_POINTS: WhyChoosePoint[] = [
  {
    id: "manufacturing-expertise",
    number: "01",
    title: "MANUFACTURING EXPERTISE",
    description:
      "Custom sportswear manufacturing focused on B2B production requirements and brand-specific product development.",
    icon: "Factory",
    published: true,
  },
  {
    id: "custom-product-development",
    number: "02",
    title: "CUSTOM PRODUCT DEVELOPMENT",
    description:
      "Work from your tech pack, design specifications or approved product requirements.",
    icon: "PenTool",
    published: true,
  },
  {
    id: "quality-control",
    number: "03",
    title: "QUALITY CONTROL",
    description:
      "Structured inspection and quality-focused production across materials, workmanship and finished garments.",
    icon: "ShieldCheck",
    published: true,
  },
  {
    id: "private-label",
    number: "04",
    title: "PRIVATE LABEL CAPABILITIES",
    description:
      "Approved options for custom labels, branding details, hang tags and packaging.",
    icon: "Tags",
    published: true,
  },
  {
    id: "flexible-range",
    number: "05",
    title: "FLEXIBLE PRODUCT RANGE",
    description:
      "Support for multiple sportswear categories and customised B2B product requirements.",
    icon: "Layers3",
    published: true,
  },
  {
    id: "international-service",
    number: "06",
    title: "INTERNATIONAL B2B SERVICE",
    description:
      "Production and communication structured for international buyers and export orders.",
    icon: "Globe2",
    published: true,
  },
  {
    id: "clear-communication",
    number: "07",
    title: "CLEAR COMMUNICATION",
    description:
      "Keep project requirements, production updates and order coordination organised throughout the process.",
    icon: "MessageCircleMore",
    published: true,
  },
  {
    id: "production-visibility",
    number: "08",
    title: "PRODUCTION VISIBILITY",
    description:
      "Authentic manufacturing evidence gives buyers greater confidence in how products are developed and produced.",
    icon: "Eye",
    published: true,
  },
];

export function getPublishedWhyChoosePoints(): WhyChoosePoint[] {
  return WHY_CHOOSE_POINTS.filter((p) => p.published);
}
