import React from "react";
import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyOverview } from "@/components/about/CompanyOverview";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { OurSpecialization } from "@/components/about/OurSpecialization";
import { ManufacturingIdentity } from "@/components/about/ManufacturingIdentity";
import { AboutTrust } from "@/components/about/AboutTrust";
import { AboutCta } from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About SLOTS SPORTSWEAR | Custom Sportswear Manufacturer",
  description:
    "Learn about SLOTS SPORTSWEAR — Sialkot's premier B2B custom sportswear, golfwear, and private-label apparel manufacturer exporting worldwide.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About SLOTS SPORTSWEAR | Custom Sportswear Manufacturer",
    description:
      "Precision B2B custom sportswear and golfwear manufacturer based in Sialkot, Pakistan. Specializing in OEM, ODM, private label, and global export.",
    url: "https://slotsdesign.vercel.app/about",
    siteName: "SLOTS SPORTSWEAR",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/factory/facility-main.jpg",
        width: 1200,
        height: 630,
        alt: "SLOTS SPORTSWEAR Manufacturing Facility in Sialkot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SLOTS SPORTSWEAR | Custom Sportswear Manufacturer",
    description:
      "Precision B2B custom sportswear and golfwear manufacturer based in Sialkot, Pakistan.",
    images: ["/images/factory/facility-main.jpg"],
  },
};

export default function AboutPage() {
  // Schema.org Structured Data for AboutPage
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SLOTS SPORTSWEAR",
    url: "https://slotsdesign.vercel.app/about",
    description:
      "SLOTS SPORTSWEAR is a premier B2B custom sportswear manufacturer and global exporter based in Sialkot, Pakistan.",
    publisher: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      url: "https://slotssportswear.com",
      logo: "https://slotssportswear.com/images/logo.png",
    },
    mainEntity: {
      "@type": "Organization",
      name: "SLOTS SPORTSWEAR",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sialkot",
          postalCode: "51310",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
      },
      knowsAbout: [
        "Custom Sportswear Manufacturing",
        "OEM Apparel Production",
        "ODM Sportswear Development",
        "Private Label Apparel",
        "Performance Golfwear",
        "International Apparel Export",
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
        name: "About Us",
        item: "https://slotssportswear.com/about",
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full">
        {/* 01 Hero Section (Single H1) */}
        <AboutHero />

        {/* 02 Company Overview (WHO WE ARE) */}
        <CompanyOverview />

        {/* 03 Core Capabilities (WHAT WE DO) */}
        <WhatWeDo />

        {/* 04 Product Specialization (OUR SPECIALIZATION) */}
        <OurSpecialization />

        {/* 05 Manufacturing Heritage & Identity (MANUFACTURING FROM SIALKOT) */}
        <ManufacturingIdentity />

        {/* 06 Verified B2B Capabilities & Governance (BUILT FOR B2B) */}
        <AboutTrust />

        {/* 07 Next Steps CTA (START YOUR PROJECT) */}
        <AboutCta />
      </div>
    </>
  );
}
