"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import {
  formatCertificateDate,
  type CertificateRecord,
} from "@/data/certificates";
import { cn } from "@/lib/utils";

interface CertificateViewerProps {
  certificate: CertificateRecord;
  open: boolean;
  onClose: () => void;
}

export function CertificateViewer({
  certificate,
  open,
  onClose,
}: CertificateViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const issuedDate = formatCertificateDate(certificate.validFrom);
  const expiryDate = formatCertificateDate(certificate.validUntil);
  const titleId = `certificate-viewer-title-${certificate.id}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-auto w-[min(100%,56rem)] max-h-[min(92vh,52rem)] p-0 bg-graphite text-slots-white",
        "border border-carbon-grey/80 rounded-lg shadow-2xl",
        "backdrop:bg-slots-black/85",
        "focus:outline-none"
      )}
    >
      <div className="flex items-start justify-between gap-4 px-4 py-3 sm:px-5 border-b border-carbon-grey/60">
        <div className="min-w-0">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-wider text-electric-lime/80">
            {certificate.issuer}
          </p>
          <h3
            id={titleId}
            className="font-sora text-sm sm:text-base font-extrabold uppercase tracking-tight text-slots-white leading-snug mt-1"
          >
            {certificate.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate preview"
          className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-md text-light-grey hover:text-slots-white hover:bg-carbon-grey/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative w-full aspect-[4/3] bg-slots-black">
        <Image
          src={certificate.image}
          alt={`${certificate.title} issued by ${certificate.issuer}`}
          fill
          className="object-contain p-4 sm:p-6"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {(certificate.certificateNumber ||
        issuedDate ||
        expiryDate ||
        certificate.scope ||
        certificate.documentUrl) && (
        <div className="px-4 py-4 sm:px-5 sm:py-5 border-t border-carbon-grey/60">
          <dl className="flex flex-col gap-1.5 text-xs font-inter">
            {certificate.certificateNumber && (
              <div className="flex justify-between gap-3">
                <dt className="text-technical-grey shrink-0">Ref. No.</dt>
                <dd className="text-light-grey font-mono text-right break-all">
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
              <div className="flex flex-col gap-0.5 pt-2 border-t border-carbon-grey/40 mt-1">
                <dt className="text-technical-grey">Scope</dt>
                <dd className="text-light-grey/90 leading-relaxed">{certificate.scope}</dd>
              </div>
            )}
          </dl>

          {certificate.documentUrl && (
            <a
              href={certificate.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 min-h-10 text-xs font-sora font-bold uppercase tracking-wider text-electric-lime hover:text-slots-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime rounded"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Open document</span>
            </a>
          )}
        </div>
      )}
    </dialog>
  );
}
