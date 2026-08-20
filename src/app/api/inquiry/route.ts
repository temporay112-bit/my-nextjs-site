import { NextRequest, NextResponse } from "next/server";
import { validateInquiryInput } from "@/lib/validations";
import { createInquiry } from "@/lib/db";

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

    const inquiryRecord = await createInquiry(validation.data);

    return NextResponse.json(
      {
        success: true,
        inquiryId: inquiryRecord.id,
        message: "Thanks — your inquiry has been received. Our team will review your project details.",
        createdAt: inquiryRecord.createdAt,
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
