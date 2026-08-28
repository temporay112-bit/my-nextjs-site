"use client";

import React, { useState, useCallback } from "react";
import {
  ALLOWED_PRODUCT_CATEGORIES,
  validateInquiryInput,
  type InquiryInput,
  type InquiryFileItem,
} from "@/lib/validations";
import { FileUpload } from "@/components/forms/FileUpload";
import { Button } from "@/components/shared/Button";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  className?: string;
}

export function QuoteForm({ className }: QuoteFormProps) {
  const [formData, setFormData] = useState<InquiryInput>({
    name: "",
    email: "",
    phone: "",
    company: "",
    productCategory: "golfwear",
    message: "",
    fileReference: null,
    files: [],
  });

  const [attachedFiles, setAttachedFiles] = useState<InquiryFileItem[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setHasStartedTyping((prevStarted) => {
        if (!prevStarted) {
          trackEvent("inquiry_start", { category: value });
        }
        return true;
      });

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear field errors on change
      setFieldErrors((prev) => {
        if (!prev[name] && !(name === "email" && prev.contact) && !(name === "phone" && prev.contact)) {
          return prev;
        }
        const next = { ...prev };
        delete next[name];
        delete next.contact;
        return next;
      });
    },
    []
  );

  const handleFilesChanged = useCallback((files: InquiryFileItem[]) => {
    setAttachedFiles(files);
    setFormData((prev) => {
      const newRef =
        files.length === 0
          ? null
          : files.length === 1
          ? files[0].pathname
          : JSON.stringify(files);
      if (prev.fileReference === newRef && prev.files === files) {
        return prev;
      }
      return {
        ...prev,
        files,
        fileReference: newRef,
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation check
    const validation = validateInquiryInput(formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      const firstErrorKey = Object.keys(validation.errors)[0];
      const targetId = firstErrorKey === "contact" ? "field-email" : `field-${firstErrorKey}`;
      const el = document.getElementById(targetId);
      el?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerErrorMessage(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
          throw new Error("Please check the highlighted fields and try again.");
        }
        throw new Error(data.error || "Something went wrong. Please try again or contact us.");
      }

      setSubmittedInquiryId(data.inquiryId);
      setSubmitStatus("success");

      trackEvent("inquiry_submit", {
        category: formData.productCategory,
        has_techpack: attachedFiles.length > 0,
        files_count: attachedFiles.length,
        status: "success",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setServerErrorMessage(msg);
      setSubmitStatus("error");
      trackEvent("inquiry_submit", {
        category: formData.productCategory,
        has_techpack: attachedFiles.length > 0,
        files_count: attachedFiles.length,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      productCategory: "golfwear",
      message: "",
      fileReference: null,
      files: [],
    });
    setAttachedFiles([]);
    setFieldErrors({});
    setSubmitStatus("idle");
    setServerErrorMessage(null);
    setSubmittedInquiryId(null);
    setHasStartedTyping(false);
  };

  // Success State View
  if (submitStatus === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center shadow-2xl flex flex-col items-center",
          className
        )}
      >
        <div className="w-16 h-16 rounded-2xl bg-electric-lime/10 border border-electric-lime/30 text-electric-lime flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <h3 className="font-sora text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slots-white">
          Thank You, {formData.name.split(" ")[0]}!
        </h3>

        <p className="font-inter text-sm sm:text-base text-light-grey/90 max-w-md mt-3 leading-relaxed">
          Your custom manufacturing inquiry for{" "}
          <span className="text-slots-white font-semibold">{formData.company}</span> has been securely
          logged. Our engineering and quote team will review your specifications and follow up within 24 hours.
        </p>

        {submittedInquiryId && (
          <div className="mt-5 px-4 py-2 rounded-lg bg-slots-black border border-carbon-grey/80 text-xs font-mono text-technical-grey">
            Inquiry Reference: <span className="text-electric-lime font-bold">#{submittedInquiryId}</span>
          </div>
        )}

        {attachedFiles.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-slots-black/60 border border-carbon-grey/60 max-w-md w-full text-left">
            <div className="flex items-center gap-2 text-xs font-sora font-bold text-slots-white mb-2">
              <Paperclip className="w-3.5 h-3.5 text-electric-lime" />
              <span>Attached Design Files ({attachedFiles.length}):</span>
            </div>
            <ul className="space-y-1 text-xs font-inter text-technical-grey max-h-32 overflow-y-auto">
              {attachedFiles.map((f, i) => (
                <li key={i} className="truncate flex items-center gap-1.5">
                  <span className="text-electric-lime font-mono font-bold">{i + 1}.</span>
                  <span className="text-light-grey">{f.originalName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-carbon-grey/40 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={resetForm}
            className="border-carbon-grey hover:bg-carbon-grey text-slots-white"
          >
            Submit Another Project
          </Button>
          <Button variant="primary" size="md" href="/products">
            Browse Product Showcase
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "rounded-2xl bg-[#171717] border border-[#2A2A2A] p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col gap-5",
        className
      )}
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A]">
        <div>
          <h3 className="font-sora text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-slots-white">
            REQUEST A QUOTE
          </h3>
          <p className="font-inter text-xs text-technical-grey mt-0.5">
            Direct B2B sportswear inquiry &amp; technical review
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slots-black border border-[#2A2A2A] rounded text-[11px] font-inter text-electric-lime">
          <ShieldCheck className="w-4 h-4 text-electric-lime flex-shrink-0" />
          <span className="font-semibold">NDA Protected</span>
        </div>
      </div>

      {/* Global Server Error Banner */}
      {submitStatus === "error" && serverErrorMessage && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-sora text-xs font-bold text-red-400">Submission Error</p>
            <p className="font-inter text-xs text-red-200/90 mt-0.5">{serverErrorMessage}</p>
          </div>
        </div>
      )}

      {/* Row 1: Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label
            htmlFor="field-name"
            className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2"
          >
            Your Name <span className="text-electric-lime">*</span>
          </label>
          <input
            id="field-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            disabled={isSubmitting}
            className={cn(
              "w-full h-12 px-4 rounded-xl bg-[#141414] border text-slots-white placeholder-technical-grey/70 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
              fieldErrors.name
                ? "border-red-500 focus-visible:ring-red-400"
                : "border-[#4A4A4A] hover:border-[#777777] focus-visible:border-electric-lime focus-visible:ring-electric-lime"
            )}
          />
          {fieldErrors.name && (
            <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{fieldErrors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="field-company"
            className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2"
          >
            Company / Brand <span className="text-electric-lime">*</span>
          </label>
          <input
            id="field-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Acme Athletics Ltd."
            disabled={isSubmitting}
            className={cn(
              "w-full h-12 px-4 rounded-xl bg-[#141414] border text-slots-white placeholder-technical-grey/70 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
              fieldErrors.company
                ? "border-red-500 focus-visible:ring-red-400"
                : "border-[#4A4A4A] hover:border-[#777777] focus-visible:border-electric-lime focus-visible:ring-electric-lime"
            )}
          />
          {fieldErrors.company && (
            <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{fieldErrors.company}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Business Email & Phone / WhatsApp (Email OR Phone Required) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label
            htmlFor="field-email"
            className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2"
          >
            Business Email <span className="text-technical-grey font-normal normal-case">(or Phone)</span>
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@company.com"
            disabled={isSubmitting}
            className={cn(
              "w-full h-12 px-4 rounded-xl bg-[#141414] border text-slots-white placeholder-technical-grey/70 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
              fieldErrors.email || fieldErrors.contact
                ? "border-red-500 focus-visible:ring-red-400"
                : "border-[#4A4A4A] hover:border-[#777777] focus-visible:border-electric-lime focus-visible:ring-electric-lime"
            )}
          />
          {fieldErrors.email && (
            <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="field-phone"
            className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2"
          >
            Phone / WhatsApp <span className="text-technical-grey font-normal normal-case">(or Email)</span>
          </label>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 555 123 4567"
            disabled={isSubmitting}
            className={cn(
              "w-full h-12 px-4 rounded-xl bg-[#141414] border text-slots-white placeholder-technical-grey/70 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
              fieldErrors.phone
                ? "border-red-500 focus-visible:ring-red-400"
                : "border-[#4A4A4A] hover:border-[#777777] focus-visible:border-electric-lime focus-visible:ring-electric-lime"
            )}
          />
          {fieldErrors.phone && (
            <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{fieldErrors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {fieldErrors.contact && !fieldErrors.email && !fieldErrors.phone && (
        <p className="font-inter text-xs text-red-400 -mt-2 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{fieldErrors.contact}</span>
        </p>
      )}

      {/* Row 3: Product Category */}
      <div>
        <label
          htmlFor="field-productCategory"
          className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2"
        >
          Product Category <span className="text-electric-lime">*</span>
        </label>
        <div className="relative">
          <select
            id="field-productCategory"
            name="productCategory"
            required
            value={formData.productCategory}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full h-12 px-4 rounded-xl bg-[#141414] border border-[#4A4A4A] hover:border-[#777777] text-slots-white font-inter text-sm transition-colors focus-visible:outline-none focus-visible:border-electric-lime focus-visible:ring-1 focus-visible:ring-electric-lime appearance-none cursor-pointer"
          >
            {ALLOWED_PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-[#171717] text-slots-white">
                {cat.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-technical-grey">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {fieldErrors.productCategory && (
          <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{fieldErrors.productCategory}</span>
          </p>
        )}
      </div>

      {/* Row 4: Project Requirements / Message */}
      <div>
        <label
          htmlFor="field-message"
          className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2"
        >
          Project Requirements &amp; Specifications <span className="text-electric-lime">*</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Please describe your project (quantities, fabrics, target delivery timeline, customization requirements)..."
          disabled={isSubmitting}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-[#141414] border text-slots-white placeholder-technical-grey/70 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 resize-y min-h-[120px]",
            fieldErrors.message
              ? "border-red-500 focus-visible:ring-red-400"
              : "border-[#4A4A4A] hover:border-[#777777] focus-visible:border-electric-lime focus-visible:ring-electric-lime"
          )}
        />
        {fieldErrors.message && (
          <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{fieldErrors.message}</span>
          </p>
        )}
      </div>

      {/* Row 5: Multi-File Vercel Blob Upload */}
      <FileUpload onFilesChanged={handleFilesChanged} disabled={isSubmitting} />

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="group relative overflow-hidden flex items-center justify-center gap-2 h-14"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-slots-black border-t-transparent animate-spin" />
              <span>SUBMITTING INQUIRY...</span>
            </span>
          ) : (
            <>
              <span>SUBMIT INQUIRY</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </Button>
        <p className="font-inter text-xs text-center text-technical-grey/80 mt-2.5">
          By submitting, you agree to our standard manufacturing confidentiality terms. We reply within 24 hours.
        </p>
      </div>
    </form>
  );
}
