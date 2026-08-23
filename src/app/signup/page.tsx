"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MailCheck,
  Eye,
  EyeOff,
  Building2,
  Lock,
  Mail,
  User as UserIcon,
  RefreshCw,
} from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Please enter a valid business or personal email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify your confirm password field.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Registration failed. Please check your information.");
        setLoading(false);
        return;
      }

      setSubmittedEmail(email.trim());
      setLoading(false);
    } catch {
      setErrorMessage("Network connection error. Please try again.");
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!submittedEmail) return;
    setResending(true);
    setResendStatus(null);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submittedEmail }),
      });
      const data = await res.json();
      setResendStatus(data.message || "A fresh verification link has been sent to your email.");
    } catch {
      setResendStatus("Failed to resend verification email. Please try again in a moment.");
    } finally {
      setResending(false);
    }
  };

  // ── Verification Pending View ───────────────────────────────────────────────
  if (submittedEmail) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505] p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-xl bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Top Lime accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7FF00]" />

          <div className="w-16 h-16 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(183,255,0,0.15)]">
            <MailCheck className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#050505] border border-[#2A2A2A] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] animate-pulse" />
            <span className="font-barlow text-xs font-bold tracking-widest text-[#B7FF00] uppercase">
              STEP 2 OF 2: VERIFICATION PENDING
            </span>
          </div>

          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold uppercase text-[#FFFFFF] mb-3 tracking-tight">
            Check Your Email
          </h1>

          <p className="font-inter text-sm text-[#9CA3AF] leading-relaxed mb-6 max-w-md mx-auto">
            We have dispatched an activation link to{" "}
            <strong className="text-[#FFFFFF] font-semibold">{submittedEmail}</strong>.
            Please click the button inside the email to verify your account and activate your B2B client portal access.
          </p>

          <div className="p-4 bg-[#050505] border border-[#2A2A2A] text-left text-xs font-inter text-[#777777] space-y-2 mb-8 max-w-md mx-auto">
            <p className="flex items-center gap-2">
              <span className="text-[#B7FF00] font-bold">&bull;</span>
              Check your Spam/Junk folder if you don&apos;t receive it within 60 seconds.
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#B7FF00] font-bold">&bull;</span>
              The activation link expires automatically in 24 hours.
            </p>
          </div>

          {resendStatus && (
            <div className="mb-6 p-3 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] text-xs font-inter max-w-md mx-auto">
              {resendStatus}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <button
              onClick={handleResendVerification}
              disabled={resending}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#2A2A2A] text-[#FFFFFF] hover:bg-[#333333] font-sora text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {resending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B7FF00]" />
                  <span>Resending...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-[#B7FF00]" />
                  <span>Resend Email</span>
                </>
              )}
            </button>

            <Link
              href="/login"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#B7FF00] text-[#050505] hover:bg-[#A3E600] font-sora text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Go to Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Signup Form View ────────────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row bg-[#050505]">
      {/* Left Column: Brand Statement & Steps */}
      <div className="lg:w-5/12 bg-[#0A0A0A] text-[#FFFFFF] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#2A2A2A]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#2A2A2A] mb-8">
            <Shield className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
              B2B CLIENT REGISTRATION
            </span>
          </div>

          <h1 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight leading-tight text-[#FFFFFF]">
            SLOTS SPORTSWEAR <br />
            <span className="text-[#B7FF00]">CLIENT PORTAL</span>
          </h1>

          <p className="font-inter text-sm text-[#9CA3AF] mt-4 leading-relaxed max-w-md">
            Register your brand or enterprise account to access bulk custom sportswear manufacturing, direct RFQ quotations, tech pack management, and end-to-end production tracking.
          </p>

          {/* Steps Indicator */}
          <div className="mt-8 pt-8 border-t border-[#2A2A2A] space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#B7FF00] text-[#050505] font-sora text-xs font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-sora text-xs font-bold uppercase text-[#FFFFFF]">Account Information</p>
                <p className="font-inter text-[11px] text-[#777777]">Enter company buyer details & credentials</p>
              </div>
            </div>

            <div className="flex items-center gap-3 opacity-60">
              <div className="w-6 h-6 rounded-full bg-[#2A2A2A] text-[#9CA3AF] font-sora text-xs font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-sora text-xs font-bold uppercase text-[#9CA3AF]">Email Verification</p>
                <p className="font-inter text-[11px] text-[#777777]">Activate your account via email confirmation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits list */}
        <div className="mt-8 pt-8 border-t border-[#2A2A2A] space-y-3">
          <div className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
            <CheckCircle2 className="w-4 h-4 text-[#B7FF00] flex-shrink-0" />
            <span>Direct factory pricing with low MOQs (50 pcs/style)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
            <CheckCircle2 className="w-4 h-4 text-[#B7FF00] flex-shrink-0" />
            <span>Dedicated production & export team in Sialkot, Pakistan</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
            <CheckCircle2 className="w-4 h-4 text-[#B7FF00] flex-shrink-0" />
            <span>Certified ISO 9001, BSCI, OEKO-TEX & SEDEX facility</span>
          </div>
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="lg:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#050505]">
        <div className="w-full max-w-lg bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 relative shadow-2xl">
          <div className="mb-8">
            <h2 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
              Create B2B Account
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#777777] mt-1">
              Already have an account?{" "}
              <Link href="/login" className="text-[#B7FF00] hover:underline font-semibold">
                Sign in here
              </Link>
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
            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
              >
                Full Name / Representative <span className="text-[#B7FF00]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full pl-10 pr-4 py-3 bg-[#050505] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#555555] font-inter text-sm focus:outline-none focus:border-[#B7FF00] transition-colors"
                />
              </div>
            </div>

            {/* Business Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
              >
                Business Email Address <span className="text-[#B7FF00]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="buyer@yourcompany.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#050505] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#555555] font-inter text-sm focus:outline-none focus:border-[#B7FF00] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
              >
                Password <span className="text-[#B7FF00]">*</span>{" "}
                <span className="text-[#777777] font-normal lowercase">(min. 8 characters)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-password"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm-password"
                className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
              >
                Confirm Password <span className="text-[#B7FF00]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-confirm-password"
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

            <p className="text-[11px] text-[#777777] font-inter leading-relaxed">
              By creating an account, you agree to the SLOTS SPORTSWEAR{" "}
              <Link href="/terms" className="text-[#D1D5DB] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#D1D5DB] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-[#B7FF00] text-[#050505] hover:bg-[#A3E600] font-sora text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>CREATING ACCOUNT...</span>
                </>
              ) : (
                <>
                  <span>CREATE B2B ACCOUNT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
