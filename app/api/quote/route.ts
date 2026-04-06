import { NextRequest, NextResponse } from "next/server";
import { BUSINESS_INFO } from "@/lib/business";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/quote
//
// Receives the quote form submission and:
// 1. Validates the payload
// 2. Logs it to console (dev/staging)
// 3. Returns success
//
// TO ADD EMAIL SENDING:
// Install: npm install resend   (or nodemailer, sendgrid, etc.)
// Uncomment and configure the email block below.
// ─────────────────────────────────────────────────────────────────────────────

type SelectedService = {
  categorySlug: string;
  categoryName: string;
  serviceSlug: string;
  serviceName: string;
};

type QuotePayload = {
  services: SelectedService[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuotePayload;

    // ── Basic validation ────────────────────────────────────────────────────
    if (!body.contact?.name || !body.contact?.phone || !body.contact?.email) {
      return NextResponse.json(
        { success: false, error: "Missing required contact fields." },
        { status: 400 }
      );
    }

    if (!body.services || body.services.length === 0) {
      return NextResponse.json(
        { success: false, error: "No services selected." },
        { status: 400 }
      );
    }

    // ── Log to console (always — useful for dev & server logs) ─────────────
    console.log("[KAR FX Quote Request]", {
      timestamp: new Date().toISOString(),
      contact: body.contact,
      services: body.services.map((s) => `${s.categoryName} → ${s.serviceName}`),
    });

    // ── Email notification (configure when ready) ───────────────────────────
    // To activate: install a mailer and fill in your credentials.
    //
    // Example with Resend (https://resend.com):
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // const serviceList = body.services
    //   .map((s) => `  - ${s.serviceName} (${s.categoryName})`)
    //   .join("\n");
    //
    // await resend.emails.send({
    //   from: "quotes@karfxcustoms.com",
    //   to: BUSINESS_INFO.email,
    //   subject: `New Quote Request — ${body.contact.name}`,
    //   text: [
    //     `New quote request from ${body.contact.name}`,
    //     `Phone: ${body.contact.phone}`,
    //     `Email: ${body.contact.email}`,
    //     "",
    //     "Services requested:",
    //     serviceList,
    //   ].join("\n"),
    // });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[KAR FX Quote Error]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
