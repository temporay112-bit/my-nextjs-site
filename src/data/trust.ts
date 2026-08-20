export interface TrustBadge {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "ShieldCheck" | "Layers3" | "Clock3" | "Globe2";
}

export const TRUST_BADGES: TrustBadge[] = [
  {
    id: "premium-quality",
    number: "01",
    title: "PREMIUM QUALITY",
    description:
      "Quality-focused production with controlled manufacturing and finishing processes.",
    icon: "ShieldCheck",
  },
  {
    id: "low-moq",
    number: "02",
    title: "LOW MOQ",
    description:
      "Flexible minimum-order support for qualifying custom production projects.",
    icon: "Layers3",
  },
  {
    id: "on-time-delivery",
    number: "03",
    title: "ON-TIME DELIVERY",
    description:
      "Production planning and coordination designed around committed order timelines.",
    icon: "Clock3",
  },
  {
    id: "global-export",
    number: "04",
    title: "GLOBAL EXPORT",
    description:
      "B2B sportswear production prepared for international shipment and export.",
    icon: "Globe2",
  },
];
