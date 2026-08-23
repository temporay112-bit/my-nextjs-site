import React from "react";
import type { Metadata } from "next";
import { ManufacturingHero } from "@/components/manufacturing/ManufacturingHero";
import { ManufacturingProcess } from "@/components/manufacturing/ManufacturingProcess";
import { ManufacturingEnvironmentSection } from "@/components/manufacturing/ManufacturingEnvironmentSection";
import { ManufacturingQCSection } from "@/components/manufacturing/ManufacturingQCSection";
import { ManufacturingCta } from "@/components/manufacturing/ManufacturingCta";

export const metadata: Metadata = {
  title: "Sportswear Manufacturing Process | SLOTS SPORTSWEAR",
  description:
    "Discover our 10-step sportswear manufacturing process: tech pack consultation, sampling, fabric sourcing, precision cutting, assembly stitching, QC, and global export from Sialkot.",
  alternates: {
    canonical: "/manufacturing",
  },
  openGraph: {
    title: "Sportswear Manufacturing Process | SLOTS SPORTSWEAR",
    description:
      "From concept to production: Explore our authentic 10-step B2B sportswear manufacturing process, quality control standards, and Sialkot facility environment.",
    url: "https://slotssportswear.com/manufacturing",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/factory/facility-main.jpg",
        width: 1200,
        height: 630,
        alt: "SLOTS SPORTSWEAR 10-Step Apparel Manufacturing Process & Sialkot Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sportswear Manufacturing Process | SLOTS SPORTSWEAR",
    description:
      "Explore our 10-step B2B sportswear manufacturing workflow from tech pack consultation to quality control and worldwide export.",
    images: ["/images/factory/facility-main.jpg"],
  },
};

export default function ManufacturingPage() {
  const manufacturingPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sportswear Manufacturing Process | SLOTS SPORTSWEAR",
    url: "https://slotssportswear.com/manufacturing",
    description:
      "Comprehensive 10-step sportswear manufacturing process engineered for international B2B clients from tech pack review to shipping.",
    publisher: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      url: "https://slotssportswear.com",
      logo: "https://slotssportswear.com/images/logo.png",
    },
    mainEntity: {
      "@type": "HowTo",
      name: "10-Step Custom Sportswear Manufacturing Process",
      description:
        "End-to-end B2B sportswear production workflow from initial consultation to final international export shipment.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Consultation & Requirements",
          text: "Review buyer product requirements, category, quantities, technical specifications, and project objectives.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Product Development & Sampling",
          text: "Review technical requirements and develop samples for product construction, fit, and specification sign-off.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Fabric & Trims Sourcing",
          text: "Coordinate approved fabrics, colors, trims, labels, and performance components required for production.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Production Preparation",
          text: "Prepare technical markers, specification sheets, material allocation, and assembly line scheduling.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Precision Cutting",
          text: "Prepare and cut fabric panels according to approved garment specifications and graded size patterns.",
        },
        {
          "@type": "HowToStep",
          position: 6,
          name: "Sewing & Assembly",
          text: "Assemble garment components using specialized flatlock, overlock, and twin-needle athletic stitching.",
        },
        {
          "@type": "HowToStep",
          position: 7,
          name: "Customization & Branding",
          text: "Apply approved branding requirements including labels, sublimation printing, embroidery, and private-label hang tags.",
        },
        {
          "@type": "HowToStep",
          position: 8,
          name: "Quality Control",
          text: "Inspect materials, measurements, seam strength, workmanship, and order requirements through multi-stage QC.",
        },
        {
          "@type": "HowToStep",
          position: 9,
          name: "Finishing & Packing",
          text: "Complete steam pressing, folding, barcode labeling, and individual polybag packaging.",
        },
        {
          "@type": "HowToStep",
          position: 10,
          name: "Shipping & Export",
          text: "Prepare completed bulk orders for customs clearance and international export handover.",
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://slotssportswear.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Manufacturing",
        item: "https://slotssportswear.com/manufacturing",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturingPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="w-full bg-slots-black min-h-screen text-slots-white">
        <ManufacturingHero />
        <ManufacturingProcess />
        <ManufacturingEnvironmentSection />
        <ManufacturingQCSection />
        <ManufacturingCta />
      </main>
    </>
  );
}
