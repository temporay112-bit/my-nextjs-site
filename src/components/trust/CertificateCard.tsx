"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  formatCertificateDate,
  type CertificateRecord,
} from "@/data/certificates";
import { CertificateViewer } from "@/components/trust/CertificateViewer";
import { cn } from "@/lib/utils";

interface CertificateCardProps {
  certificate: CertificateRecord;
  className?: string;
}

export function CertificateCard({ certificate, className }: CertificateCardProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const issuedDate = formatCertificateDate(certificate.validFrom);
  const expiryDate = formatCertificateDate(certificate.validUntil);

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col bg-graphite border border-carbon-grey/60 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:border-light-grey/20 motion-reduce:transition-none",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setViewerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={viewerOpen}
          aria-label={`View larger: ${certificate.title}`}
          className="relative w-full aspect-[4/3] bg-slots-black overflow-hidden border-b border-carbon-grey/40 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-electric-lime"
        >
          <Image
            src={certificate.image}
            alt={`${certificate.title} issued by ${certificate.issuer}`}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </button>

        <div className="flex flex-col flex-1 p-5 gap-3">
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-electric-lime/80">
            {certificate.issuer}
          </p>

          <h3 className="font-sora text-sm sm:text-base font-extrabold uppercase tracking-tight text-slots-white leading-snug">
            {certificate.title}
          </h3>

          <div className="w-full h-px bg-carbon-grey/60" />

          {(certificate.certificateNumber || issuedDate || expiryDate || certificate.scope) && (
            <dl className="flex flex-col gap-1.5 text-xs font-inter">
              {certificate.certificateNumber && (
                <div className="flex justify-between gap-3">
                  <dt className="text-technical-grey shrink-0">Ref. No.</dt>
                  <dd className="text-light-grey font-mono text-right truncate">
                    {certificate.certificateNumber}
                  </dd>
                </div>
              )}
              {issuedDate && (
                <div className="flex justify-between gap-3">
                  <dt className="text-technical-grey shrink-0">Issued</dt>
                  <dd className="text-light-grey text-right">{issuedDate}</dd>
                </div>
              )}
              {expiryDate && (
                <div className="flex justify-between gap-3">
                  <dt className="text-technical-grey shrink-0">Valid Until</dt>
                  <dd className="text-light-grey text-right">{expiryDate}</dd>
                </div>
              )}
              {certificate.scope && (
                <div className="flex flex-col gap-0.5 pt-1 border-t border-carbon-grey/40 mt-1">
                  <dt className="text-technical-grey">Scope</dt>
                  <dd className="text-light-grey/90 leading-relaxed">{certificate.scope}</dd>
                </div>
              )}
            </dl>
          )}

          {certificate.documentUrl && (
            <div className="mt-auto pt-3 border-t border-carbon-grey/40">
              <a
                href={certificate.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-10 text-xs font-sora font-bold uppercase tracking-wider text-electric-lime hover:text-slots-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime rounded"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Open document</span>
              </a>
            </div>
          )}
        </div>
      </article>

      <CertificateViewer
        certificate={certificate}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
}
