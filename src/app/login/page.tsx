"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);

  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setNeedsVerification(false);
    setResendStatus(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your business email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your account password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.needsVerification) {
          setNeedsVerification(true);
        }
        setErrorMessage(data.error || "Authentication failed. Please verify your credentials.");
        setLoading(false);
        return;
      }

      // Safe role-based destination resolution
      if (redirectPath && redirectPath.startsWith("/")) {
        router.push(redirectPath);
      } else if (data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
      router.refresh();
    } catch {
      setErrorMessage("Network error occurred. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim()) {
      setErrorMessage("Please provide your email address to receive a new verification link.");
      return;
    }
    setResending(true);
    setResendStatus(null);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      setResendStatus(data.message || "A fresh verification link has been sent to your email.");
    } catch {
      setResendStatus("Failed to resend verification email. Please try again in a moment.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row bg-[#050505]">
      {/* Left Column: Brand Statement */}
      <div className="lg:w-5/12 bg-[#0A0A0A] text-[#FFFFFF] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#2A2A2A]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#2A2A2A] mb-8">
            <Shield className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span className="font-barlow text-[11px] font-bold tracking-widest text-[#B7FF00] uppercase">
              B2B CLIENT &amp; ADMIN PORTAL
            </span>
          </div>

          <h1 className="font-sora text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight leading-tight text-[#FFFFFF]">
            SLOTS SPORTSWEAR <br />
            <span className="text-[#B7FF00]">SIGN IN</span>
          </h1>

          <p className="font-inter text-sm text-[#9CA3AF] mt-4 leading-relaxed max-w-md">
            Sign in to access your manufacturing quotation dashboard, review production statuses, download invoices, and manage your account.
          </p>

          <div className="mt-8 space-y-4 max-w-md">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#B7FF00] flex-shrink-0 mt-0.5" />
              <span className="font-inter text-xs sm:text-sm text-[#D1D5DB]">
                Manage active quotations, inquiries &amp; order milestones
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#B7FF00] flex-shrink-0 mt-0.5" />
              <span className="font-inter text-xs sm:text-sm text-[#D1D5DB]">
                Direct factory communication &amp; tech pack approvals
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#B7FF00] flex-shrink-0 mt-0.5" />
              <span className="font-inter text-xs sm:text-sm text-[#D1D5DB]">
                Secure role-based administration for factory operations
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#2A2A2A] text-xs font-inter text-[#777777]">
          SLOTS SPORTSWEAR &bull; Small Industrial Estate, Sialkot 51310, Punjab, Pakistan
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="lg:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#050505]">
        <div className="w-full max-w-md bg-[#171717] border border-[#2A2A2A] p-8 sm:p-12 relative shadow-2xl">
          <div className="mb-8">
            <h2 className="font-sora text-2xl font-extrabold uppercase text-[#FFFFFF] tracking-tight">
              Sign In
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#777777] mt-1">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#B7FF00] hover:underline font-semibold">
                Register for B2B access
              </Link>
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-6 p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs font-inter flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{errorMessage}</p>
                {needsVerification && (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#B7FF00] hover:underline disabled:opacity-50"
                  >
                    {resending ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Sending new link...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3" />
                        <span>Resend verification email &rarr;</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {resendStatus && (
            <div className="mb-6 p-3 bg-[#050505] border border-[#B7FF00]/40 text-[#B7FF00] text-xs font-inter">
              {resendStatus}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="login-email"
                className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-2"
              >
                Business Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="buyer@yourcompany.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#050505] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#555555] font-inter text-sm focus:outline-none focus:border-[#B7FF00] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="login-password"
                  className="block font-sora text-xs font-bold uppercase tracking-wider text-[#D1D5DB]"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="font-inter text-xs text-[#777777] hover:text-[#B7FF00] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777777]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-[#B7FF00] text-[#050505] hover:bg-[#A3E600] font-sora text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <span>SIGN IN TO B2B PORTAL</span>
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-[#050505]">
          <Loader2 className="w-8 h-8 text-[#B7FF00] animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
