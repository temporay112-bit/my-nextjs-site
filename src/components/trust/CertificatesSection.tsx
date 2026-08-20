import React from "react";
import { getVerifiedCertificates } from "@/data/certificates";
import { CertificateCard } from "@/components/trust/CertificateCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

interface CertificatesSectionProps {
  className?: string;
}

function gridClassName(count: number): string {
  if (count === 1) return "grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
}

/**
 * Certificates & Compliance Trust Section
 *
 * GATE: Renders only when at least one verified, complete certificate record exists.
 * No placeholder certificates, fake issuers, or unverified compliance claims.
 */
export function CertificatesSection({ className }: CertificatesSectionProps) {
  const certificates = getVerifiedCertificates();

  if (certificates.length === 0) {
    return null;
  }

  return (
    <section
      id="certifications"
      aria-label="Certifications and compliance"
      className={cn(
        "relative w-full bg-slots-black text-slots-white py-16 sm:py-20 lg:py-28 border-b border-carbon-grey/40",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CERTIFICATIONS & COMPLIANCE"
          headline="VERIFIED WHERE IT MATTERS."
          align="left"
          theme="dark"
          className="mb-10 sm:mb-14"
        />

        <div className={cn("grid gap-6 lg:gap-8", gridClassName(certificates.length))}>
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
