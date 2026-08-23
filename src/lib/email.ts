/**
 * SLOTS SPORTSWEAR — Email Service
 *
 * Transactional email templates and delivery for:
 * 1. B2B Quote Requests / Inquiry Notifications to factory team
 * 2. Account Verification Emails with secure activation tokens
 * 3. Password Reset Notifications
 */

import { getTransporter, sendMail, verifySmtpConnection } from "./email/mailer";
import type { EmailDeliveryResult } from "./email/mailer";
import { InquiryInput } from "@/lib/validations";
import { getPublicOrigin, buildResetPasswordUrl, buildVerifyEmailUrl } from "@/lib/url";

export { getTransporter, verifySmtpConnection, getPublicOrigin, buildResetPasswordUrl, buildVerifyEmailUrl };
export type { EmailDeliveryResult };

function getQuoteReceiver(): string {
  return process.env.QUOTE_RECEIVER_EMAIL || process.env.EMAIL_USER || "shahrangujjar00@gmail.com";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 1. Send B2B Quote Inquiry Notification to Factory
 */
export async function sendQuoteNotificationEmail(
  inquiry: InquiryInput,
  inquiryId: string,
  createdAt: string = new Date().toISOString()
): Promise<EmailDeliveryResult> {
  const subject = `New SLOTS SPORTSWEAR B2B Quote Request — ${inquiry.company}`;

  let fileHtml = '<span style="color:#777777;">No file attached</span>';
  let fileText = "No file attached";

  if (inquiry.fileReference) {
    const rawRef = inquiry.fileReference;
    const isUrl = rawRef.startsWith("http://") || rawRef.startsWith("https://");
    const fileUrl = isUrl
      ? rawRef
      : `${getPublicOrigin()}${rawRef.startsWith("/") ? "" : "/"}${rawRef}`;
    const filename = isUrl ? rawRef.split("/").pop() || "TechPack-Attachment" : rawRef;

    fileHtml = `
      <div>
        <span style="color:#FFFFFF;font-weight:bold;display:block;margin-bottom:6px;">${escapeHtml(filename)}</span>
        <a href="${escapeHtml(fileUrl)}" target="_blank" rel="noopener noreferrer" 
           style="display:inline-block;padding:8px 18px;background-color:#2A2A2A;color:#B7FF00;font-size:12px;font-weight:bold;text-decoration:none;border-radius:4px;border:1px solid #B7FF00;text-transform:uppercase;letter-spacing:1px;">
          OPEN / DOWNLOAD TECH PACK &rarr;
        </a>
      </div>
    `;
    fileText = `${filename} (${fileUrl})`;
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E9E9E9;">
  <div style="max-width:600px;margin:0 auto;padding:24px;background-color:#171717;border:1px solid #2A2A2A;">
    <div style="border-bottom:2px solid #B7FF00;padding-bottom:16px;margin-bottom:20px;">
      <h1 style="color:#FFFFFF;font-size:20px;margin:0;text-transform:uppercase;letter-spacing:1.5px;">SLOTS SPORTSWEAR</h1>
      <p style="color:#B7FF00;font-size:12px;margin:4px 0 0 0;font-weight:bold;letter-spacing:1px;">NEW B2B QUOTATION INQUIRY</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;">
      <tr><td style="padding:8px 0;color:#777777;width:130px;">Inquiry ID:</td><td style="color:#FFFFFF;font-weight:bold;">#${escapeHtml(inquiryId)}</td></tr>
      <tr><td style="padding:8px 0;color:#777777;">Client Name:</td><td style="color:#FFFFFF;">${escapeHtml(inquiry.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#777777;">Company:</td><td style="color:#B7FF00;font-weight:bold;">${escapeHtml(inquiry.company)}</td></tr>
      ${inquiry.email ? `<tr><td style="padding:8px 0;color:#777777;">Email:</td><td><a href="mailto:${escapeHtml(inquiry.email)}" style="color:#B7FF00;">${escapeHtml(inquiry.email)}</a></td></tr>` : ""}
      ${inquiry.phone ? `<tr><td style="padding:8px 0;color:#777777;">Phone / WhatsApp:</td><td style="color:#FFFFFF;">${escapeHtml(inquiry.phone)}</td></tr>` : ""}
      <tr><td style="padding:8px 0;color:#777777;">Product Category:</td><td style="color:#FFFFFF;">${escapeHtml(inquiry.productCategory || "General Sportswear")}</td></tr>
      <tr><td style="padding:8px 0;color:#777777;">Received At:</td><td style="color:#FFFFFF;">${escapeHtml(createdAt)}</td></tr>
    </table>
    <div style="background-color:#050505;padding:16px;border:1px solid #2A2A2A;margin-bottom:20px;">
      <h3 style="color:#FFFFFF;font-size:13px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:0.5px;">Project Details / Message:</h3>
      <p style="color:#D1D5DB;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</p>
    </div>
    <div style="background-color:#050505;padding:16px;border:1px solid #2A2A2A;margin-bottom:20px;">
      <h3 style="color:#FFFFFF;font-size:13px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:0.5px;">Tech Pack / Artwork Attachment:</h3>
      ${fileHtml}
    </div>
    <div style="font-size:11px;color:#777777;text-align:center;padding-top:16px;border-top:1px solid #2A2A2A;">
      SLOTS SPORTSWEAR &bull; Small Industrial Estate, Sialkot 51310, Punjab, Pakistan
    </div>
  </div>
</body>
</html>
`;

  const text = `SLOTS SPORTSWEAR — B2B QUOTATION INQUIRY
Inquiry ID: #${inquiryId}
Client: ${inquiry.name}
Company: ${inquiry.company}
Email: ${inquiry.email || "N/A"}
Phone: ${inquiry.phone || "N/A"}
Category: ${inquiry.productCategory || "General Sportswear"}
Received: ${createdAt}

Project Details / Message:
${inquiry.message}

Tech Pack / Attachment:
${fileText}
`;

  return sendMail({
    to: getQuoteReceiver(),
    subject,
    html,
    text,
    replyTo: inquiry.email || undefined,
  });
}

/**
 * 2. Send Customer Email Verification Link
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  tokenOrUrl: string,
  request?: Parameters<typeof buildVerifyEmailUrl>[1]
): Promise<EmailDeliveryResult> {
  const verifyUrl = tokenOrUrl.startsWith("http://") || tokenOrUrl.startsWith("https://")
    ? tokenOrUrl
    : buildVerifyEmailUrl(tokenOrUrl, request);
  const subject = "Verify Your SLOTS SPORTSWEAR Account";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E9E9E9;">
  <div style="max-width:560px;margin:40px auto;padding:32px;background-color:#171717;border:1px solid #2A2A2A;">
    <div style="border-bottom:2px solid #B7FF00;padding-bottom:16px;margin-bottom:24px;text-align:center;">
      <h1 style="color:#FFFFFF;font-size:22px;margin:0;text-transform:uppercase;letter-spacing:1.5px;">SLOTS SPORTSWEAR</h1>
      <p style="color:#B7FF00;font-size:12px;margin:4px 0 0 0;font-weight:bold;letter-spacing:1px;">ACCOUNT VERIFICATION</p>
    </div>
    
    <h2 style="color:#FFFFFF;font-size:18px;margin:0 0 12px 0;">Hello ${escapeHtml(name)},</h2>
    <p style="color:#9CA3AF;font-size:14px;line-height:1.6;margin:0 0 24px 0;">
      Thank you for registering with SLOTS SPORTSWEAR. Please verify your email address to activate your B2B manufacturing and client portal access.
    </p>

    <div style="text-align:center;margin:32px 0;">
      <a href="${verifyUrl}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;padding:14px 32px;background-color:#B7FF00;color:#050505;font-size:14px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">
        VERIFY EMAIL ADDRESS &rarr;
      </a>
    </div>

    <p style="color:#777777;font-size:12px;line-height:1.5;margin:24px 0 0 0;">
      If the button above does not work, copy and paste this link into your browser:<br>
      <a href="${verifyUrl}" style="color:#B7FF00;word-break:break-all;">${verifyUrl}</a>
    </p>

    <div style="font-size:11px;color:#555555;text-align:center;padding-top:24px;margin-top:32px;border-top:1px solid #2A2A2A;">
      This verification link is valid for 24 hours. If you did not create an account, you can safely ignore this email.<br>
      SLOTS SPORTSWEAR &bull; Sialkot 51310, Punjab, Pakistan
    </div>
  </div>
</body>
</html>
`;

  const text = `Hello ${name},

Thank you for registering with SLOTS SPORTSWEAR. Please verify your email address to activate your account:
${verifyUrl}

This link is valid for 24 hours.
If you did not request this, you can safely ignore this email.
`;

  return sendMail({
    to: email,
    subject,
    html,
    text,
  });
}

/**
 * 3. Send Password Reset Email Link
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  tokenOrUrl: string,
  request?: Parameters<typeof buildResetPasswordUrl>[1]
): Promise<EmailDeliveryResult> {
  const resetUrl = tokenOrUrl.startsWith("http://") || tokenOrUrl.startsWith("https://")
    ? tokenOrUrl
    : buildResetPasswordUrl(tokenOrUrl, request);
  const subject = "SLOTS SPORTSWEAR PASSWORD RESET REQUEST";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E9E9E9;">
  <div style="max-width:560px;margin:40px auto;padding:32px;background-color:#171717;border:1px solid #2A2A2A;">
    <div style="border-bottom:2px solid #B7FF00;padding-bottom:16px;margin-bottom:24px;text-align:center;">
      <h1 style="color:#FFFFFF;font-size:22px;margin:0;text-transform:uppercase;letter-spacing:1.5px;">SLOTS SPORTSWEAR</h1>
      <p style="color:#B7FF00;font-size:12px;margin:4px 0 0 0;font-weight:bold;letter-spacing:1px;">PASSWORD RESET REQUEST</p>
    </div>
    
    <h2 style="color:#FFFFFF;font-size:18px;margin:0 0 12px 0;">Hello ${escapeHtml(name)},</h2>
    <p style="color:#9CA3AF;font-size:14px;line-height:1.6;margin:0 0 24px 0;">
      We received a request to reset your password for your SLOTS SPORTSWEAR account. Click the button below to choose a new password.
    </p>

    <div style="text-align:center;margin:32px 0;">
      <a href="${resetUrl}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;padding:14px 32px;background-color:#B7FF00;color:#050505;font-size:14px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">
        RESET PASSWORD &rarr;
      </a>
    </div>

    <p style="color:#777777;font-size:12px;line-height:1.5;margin:24px 0 0 0;">
      If the button above does not work, copy and paste this link into your browser:<br>
      <a href="${resetUrl}" style="color:#B7FF00;word-break:break-all;">${resetUrl}</a>
    </p>

    <div style="font-size:11px;color:#555555;text-align:center;padding-top:24px;margin-top:32px;border-top:1px solid #2A2A2A;">
      This password reset link is valid for 1 hour. If you did not request a password reset, you can safely ignore this email.<br>
      SLOTS SPORTSWEAR &bull; Sialkot 51310, Punjab, Pakistan
    </div>
  </div>
</body>
</html>
`;

  const text = `Hello ${name},

We received a request to reset your password for your SLOTS SPORTSWEAR account.
Click or visit the link below to choose a new password:
${resetUrl}

This link is valid for 1 hour.
If you did not request this change, you can safely ignore this email.
`;

  return sendMail({
    to: email,
    subject,
    html,
    text,
  });
}
