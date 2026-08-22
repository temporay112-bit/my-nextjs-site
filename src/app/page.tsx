import React from "react";
import { Hero } from "@/components/hero/Hero";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { WhyChoose } from "@/components/trust/WhyChoose";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { NewArrivals } from "@/components/products/NewArrivals";
import { ManufacturingSolutions } from "@/components/capabilities/ManufacturingSolutions";
import { ManufacturingProcess } from "@/components/manufacturing/ManufacturingProcess";
import { FactoryProofSection } from "@/components/manufacturing/FactoryProofSection";
import { CertificatesSection } from "@/components/compliance/CertificatesSection";
import { ShippingMethods } from "@/components/logistics/ShippingMethods";
import { PaymentMethods } from "@/components/logistics/PaymentMethods";
import { SocialProof } from "@/components/trust/SocialProof";
import { CatalogueSection } from "@/components/catalogue/CatalogueSection";
import { QuoteSection } from "@/components/forms/QuoteSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 01 Homepage Hero Section */}
      <Hero />

      {/* 02 Trust Badges Strip (Compact Credibility Bar) */}
      <TrustBadges />

      {/* 03 Why Choose SLOTS SPORTSWEAR? (Theme Family 03) */}
      <WhyChoose />

      {/* 04 Product Showcase — BUILT FOR PERFORMANCE (Theme Family 02) */}
      <ProductShowcase />

      {/* 05 New Arrivals Section (Directly under BUILT FOR PERFORMANCE) */}
      <NewArrivals />

      {/* 06 OEM / ODM / Private Label Section (Theme Family 03) */}
      <ManufacturingSolutions />

      {/* 07 Our Manufacturing Process Section (Theme Family 03) */}
      <ManufacturingProcess />

      {/* 08 Factory Trust & Manufacturing Proof Section (Theme Family 03) */}
      <FactoryProofSection />

      {/* 09 Certificates & Compliance Trust Section (Theme Family 01) */}
      <CertificatesSection />

      {/* 10 International Shipping & Logistics Section (Theme Family 01) */}
      <ShippingMethods />

      {/* 11 Accepted Payment Methods Section (Theme Family 01) */}
      <PaymentMethods />

      {/* 12 Social Proof / Company Capabilities Section (Theme Family 02) */}
      <SocialProof />

      {/* 13 Catalogue Access Section */}
      <CatalogueSection />

      {/* 14 Get a Quote — Lead Generation & Inquiry Section */}
      <QuoteSection />
    </div>
  );
}
