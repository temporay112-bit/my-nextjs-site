/**
 * SLOTS SPORTSWEAR — Certificates & Compliance Data
 *
 * STRICT CONTENT RULE:
 * Only add records where ALL of the following are true:
 *   1. The physical/digital certificate has been reviewed and is authentic.
 *   2. The certificate has been explicitly approved for public display by management.
 *   3. Every field (issuer, certificateNumber, dates, scope) has been verified
 *      against the original document — not guessed or paraphrased.
 *   4. An approved certificate image / scan has been placed in /public/images/certificates/
 *
 * NEVER set verified=true on a placeholder entry.
 * NEVER invent ISO, OEKO-TEX, BSCI, WRAP, SEDEX, or any other certification.
 * The CertificatesSection renders only when this array contains ≥1 verified record.
 */

export interface CertificateRecord {
  id: string;
  /** Official name as it appears on the certificate document */
  title: string;
  /** Official name of the issuing organization as it appears on the document */
  issuer: string;
  /**
   * Official certificate / registration number.
   * Set to null if not approved for public display.
   */
  certificateNumber: string | null;
  /**
   * ISO date string (YYYY-MM-DD) of issue date.
   * Set to null if not approved for public display.
   */
  validFrom: string | null;
  /**
   * ISO date string (YYYY-MM-DD) of expiry/renewal date.
   * Set to null if not approved for public display.
   */
  validUntil: string | null;
  /**
   * Brief factual scope statement taken directly from the certificate document.
   * Set to null if scope is not defined on the document.
   */
  scope: string | null;
  /**
   * Path relative to /public/ for the certificate preview image.
   * Must be a real approved image — never a generated placeholder.
   */
  image: string;
  /**
   * Public URL of the certificate document (PDF or web verification link).
   * Set to null if no public document link has been approved.
   */
  documentUrl: string | null;
  /**
   * IMPORTANT: Set to true ONLY after all of the above fields have been verified
   * against the original document and management has approved public display.
   * Records with verified=false are NEVER shown to site visitors.
   */
  verified: boolean;
}

/**
 * Approved certificate records for public display.
 *
 * STATUS: EMPTY — No certificates have been verified and approved for public display yet.
 *
 * To add a certificate when approved:
 * 1. Place the certificate image in /public/images/certificates/<filename>.jpg
 * 2. Populate all confirmed fields below — set unknown/unapproved fields to null.
 * 3. Set verified: true ONLY after management approval for public display.
 *
 * Do not pre-fill issuer names, numbers, dates, or image paths.
 * Copy a record in only after the original document and public-display
 * approval exist. Leave unknown fields as null. Set verified: true last.
 */
export const CERTIFICATES: CertificateRecord[] = [];

function hasPublicAsset(value: string): boolean {
  return value.trim().startsWith("/") && !value.includes("placeholder");
}

/** Returns only records cleared for public display, with required fields present. */
export function getVerifiedCertificates(): CertificateRecord[] {
  return CERTIFICATES.filter(
    (cert) =>
      cert.verified === true &&
      cert.title.trim().length > 0 &&
      cert.issuer.trim().length > 0 &&
      hasPublicAsset(cert.image)
  );
}

export function formatCertificateDate(isoDate: string | null): string | null {
  if (!isoDate) return null;
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });
}
