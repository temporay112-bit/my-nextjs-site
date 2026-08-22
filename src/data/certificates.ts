/**
 * SLOTS SPORTSWEAR — Certificate Data & Logos
 *
 * Official verified certification, chamber, tax, and standard logos.
 * Reusable for the InfiniteLogoMarquee component and Certificate Cards.
 */

export interface CertificateLogoItem {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  aspectRatio?: string;
  documentPath?: string;
  altText: string;
}

export interface CertificateRecord {
  id: string;
  title: string;
  issuer: string;
  certificateNumber: string | null;
  validFrom: string | null;
  validUntil: string | null;
  scope: string | null;
  image: string;
  documentUrl: string | null;
  verified: boolean;
}

export const CERTIFICATES: CertificateRecord[] = [];

export function getVerifiedCertificates(): CertificateRecord[] {
  return CERTIFICATES.filter((cert) => cert.verified === true);
}

export function formatCertificateDate(isoDate: string | null): string | null {
  if (!isoDate) return null;
  try {
    return new Date(isoDate).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return isoDate;
  }
}

export const CERTIFICATE_LOGOS: CertificateLogoItem[] = [
  {
    id: "chamber",
    name: "The Sialkot Chamber of Commerce & Industry",
    shortName: "SCCI Chamber of Commerce",
    logo: "/images/certificates/WhatsApp-Image-2026-07-19-at-2.12.11-PM-1.jpeg.jpg",
    documentPath: "/images/certificates/Chamber Certificate.png",
    altText: "The Sialkot Chamber of Commerce & Industry (SCCI) Official Logo",
  },
  {
    id: "fbr",
    name: "Federal Board of Revenue — Taxpayer Registered",
    shortName: "FBR Pakistan",
    logo: "/images/certificates/fbr.webp.jpg",
    documentPath: "/images/certificates/FBR Certificate.png",
    altText: "Federal Board of Revenue (FBR) Pakistan Official Taxpayer Logo",
  },
  {
    id: "iso",
    name: "International Organization for Standardization",
    shortName: "ISO Standards",
    logo: "/images/certificates/ISO-1663036.webp.jpg",
    altText: "International Organization for Standardization (ISO) Logo",
  },
  {
    id: "gmp",
    name: "Good Manufacturing Practice Certified",
    shortName: "GMP Certified",
    logo: "/images/certificates/WhatsApp-Image-2026-07-19-at-2.12.11-PM.jpeg.jpg",
    altText: "Good Manufacturing Practice (GMP) Certified Seal",
  },
];
