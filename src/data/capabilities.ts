export interface CapabilityModel {
  id: string;
  number: string;
  title: string;
  fullTitle: string;
  headline: string;
  description: string;
  benefits: string[];
  icon: "FilePenLine" | "Lightbulb" | "Tags";
  href: string;
  ctaLabel: string;
  published: boolean;
}

export const CAPABILITY_MODELS: CapabilityModel[] = [
  {
    id: "oem",
    number: "01",
    title: "OEM",
    fullTitle: "ORIGINAL EQUIPMENT MANUFACTURING",
    headline: "YOUR DESIGN. OUR MANUFACTURING.",
    description:
      "You provide your approved design, specifications or tech pack. SLOTS SPORTSWEAR manufactures the product according to the agreed requirements.",
    benefits: [
      "Buyer-supplied design",
      "Technical specification support",
      "Custom materials and construction",
      "Bulk production",
      "Quality control",
    ],
    icon: "FilePenLine",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
    published: true,
  },
  {
    id: "odm",
    number: "02",
    title: "ODM",
    fullTitle: "ORIGINAL DESIGN MANUFACTURING",
    headline: "FROM CONCEPT TO PRODUCT.",
    description:
      "Use SLOTS SPORTSWEAR product and development capabilities as a starting point for creating customized sportswear for your brand.",
    benefits: [
      "Product development",
      "Design adaptation",
      "Material selection",
      "Sampling",
      "Production",
    ],
    icon: "Lightbulb",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
    published: true,
  },
  {
    id: "private-label",
    number: "03",
    title: "PRIVATE LABEL",
    fullTitle: "YOUR BRAND. YOUR DETAILS.",
    headline: "BUILT FOR YOUR BRAND.",
    description:
      "Add approved brand elements to your garments and packaging so the finished products represent your own label.",
    benefits: [
      "Custom labels",
      "Hang tags",
      "Branding elements",
      "Packaging",
      "Private-label finishing",
    ],
    icon: "Tags",
    href: "/contact#quote",
    ctaLabel: "DISCUSS YOUR PROJECT",
    published: true,
  },
];

export const CAPABILITIES_SECTION_CONTENT = {
  eyebrow: "MANUFACTURING SOLUTIONS",
  headline: "YOUR BRAND. OUR MANUFACTURING.",
  supportingText:
    "Choose the production model that fits your project — OEM, ODM or Private Label.",
};
