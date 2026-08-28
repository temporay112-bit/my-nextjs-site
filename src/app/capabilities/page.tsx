import React from "react";
import type { Metadata } from "next";
import { CapabilitiesHero } from "@/components/capabilities/CapabilitiesHero";
import { CapabilityDeepDive } from "@/components/capabilities/CapabilityDeepDive";
import { ProductDevelopment } from "@/components/capabilities/ProductDevelopment";
import { QualityControlSection } from "@/components/capabilities/QualityControlSection";
import { CapabilitiesCta } from "@/components/capabilities/CapabilitiesCta";

export const metadata: Metadata = {
  title: "Sportswear Manufacturing Capabilities | OEM & ODM",
  description:
    "Explore SLOTS SPORTSWEAR OEM, ODM, product development, customization and B2B apparel manufacturing capabilities.",
  alternates: {
    canonical: "/capabilities",
  },
  openGraph: {
    title: "Sportswear Manufacturing Capabilities | OEM & ODM",
    description:
      "Explore SLOTS SPORTSWEAR OEM, ODM, product development, customization and B2B apparel manufacturing capabilities.",
    url: "https://slotsdesign.vercel.app/capabilities",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/factory/facility-main.jpg",
        width: 1200,
        height: 630,
        alt: "SLOTS SPORTSWEAR Manufacturing Capabilities & Production Lines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sportswear Manufacturing Capabilities | OEM & ODM",
    description:
      "Explore SLOTS SPORTSWEAR OEM, ODM, product development, customization and B2B apparel manufacturing capabilities.",
    images: ["/images/factory/facility-main.jpg"],
  },
};

export default function CapabilitiesPage() {
  // Schema.org Structured Data for Capabilities Page
  const capabilitiesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sportswear Manufacturing Capabilities | OEM & ODM",
    url: "https://slotsdesign.vercel.app/capabilities",
    description:
      "Explore SLOTS SPORTSWEAR OEM, ODM, product development, customization and B2B apparel manufacturing capabilities.",
    publisher: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      url: "https://slotsdesign.vercel.app",
      logo: "https://slotsdesign.vercel.app/images/logo.png",
    },
    mainEntity: {
      "@type": "Service",
      name: "Custom Sportswear Manufacturing & Product Development",
      serviceType: "Apparel Manufacturing",
      provider: {
        "@type": "Organization",
        name: "SLOTS SPORTSWEAR",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Manufacturing Capabilities",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Original Equipment Manufacturing (OEM)",
              description:
                "Precision sportswear manufacturing executed strictly according to buyer-supplied CAD drawings, tech packs, and measurement specifications.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Original Design Manufacturing (ODM)",
              description:
                "Concept-to-product sportswear development leveraging factory silhouettes, pattern adaptation, and technical fabric sourcing.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Private Label & Brand Customization",
              description:
                "Full-service private label branding including custom woven tags, embossed hang tags, silicone heat transfers, and branded packaging.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "5-Stage Product Development",
              description:
                "End-to-end development workflow covering tech pack review, prototyping sampling, performance fabric selection, custom grading, and embellishment.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Multi-Stage Quality Control & Inspection",
              description:
                "Rigorous quality control spanning raw material testing, cutting accuracy audits, inline sewing checks, measurement verification, and final pre-packing inspection.",
            },
          },
        ],
      },
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
        item: "https://slotsdesign.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Capabilities",
        item: "https://slotsdesign.vercel.app/capabilities",
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(capabilitiesPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full">
        {/* 01 Hero Section (Single H1) */}
        <CapabilitiesHero />

        {/* 02 OEM, ODM & Private Label Deep Dive */}
        <CapabilityDeepDive />

        {/* 03 5-Stage Product Development Workflow */}
        <ProductDevelopment />

        {/* 04 Systematic Quality Control & Inspection */}
        <QualityControlSection />

        {/* 05 Closing Conversion CTA */}
        <CapabilitiesCta />
      </div>
    </>
  );
}
