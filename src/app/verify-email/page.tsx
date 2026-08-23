"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  MailCheck,
  RefreshCw,
} from "lucide-react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorReason, setErrorReason] = useState<string | null>(null);

  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendResult, setResendResult] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setErrorMessage("No verification link token found. Please use the activation link sent to your email.");
      return;
    }

    const performVerification = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorReason(data.reason || "INVALID");
          setErrorMessage(data.error || "Failed to verify email address.");
          setLoading(false);
          return;
        }

        setSuccess(true);
        setStatusMessage(data.message || "Email verified successfully!");
        setLoading(false);

        // Auto-redirect to account dashboard
        setTimeout(() => {
          router.push("/account");
          router.refresh();
        }, 2200);
      } catch {
        setErrorMessage("Network error occurred during verification. Please try again.");
        setLoading(false);
      }
    };

    performVerification();
  }, [token, router]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail.trim()) return;

    setResending(true);
    setResendResult(null);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail.trim() }),
      });
      const data = await res.json();
      setResendResult(data.message || "A fresh verification link has been sent to your email.");
    } catch {
      setResendResult("Failed to resend email. Please check your connection and try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        {/* Top Lime accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7FF00]" />

        {/* Loading State */}
        {loading && (
          <div className="py-6 space-y-4">
            <Loader2 className="w-12 h-12 text-[#B7FF00] animate-spin mx-auto" />
            <h1 className="font-sora text-xl font-bold uppercase text-[#FFFFFF] tracking-tight">
              Verifying Your Email...
            </h1>
            <p className="font-inter text-xs text-[#9CA3AF] max-w-xs mx-auto">
              Please wait while we validate your security token with our servers.
            </p>
          </div>
        )}

        {/* Success State */}
        {!loading && success && (
          <div className="py-4 space-y-5">
            <div className="w-16 h-16 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(183,255,0,0.15)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#2A2A2A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
              <span className="font-barlow text-xs font-bold tracking-widest text-[#B7FF00] uppercase">
                ACCOUNT ACTIVATED
              </span>
            </div>

            <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
              Email Verified!
            </h1>

            <p className="font-inter text-sm text-[#9CA3AF] leading-relaxed">
              {statusMessage || "Your email has been confirmed and your B2B account is now fully active."}
            </p>

            <div className="p-3 bg-[#050505] border border-[#2A2A2A] text-xs font-inter text-[#777777]">
              Redirecting you to your account dashboard in a moment...
            </div>

            <div className="pt-2">
              <Link
                href="/account"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
              >
                <span>Go to Account Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Error / Expired / Invalid State */}
        {!loading && !success && (
          <div className="py-4 space-y-5">
            <div className="w-16 h-16 bg-[#050505] border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h1 className="font-sora text-xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
              {errorReason === "EXPIRED"
                ? "Verification Link Expired"
                : errorReason === "ALREADY_USED"
                ? "Link Already Used"
                : "Verification Failed"}
            </h1>

            <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              {errorMessage}
            </p>

            {/* Resend Verification Form */}
            <div className="pt-4 border-t border-[#2A2A2A] text-left">
              <p className="font-sora text-xs font-bold uppercase text-[#D1D5DB] mb-3">
                Request a Fresh Verification Link
              </p>

              {resendResult && (
                <div className="mb-3 p-3 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] text-xs font-inter">
                  {resendResult}
                </div>
              )}

              <form onSubmit={handleResend} className="space-y-3">
                <input
                  type="email"
                  required
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#555555] font-inter text-xs focus:outline-none focus:border-[#B7FF00]"
                />
                <button
                  type="submit"
                  disabled={resending}
                  className="w-full py-2.5 px-4 bg-[#2A2A2A] text-[#FFFFFF] hover:bg-[#333333] font-sora text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {resending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B7FF00]" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 text-[#B7FF00]" />
                      <span>Send New Link</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="pt-3 border-t border-[#2A2A2A]">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-xs font-sora font-bold text-[#B7FF00] hover:underline uppercase"
              >
                <span>Return to Sign In</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505]">
          <Loader2 className="w-8 h-8 text-[#B7FF00] animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
