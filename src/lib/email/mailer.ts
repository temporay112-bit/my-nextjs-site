/**
 * SLOTS SPORTSWEAR — Server-Only Nodemailer Transporter Service
 *
 * Handles SMTP transporter creation, connection verification,
 * and standard email delivery via Gmail SMTP.
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function getEmailCredentials() {
  const user = (process.env.EMAIL_USER || "shahrangujjar00@gmail.com").trim();
  const rawPass = process.env.EMAIL_PASS || "";
  // Google App Passwords are 16 characters (often copied with spaces). Strip any internal spaces.
  const pass = rawPass.replace(/\s+/g, "").trim();
  const from = (process.env.EMAIL_FROM || `"SLOTS SPORTSWEAR" <${user}>`).trim();
  const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false" && port === 465;

  return { user, pass, from, host, port, secure };
}

let cachedTransporter: Transporter | null = null;
let lastPassSignature = "";

/**
 * Returns a configured Nodemailer Transporter instance.
 * Recreates transporter if credentials change dynamically.
 */
export function getTransporter(): Transporter {
  const { user, pass, host, port, secure } = getEmailCredentials();
  const currentSignature = `${user}:${pass.length}:${host}:${port}:${secure}`;

  if (cachedTransporter && lastPassSignature === currentSignature) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  lastPassSignature = currentSignature;
  return cachedTransporter;
}

/**
 * Test SMTP connection and credentials
 */
export async function verifySmtpConnection(): Promise<{ success: boolean; message: string; error?: string }> {
  const { pass, user } = getEmailCredentials();

  if (!pass) {
    return {
      success: false,
      message: "SMTP authentication failed: EMAIL_PASS is missing in environment variables.",
      error: "MISSING_CREDENTIALS",
    };
  }

  try {
    const transporter = getTransporter();
    await transporter.verify();
    return {
      success: true,
      message: `SMTP connection and authentication verified successfully for ${user}.`,
    };
  } catch (error: any) {
    const safeError = error?.message ? error.message.replace(pass, "[REDACTED]") : "Unknown SMTP error";
    console.error("[Nodemailer Connection Error]:", safeError);
    return {
      success: false,
      message: "Failed to authenticate with SMTP server.",
      error: safeError,
    };
  }
}

/**
 * Send an email with strict real SMTP delivery enforcement.
 * Never silently fall back to mock success if credentials are missing.
 */
export async function sendMail(options: SendMailOptions): Promise<EmailDeliveryResult> {
  const { to, subject, html, text, replyTo } = options;
  const { pass, from, user } = getEmailCredentials();

  if (!pass) {
    const errMsg = "EMAIL_PASS is missing in environment variables. Real email delivery could not be performed.";
    console.error(`[Nodemailer Error]: ${errMsg} (Target: ${to}, Subject: "${subject}")`);
    return {
      success: false,
      error: errMsg,
    };
  }

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from,
      to,
      replyTo: replyTo || undefined,
      subject,
      text,
      html,
    });

    console.log(`[Nodemailer Real Delivery]: Message accepted by Gmail SMTP (messageId: ${info.messageId}, to: ${to})`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    const safeError = error?.message ? error.message.replace(pass, "[REDACTED]") : "Failed to deliver email.";
    console.error(`[Nodemailer Error]: Failed sending email to ${to}:`, safeError);
    return {
      success: false,
      error: safeError,
    };
  }
}
