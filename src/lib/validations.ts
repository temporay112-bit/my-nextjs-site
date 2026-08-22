export interface InquiryInput {
  name: string;
  email?: string;
  phone?: string;
  company: string;
  productCategory: string;
  message: string;
  fileReference?: string | null;
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

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

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

  // File Reference (optional)
  const fileReference =
    typeof data.fileReference === "string" && data.fileReference.trim()
      ? data.fileReference.trim()
      : null;

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
      fileReference,
    },
  };
}

export function validateFileMetadata(filename: string, sizeBytes: number, mimeType: string): { isValid: boolean; error?: string } {
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
