export interface InquiryFileItem {
  pathname: string;
  originalName: string;
  mimeType?: string;
  size?: number;
  uploadedAt?: string;
}

export interface InquiryInput {
  name: string;
  email?: string;
  phone?: string;
  company: string;
  productCategory: string;
  message: string;
  fileReference?: string | null;
  files?: InquiryFileItem[];
}

export interface ValidationResult<T> {
  isValid: boolean;
  errors: Record<string, string>;
  data?: T;
}

export const ALLOWED_PRODUCT_CATEGORIES = [
  { value: "golfwear", label: "Golfwear & Basics" },
  { value: "activewear", label: "Sportswear / Activewear" },
  { value: "teamwear", label: "Teamwear & Outerwear" },
  { value: "tracksuits", label: "Tracksuits & Warmups" },
  { value: "basics", label: "Basics & Essentials" },
  { value: "custom-oem-odm", label: "Custom OEM / ODM Project" },
  { value: "private-label", label: "Private Label Collection" },
  { value: "other", label: "Other Sportswear Requirement" },
] as const;

export const MAX_FILES_PER_INQUIRY = 10;
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB per file
export const MAX_TOTAL_UPLOAD_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB total per inquiry

export const ALLOWED_FILE_EXTENSIONS = [
  ".pdf",
  ".ai",
  ".psd",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".zip",
  ".svg",
];

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/postscript",
  "application/illustrator",
  "image/vnd.adobe.photoshop",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream", // for AI/PSD in certain OS
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{4,20}$/;

/**
 * Validates an incoming inquiry submission including single and multi-file attachments.
 */
export function validateInquiryInput(raw: unknown): ValidationResult<InquiryInput> {
  const errors: Record<string, string> = {};

  if (!raw || typeof raw !== "object") {
    return {
      isValid: false,
      errors: { form: "Invalid request payload." },
    };
  }

  const data = raw as Record<string, unknown>;

  // Name
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must not exceed 100 characters.";
  }

  // Email and Phone validation (At least ONE required)
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";

  if (!email && !phone) {
    errors.contact = "Please provide either your business email or phone/WhatsApp number.";
    errors.email = "Please provide either your business email or phone/WhatsApp number.";
  } else {
    if (email) {
      if (!EMAIL_REGEX.test(email)) {
        errors.email = "Please enter a valid business email address.";
      } else if (email.length > 150) {
        errors.email = "Email must not exceed 150 characters.";
      }
    }

    if (phone) {
      if (!PHONE_REGEX.test(phone) || phone.replace(/\D/g, "").length < 6) {
        errors.phone = "Please enter a valid phone or WhatsApp number.";
      } else if (phone.length > 30) {
        errors.phone = "Phone number must not exceed 30 characters.";
      }
    }
  }

  // Company
  const company = typeof data.company === "string" ? data.company.trim() : "";
  if (!company) {
    errors.company = "Please enter your company or brand name.";
  } else if (company.length < 2) {
    errors.company = "Company name must be at least 2 characters.";
  } else if (company.length > 100) {
    errors.company = "Company name must not exceed 100 characters.";
  }

  // Product Category
  const productCategory = typeof data.productCategory === "string" ? data.productCategory.trim() : "";
  const validCategoryValues = ALLOWED_PRODUCT_CATEGORIES.map((c) => c.value);
  if (!productCategory) {
    errors.productCategory = "Please select a product category.";
  } else if (!validCategoryValues.includes(productCategory as (typeof validCategoryValues)[number])) {
    errors.productCategory = "Please select a valid product category from the list.";
  }

  // Message
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (!message) {
    errors.message = "Please tell us briefly about your project or order requirements.";
  } else if (message.length < 5) {
    errors.message = "Message must be at least 5 characters.";
  } else if (message.length > 3000) {
    errors.message = "Message must not exceed 3000 characters.";
  }

  // Multi-file validation
  let validatedFiles: InquiryFileItem[] = [];
  let legacyFileRef: string | null = null;

  if (Array.isArray(data.files) && data.files.length > 0) {
    if (data.files.length > MAX_FILES_PER_INQUIRY) {
      errors.files = `You can upload a maximum of ${MAX_FILES_PER_INQUIRY} files per inquiry.`;
    } else {
      let totalSizeBytes = 0;
      for (let i = 0; i < data.files.length; i++) {
        const item = data.files[i];
        if (!item || typeof item !== "object") continue;

        const pathname = typeof item.pathname === "string" ? item.pathname.trim() : "";
        const originalName = typeof item.originalName === "string" ? item.originalName.trim() : pathname.split("/").pop() || "Attachment";
        const size = typeof item.size === "number" ? item.size : 0;
        const mimeType = typeof item.mimeType === "string" ? item.mimeType : undefined;

        if (!pathname) continue;

        // Prevent path traversal
        if (pathname.includes("..") || pathname.includes("\\")) {
          errors.files = "Invalid file path in uploaded attachment.";
          break;
        }

        // Validate allowed namespace prefix
        const isAllowedPrefix =
          pathname.startsWith("techpacks/") ||
          pathname.startsWith("products/") ||
          pathname.startsWith("uploads/") ||
          pathname.startsWith("http://") ||
          pathname.startsWith("https://");

        if (!isAllowedPrefix) {
          errors.files = "Attachment reference does not belong to authorized upload storage.";
          break;
        }

        const ext = "." + (originalName.split(".").pop() || "").toLowerCase();
        if (originalName.includes(".") && !ALLOWED_FILE_EXTENSIONS.includes(ext as any)) {
          errors.files = `File "${originalName}" has an unsupported format (${ext}). Allowed: ${ALLOWED_FILE_EXTENSIONS.join(", ")}`;
          break;
        }

        if (size > MAX_FILE_SIZE_BYTES) {
          errors.files = `File "${originalName}" exceeds the 25MB limit.`;
          break;
        }

        totalSizeBytes += size;
        validatedFiles.push({
          pathname,
          originalName,
          size,
          mimeType,
          uploadedAt: item.uploadedAt || new Date().toISOString(),
        });
      }

      if (totalSizeBytes > MAX_TOTAL_UPLOAD_SIZE_BYTES) {
        errors.files = `Total upload size (${(totalSizeBytes / (1024 * 1024)).toFixed(1)}MB) exceeds the 100MB maximum limit.`;
      }
    }
  }

  // Legacy single file reference fallback
  if (typeof data.fileReference === "string" && data.fileReference.trim()) {
    const rawRef = data.fileReference.trim();
    if (!rawRef.includes("..") && !rawRef.includes("\\")) {
      legacyFileRef = rawRef;
      if (validatedFiles.length === 0) {
        validatedFiles.push({
          pathname: rawRef,
          originalName: rawRef.split("/").pop()?.split("?")[0] || "TechPack-Attachment",
          uploadedAt: new Date().toISOString(),
        });
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    data: {
      name,
      email: email || undefined,
      phone: phone || undefined,
      company,
      productCategory,
      message,
      fileReference: legacyFileRef || (validatedFiles.length > 0 ? JSON.stringify(validatedFiles) : null),
      files: validatedFiles.length > 0 ? validatedFiles : undefined,
    },
  };
}

/**
 * Validates individual file metadata (client-side and pre-upload)
 */
export function validateFileMetadata(filename: string, sizeBytes: number, mimeType?: string): { isValid: boolean; error?: string } {
  if (!filename) {
    return { isValid: false, error: "No file provided." };
  }

  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds the 25MB limit (provided: ${(sizeBytes / (1024 * 1024)).toFixed(1)}MB).`,
    };
  }

  if (sizeBytes === 0) {
    return { isValid: false, error: "File is empty." };
  }

  const ext = "." + filename.split(".").pop()?.toLowerCase();
  if (!ALLOWED_FILE_EXTENSIONS.includes(ext)) {
    return {
      isValid: false,
      error: `Unsupported file type (${ext}). Allowed types: ${ALLOWED_FILE_EXTENSIONS.join(", ")}`,
    };
  }

  return { isValid: true };
}

/**
 * Universal helper that safely parses and normalizes file attachments from any legacy or modern inquiry data shape.
 */
export function parseInquiryFiles(raw: unknown): InquiryFileItem[] {
  if (!raw) return [];

  // Case 1: Already an array of InquiryFileItem or strings
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === "string" && item.trim()) {
          const clean = item.trim();
          return {
            pathname: clean,
            originalName: clean.split("/").pop()?.split("?")[0] || "Attachment",
          };
        }
        if (item && typeof item === "object" && item.pathname) {
          return {
            pathname: String(item.pathname).trim(),
            originalName: String(item.originalName || item.pathname.split("/").pop()?.split("?")[0] || "Attachment"),
            size: typeof item.size === "number" ? item.size : undefined,
            mimeType: typeof item.mimeType === "string" ? item.mimeType : undefined,
            uploadedAt: typeof item.uploadedAt === "string" ? item.uploadedAt : undefined,
          };
        }
        return null;
      })
      .filter((i): i is InquiryFileItem => i !== null && i.pathname.length > 0);
  }

  // Case 2: Object with fileReference / files property
  if (typeof raw === "object") {
    const obj = raw as Record<string, any>;
    if (Array.isArray(obj.files) && obj.files.length > 0) {
      return parseInquiryFiles(obj.files);
    }
    if (obj.fileReference) {
      return parseInquiryFiles(obj.fileReference);
    }
    if (obj.file_reference) {
      return parseInquiryFiles(obj.file_reference);
    }
  }

  // Case 3: JSON string or single path string
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed || trimmed === "null" || trimmed === "undefined") return [];

    // Try parsing as JSON array
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseInquiryFiles(parsed);
      } catch {}
    }

    // Try parsing as JSON object
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.pathname) {
          return [
            {
              pathname: parsed.pathname,
              originalName: parsed.originalName || parsed.pathname.split("/").pop()?.split("?")[0] || "Attachment",
              size: parsed.size,
              mimeType: parsed.mimeType,
              uploadedAt: parsed.uploadedAt,
            },
          ];
        }
      } catch {}
    }

    // Single legacy path/URL string
    return [
      {
        pathname: trimmed,
        originalName: trimmed.split("/").pop()?.split("?")[0] || "Attachment",
      },
    ];
  }

  return [];
}
