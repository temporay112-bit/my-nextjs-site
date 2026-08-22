import { NextRequest, NextResponse } from "next/server";
import { validateInquiryInput } from "@/lib/validations";
import { createInquiry } from "@/lib/db";
import { sendQuoteNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = validateInquiryInput(body);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check the highlighted fields and try again.",
          errors: validation.errors,
        },
        { status: 422 }
      );
    }

    // Persist inquiry record in DB
    const inquiryRecord = await createInquiry(validation.data);

    // Dispatch real email to receiver (shahrangujjar00@gmail.com) via Resend
    const emailResult = await sendQuoteNotificationEmail(
      validation.data,
      inquiryRecord.id,
      inquiryRecord.createdAt
    );

    if (!emailResult.success) {
      console.warn(
        `[Inquiry #${inquiryRecord.id}] Email delivery warning: ${emailResult.error}`
      );
    }

    return NextResponse.json(
      {
        success: true,
        inquiryId: inquiryRecord.id,
        message: "Thanks — your inquiry has been received. Our team will review your project details and follow up promptly.",
        createdAt: inquiryRecord.createdAt,
        emailDelivered: emailResult.success,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[API Inquiry Error]:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting your inquiry. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}

