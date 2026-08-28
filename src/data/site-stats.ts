/**
 * SLOTS SPORTSWEAR — Site Statistics & Social Proof Data
 *
 * Sourced strictly from:
 * 1. 01-project-requirements.md (Section 9: Social Proof / Capability Numbers)
 * 2. TASK-13 Specifications
 *
 * STRICT CONTENT RULE:
 * Only publish metrics that are explicitly verified and documented in the project source.
 * Never invent or exaggerate metrics (e.g. employee count, factory sq ft, delivery rate guarantees).
 */

export interface CapabilityMetric {
  id: string;
  value: string;
  numericValue: number;
  suffix?: string;
  label: string;
  description: string;
  icon: "Clock" | "Users" | "Factory" | "Layers";
  verified: boolean;
  published: boolean;
}

export const CAPABILITY_METRICS: CapabilityMetric[] = [
  {
    id: "years-experience",
    value: "5+",
    numericValue: 5,
    suffix: "+",
    label: "YEARS EXPERIENCE",
    description: "Industry expertise in export custom sportswear production and development.",
    icon: "Clock",
    verified: true,
    published: true,
  },
  {
    id: "global-clients",
    value: "145+",
    numericValue: 145,
    suffix: "+",
    label: "GLOBAL CLIENTS",
    description: "International brands, sports teams, clubs, and private labels served worldwide.",
    icon: "Users",
    verified: true,
    published: true,
  },
  {
    id: "monthly-production",
    value: "10K+",
    numericValue: 10,
    suffix: "K+",
    label: "MONTHLY PRODUCTION",
    description: "Scalable monthly manufacturing volume for small to high-volume orders.",
    icon: "Factory",
    verified: true,
    published: true,
  },
  {
    id: "employees",
    value: "50+",
    numericValue: 50,
    suffix: "+",
    label: "EMPLOYEES",
    description: "Dedicated production craftsmen, pattern makers, QC specialists, and staff.",
    icon: "Users",
    verified: true,
    published: true,
  },
];

export const SOCIAL_PROOF_CONTENT = {
  eyebrow: "BUILT FOR B2B",
  headline: "CAPABILITY YOU CAN COUNT ON.",
  supportingText:
    "Verified business and production indicators presented with clarity for international sportswear brands and commercial buyers.",
};

export function getPublishedMetrics(): CapabilityMetric[] {
  return CAPABILITY_METRICS.filter((m) => m.published && m.verified);
}
