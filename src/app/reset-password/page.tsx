"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawToken = searchParams.get("token") || "";
  const token = rawToken.trim();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorReason, setErrorReason] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setErrorReason(null);

    if (!token) {
      setErrorReason("INVALID");
      setErrorMessage("Missing password reset token in link. Please request a fresh reset link.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorReason(data.reason || "INVALID");
        setErrorMessage(data.error || "Failed to reset password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
      setLoading(false);
    }
  };

  // ── Success State View ──────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7FF00]" />

          <div className="w-16 h-16 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(183,255,0,0.15)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#2A2A2A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
            <span className="font-barlow text-xs font-bold tracking-widest text-[#B7FF00] uppercase">
              SECURITY UPDATED
            </span>
          </div>

          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF] mb-3 tracking-tight">
            Password Reset!
          </h1>

          <p className="font-inter text-sm text-[#9CA3AF] leading-relaxed mb-8">
            Your account password has been updated securely. You can now sign in with your new credentials.
          </p>

          <Link
            href="/login"
            className="w-full py-3.5 px-6 bg-[#B7FF00] text-[#050505] hover:bg-[#A3E600] font-sora text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <span>Sign In to Your Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ── Missing Token Prompt ────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="w-16 h-16 bg-[#050505] border border-amber-800 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>

          <h1 className="font-sora text-xl font-extrabold uppercase text-[#FFFFFF] mb-3 tracking-tight">
            Invalid Reset Link
          </h1>

          <p className="font-inter text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-8">
            No password reset token was provided. Please use the link sent to your email address or request a fresh one.
          </p>

          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold uppercase tracking-wider hover:bg-[#A3E600] transition-colors"
          >
            <span>Request Password Reset</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // ── Reset Password Form ─────────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 relative shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7FF00]" />

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#2A2A2A] mb-4">
            <KeyRound className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
              CREATE NEW PASSWORD
            </span>
          </div>

          <h1 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
            Set New Password
          </h1>

          <p className="font-inter text-xs sm:text-sm text-[#777777] mt-1.5">
            Choose a strong password (minimum 8 characters) for your SLOTS SPORTSWEAR account.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs font-inter space-y-2"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            {(errorReason === "EXPIRED" || errorReason === "ALREADY_USED" || errorReason === "INVALID") && (
              <div className="pt-2">
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-[#B7FF00] hover:underline"
                >
                  Request a new password reset link &rarr;
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* New Password */}
          <div>
            <label
              htmlFor="reset-password"
              className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
            >
              New Password <span className="text-[#777777] font-normal lowercase">(min. 8 chars)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="reset-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 bg-[#050505] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#555555] font-inter text-sm focus:outline-none focus:border-[#B7FF00] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#777777] hover:text-[#FFFFFF]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="reset-confirm-password"
              className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="reset-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 bg-[#050505] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#555555] font-inter text-sm focus:outline-none focus:border-[#B7FF00] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#777777] hover:text-[#FFFFFF]"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
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
                <span>UPDATING PASSWORD...</span>
              </>
            ) : (
              <>
                <span>RESET PASSWORD</span>
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505]">
          <Loader2 className="w-8 h-8 text-[#B7FF00] animate-spin" />
        </div>
      }
    >
      <ResetPasswordFormContent />
    </Suspense>
  );
}
