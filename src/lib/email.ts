/**
 * SLOTS SPORTSWEAR — Email Service
 *
 * Secure server-side transactional email delivery for B2B quote inquiries.
 * Uses Resend API via native HTTPS fetch.
 *
 * FEATURES:
 * - Direct clickable access link for uploaded Tech Pack files.
 * - Handles Email-only, Phone-only, and Both contact submissions.
 * - Sanitizes all user inputs before HTML rendering.
 * - Dynamic Reply-To header when email exists.
 */

import { InquiryInput } from "@/lib/validations";

interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendQuoteNotificationEmail(
  inquiry: InquiryInput,
  inquiryId: string,
  createdAt: string
): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.QUOTE_RECEIVER_EMAIL || "shahrangujjar00@gmail.com";
  const fromEmail = process.env.QUOTE_FROM_EMAIL || "SLOTS SPORTSWEAR <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[Email Service Error]: RESEND_API_KEY is not configured in environment variables.");
    return {
      success: false,
      error: "Email service not configured.",
    };
  }

  const subject = `New SLOTS SPORTSWEAR B2B Quote Request — ${inquiry.company}`;

  // Build file reference and clickable link
  let fileHtml = '<span style="color:#777777;">No file attached</span>';
  let fileText = "No file attached";

  if (inquiry.fileReference) {
    const rawRef = inquiry.fileReference;
    const isUrl = rawRef.startsWith("http://") || rawRef.startsWith("https://");
    const fileUrl = isUrl
      ? rawRef
      : `/api/upload/file?pathname=${encodeURIComponent(rawRef)}`;
    const filename = rawRef.split("/").pop() || "Tech Pack";

    fileHtml = `
      <div>
        <span style="color:#FFFFFF;font-weight:bold;display:block;margin-bottom:6px;">${escapeHtml(filename)}</span>
        <a href="${escapeHtml(fileUrl)}" target="_blank" rel="noopener noreferrer" 
           style="display:inline-block;padding:7px 16px;background-color:#2A2A2A;color:#B7FF00;font-size:12px;font-weight:bold;text-decoration:none;border-radius:6px;border:1px solid #B7FF00;">
          OPEN / DOWNLOAD TECH PACK &rarr;
        </a>
      </div>
    `;
    fileText = `${filename} (${fileUrl})`;
  }

  // Build contact details section
  const contactRows: string[] = [];
  if (inquiry.email) {
    contactRows.push(`
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;width:140px;">Business Email:</td>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#B7FF00;font-size:14px;">
          <a href="mailto:${escapeHtml(inquiry.email)}" style="color:#B7FF00;text-decoration:none;">${escapeHtml(inquiry.email)}</a>
        </td>
      </tr>
    `);
  }
  if (inquiry.phone) {
    contactRows.push(`
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;width:140px;">Phone / WhatsApp:</td>
        <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;font-weight:bold;">
          <a href="tel:${escapeHtml(inquiry.phone)}" style="color:#FFFFFF;text-decoration:none;">${escapeHtml(inquiry.phone)}</a>
        </td>
      </tr>
    `);
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#050505;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#171717;border-radius:12px;border:1px solid #2A2A2A;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding:28px 32px;background-color:#050505;border-bottom:2px solid #B7FF00;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size:20px;font-weight:900;letter-spacing:2px;color:#FFFFFF;text-transform:uppercase;">
                      SLOTS <span style="color:#B7FF00;">SPORTSWEAR</span>
                    </div>
                    <div style="font-size:11px;color:#777777;letter-spacing:1px;text-transform:uppercase;margin-top:4px;">
                      B2B Manufacturing Inquiry Notification
                    </div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:4px 10px;background-color:#2A2A2A;color:#B7FF00;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;border-radius:4px;">
                      NEW QUOTE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 20px;font-size:18px;font-weight:bold;color:#FFFFFF;text-transform:uppercase;letter-spacing:0.5px;">
                Inquiry Details (#${escapeHtml(inquiryId)})
              </h2>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;width:140px;">Brand / Company:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;font-weight:bold;">${escapeHtml(inquiry.company)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">Contact Name:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;">${escapeHtml(inquiry.name)}</td>
                </tr>
                ${contactRows.join("")}
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">Product Category:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;text-transform:capitalize;">${escapeHtml(inquiry.productCategory)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;vertical-align:top;">Uploaded File:</td>
                  <td style="padding:12px 0;border-bottom:1px solid #2A2A2A;color:#FFFFFF;font-size:14px;">
                    ${fileHtml}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">Timestamp:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #2A2A2A;color:#777777;font-size:13px;">${escapeHtml(createdAt)}</td>
                </tr>
              </table>

              <!-- Project Requirements Box -->
              <div style="margin-top:20px;padding:16px;background-color:#050505;border:1px solid #2A2A2A;border-radius:8px;">
                <div style="font-size:11px;font-weight:bold;color:#777777;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
                  Project Requirements & Specifications:
                </div>
                <div style="font-size:14px;color:#E9E9E9;line-height:1.6;white-space:pre-wrap;">
${escapeHtml(inquiry.message)}
                </div>
              </div>

              <!-- Quick Reply / Contact Buyer CTA -->
              <div style="margin-top:28px;text-align:center;">
                ${
                  inquiry.email
                    ? `<a href="mailto:${escapeHtml(inquiry.email)}?subject=Re:%20SLOTS%20SPORTSWEAR%20Quote%20Inquiry%20(${escapeHtml(inquiry.company)})" 
                          style="display:inline-block;padding:12px 28px;background-color:#B7FF00;color:#050505;font-size:13px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;border-radius:999px;">
                         Reply Directly via Email
                       </a>`
                    : inquiry.phone
                    ? `<a href="https://wa.me/${escapeHtml(inquiry.phone.replace(/[^0-9]/g, ''))}" 
                          style="display:inline-block;padding:12px 28px;background-color:#B7FF00;color:#050505;font-size:13px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;border-radius:999px;">
                         Contact Buyer on WhatsApp
                       </a>`
                    : ""
                }
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background-color:#050505;border-top:1px solid #2A2A2A;text-align:center;font-size:11px;color:#777777;">
              This notification was generated automatically by the SLOTS SPORTSWEAR Website Inquiry System.<br>
              Direct contact email: <a href="mailto:${escapeHtml(receiverEmail)}" style="color:#777777;">${escapeHtml(receiverEmail)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const textContent = `
NEW SLOTS SPORTSWEAR B2B QUOTE REQUEST
=========================================

Inquiry ID: #${inquiryId}
Company: ${inquiry.company}
Contact Name: ${inquiry.name}
Email: ${inquiry.email || "Not provided"}
Phone / WhatsApp: ${inquiry.phone || "Not provided"}
Product Category: ${inquiry.productCategory}
Uploaded File: ${fileText}
Timestamp: ${createdAt}

PROJECT REQUIREMENTS:
---------------------
${inquiry.message}

=========================================
`;

  try {
    const payload: {
      from: string;
      to: string[];
      reply_to?: string;
      subject: string;
      html: string;
      text: string;
    } = {
      from: fromEmail,
      to: [receiverEmail],
      subject: subject,
      html: htmlContent,
      text: textContent,
    };

    if (inquiry.email) {
      payload.reply_to = inquiry.email;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Resend API Error]:", data);
      return {
        success: false,
        error: data.message || "Failed to send email notification.",
      };
    }

    return {
      success: true,
      messageId: data.id,
    };
  } catch (err: unknown) {
    console.error("[Email Transport Error]:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error during email dispatch.",
    };
  }
}
