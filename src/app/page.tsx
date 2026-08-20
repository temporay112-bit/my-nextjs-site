import React from "react";
import { Hero } from "@/components/hero/Hero";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { ManufacturingSolutions } from "@/components/capabilities/ManufacturingSolutions";
import { ManufacturingProcess } from "@/components/manufacturing/ManufacturingProcess";
import { FactoryProofSection } from "@/components/manufacturing/FactoryProofSection";
import { CertificatesSection } from "@/components/trust/CertificatesSection";
import { QuoteSection } from "@/components/forms/QuoteSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 01 Homepage Hero Section */}
      <Hero />

      {/* 02 Trust Badges Strip */}
      <TrustBadges />

      {/* 03 Product Showcase Section */}
      <ProductShowcase />

      {/* 04 OEM / ODM / Private Label Section */}
      <ManufacturingSolutions />

      {/* 05 Our Manufacturing Process Section */}
      <ManufacturingProcess />

      {/* 06 Factory Trust & Manufacturing Proof Section */}
      <FactoryProofSection />

      {/* 07 Certificates & Compliance Trust Section — self-gates when no verified certs exist */}
      <CertificatesSection />

      {/* 08 Get a Quote — Lead Generation & Inquiry Section */}
      <QuoteSection />
    </div>
  );
}

