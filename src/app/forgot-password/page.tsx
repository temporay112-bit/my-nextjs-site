"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  ArrowRight,
  AlertCircle,
  Loader2,
  Mail,
  MailCheck,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to process request.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-lg bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7FF00]" />

          <div className="w-16 h-16 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(183,255,0,0.15)]">
            <MailCheck className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#2A2A2A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
            <span className="font-barlow text-xs font-bold tracking-widest text-[#B7FF00] uppercase">
              RESET LINK DISPATCHED
            </span>
          </div>

          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF] mb-3 tracking-tight">
            Check Your Email
          </h1>

          <p className="font-inter text-sm text-[#9CA3AF] leading-relaxed mb-6">
            If an account is associated with <strong className="text-[#FFFFFF]">{email}</strong>, we have dispatched a secure password reset link.
          </p>

          <div className="p-4 bg-[#050505] border border-[#2A2A2A] text-left text-xs font-inter text-[#777777] space-y-2 mb-8">
            <p>&bull; The link will expire automatically in 1 hour.</p>
            <p>&bull; Check your spam or junk folder if you don&apos;t see it shortly.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 relative shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7FF00]" />

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#2A2A2A] mb-4">
            <KeyRound className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
              PASSWORD RECOVERY
            </span>
          </div>

          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
            Forgot Password?
          </h1>

          <p className="font-inter text-xs sm:text-sm text-[#777777] mt-1.5 leading-relaxed">
            Enter your business email address and we will send you a secure link to reset your account password.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs font-inter flex items-start gap-3"
          >
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="forgot-email"
              className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
            >
              Business Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="forgot-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@yourcompany.com"
                className="w-full pl-10 pr-4 py-3 bg-[#050505] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#555555] font-inter text-sm focus:outline-none focus:border-[#B7FF00] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 bg-[#B7FF00] text-[#050505] hover:bg-[#A3E600] font-sora text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SENDING LINK...</span>
              </>
            ) : (
              <>
                <span>SEND RESET LINK</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-sora font-bold text-[#777777] hover:text-[#FFFFFF] uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
