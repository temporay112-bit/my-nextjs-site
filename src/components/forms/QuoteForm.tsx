"use client";

import React, { useState } from "react";
import { ALLOWED_PRODUCT_CATEGORIES, validateInquiryInput, type InquiryInput } from "@/lib/validations";
import { FileUpload } from "@/components/forms/FileUpload";
import { Button } from "@/components/shared/Button";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  className?: string;
}

export function QuoteForm({ className }: QuoteFormProps) {
  const [formData, setFormData] = useState<InquiryInput>({
    name: "",
    email: "",
    company: "",
    productCategory: "golfwear",
    message: "",
    fileReference: null,
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      trackEvent("inquiry_start", { category: formData.productCategory });
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileUploaded = (fileReference: string | null, originalName: string | null) => {
    setFormData((prev) => ({ ...prev, fileReference }));
    setUploadedFileName(originalName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation check
    const validation = validateInquiryInput(formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      const firstErrorKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
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
        has_techpack: !!formData.fileReference,
        status: "success",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setSubmitStatus("error");
      setServerErrorMessage(msg);

      trackEvent("inquiry_submit", {
        category: formData.productCategory,
        has_techpack: !!formData.fileReference,
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
      company: "",
      productCategory: "golfwear",
      message: "",
      fileReference: null,
    });
    setUploadedFileName(null);
    setFieldErrors({});
    setSubmitStatus("idle");
    setServerErrorMessage(null);
    setSubmittedInquiryId(null);
    setHasStartedTyping(false);
  };

  // Success Confirmation View
  if (submitStatus === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl bg-graphite border border-electric-lime/40 p-8 sm:p-10 lg:p-12 shadow-2xl flex flex-col items-center text-center",
          className
        )}
      >
        <div className="w-16 h-16 rounded-full bg-electric-lime/10 border-2 border-electric-lime text-electric-lime flex items-center justify-center mb-6 shadow-cta-glow">
          <CheckCircle2 className="w-8 h-8 stroke-[2]" />
        </div>

        <span className="font-sora text-xs font-bold text-electric-lime uppercase tracking-widest-brand px-3 py-1 rounded-full bg-slots-black border border-light-grey/10 mb-3">
          INQUIRY RECEIVED
        </span>

        <h3 className="font-sora text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slots-white">
          Thank You, {formData.name.split(" ")[0]}!
        </h3>

        <p className="font-inter text-sm sm:text-base text-light-grey/90 max-w-md mt-3 leading-relaxed">
          Your custom manufacturing request for <span className="text-slots-white font-semibold">{formData.company}</span> has been securely logged.
        </p>

        {submittedInquiryId && (
          <div className="mt-4 px-3.5 py-1.5 rounded-lg bg-slots-black/70 border border-carbon-grey/80 text-xs font-mono text-technical-grey">
            Reference ID: <span className="text-electric-lime">{submittedInquiryId}</span>
          </div>
        )}

        {uploadedFileName && (
          <div className="mt-2 text-xs font-inter text-technical-grey">
            Attached File: <span className="text-light-grey">{uploadedFileName}</span>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-carbon-grey/40 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="md" onClick={resetForm} className="border-carbon-grey hover:bg-carbon-grey text-slots-white">
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
        "rounded-2xl bg-graphite border border-carbon-grey/60 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col gap-5",
        className
      )}
    >
      <div className="flex items-center justify-between pb-4 border-b border-carbon-grey/40">
        <div>
          <h3 className="font-sora text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-slots-white">
            REQUEST A QUOTE
          </h3>
          <p className="font-inter text-xs text-technical-grey mt-0.5">
            Direct B2B sportswear inquiry & technical review
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-inter text-electric-lime">
          <ShieldCheck className="w-4 h-4" />
          <span>NDA Protected</span>
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

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="field-name" className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2">
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
              "w-full px-4 py-3 rounded-xl bg-slots-black border text-slots-white placeholder-technical-grey/60 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-2",
              fieldErrors.name
                ? "border-red-500 focus-visible:ring-red-400"
                : "border-carbon-grey/70 focus-visible:border-electric-lime focus-visible:ring-electric-lime"
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
          <label htmlFor="field-email" className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2">
            Business Email <span className="text-electric-lime">*</span>
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@brand.com"
            disabled={isSubmitting}
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-slots-black border text-slots-white placeholder-technical-grey/60 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-2",
              fieldErrors.email
                ? "border-red-500 focus-visible:ring-red-400"
                : "border-carbon-grey/70 focus-visible:border-electric-lime focus-visible:ring-electric-lime"
            )}
          />
          {fieldErrors.email && (
            <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Company & Product Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="field-company" className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2">
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
              "w-full px-4 py-3 rounded-xl bg-slots-black border text-slots-white placeholder-technical-grey/60 font-inter text-sm transition-colors focus-visible:outline-none focus-visible:ring-2",
              fieldErrors.company
                ? "border-red-500 focus-visible:ring-red-400"
                : "border-carbon-grey/70 focus-visible:border-electric-lime focus-visible:ring-electric-lime"
            )}
          />
          {fieldErrors.company && (
            <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{fieldErrors.company}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-productCategory" className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2">
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
              className={cn(
                "w-full px-4 py-3 rounded-xl bg-slots-black border text-slots-white font-inter text-sm transition-colors appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2",
                fieldErrors.productCategory
                  ? "border-red-500 focus-visible:ring-red-400"
                  : "border-carbon-grey/70 focus-visible:border-electric-lime focus-visible:ring-electric-lime"
              )}
            >
              {ALLOWED_PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-slots-black text-slots-white py-2">
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
      </div>

      {/* Row 3: Message / Project Details */}
      <div>
        <label htmlFor="field-message" className="block font-sora text-xs font-bold uppercase tracking-wider text-slots-white mb-2">
          Project Details / Requirements <span className="text-electric-lime">*</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell us briefly about your project (target quantities, fabric preferences, custom branding, or timeline)."
          disabled={isSubmitting}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-slots-black border text-slots-white placeholder-technical-grey/60 font-inter text-sm transition-colors resize-y min-h-[100px] focus-visible:outline-none focus-visible:ring-2",
            fieldErrors.message
              ? "border-red-500 focus-visible:ring-red-400"
              : "border-carbon-grey/70 focus-visible:border-electric-lime focus-visible:ring-electric-lime"
          )}
        />
        {fieldErrors.message && (
          <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{fieldErrors.message}</span>
          </p>
        )}
      </div>

      {/* Row 4: File Upload */}
      <FileUpload onFileUploaded={handleFileUploaded} disabled={isSubmitting} />

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="shadow-lg hover:shadow-cta-glow font-extrabold flex items-center justify-center gap-2 py-4"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 rounded-full border-2 border-slots-black border-t-transparent animate-spin" />
              <span>Processing Inquiry...</span>
            </>
          ) : (
            <>
              <span>SUBMIT INQUIRY</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>

      <p className="text-center font-inter text-[11px] text-technical-grey mt-1">
        We respect your privacy. No spam. Direct manufacturing review by our Sialkot team.
      </p>
    </form>
  );
}
