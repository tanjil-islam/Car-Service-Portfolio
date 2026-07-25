import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "tanjirul4899@gmail.com";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const {
      commissionId,
      timestamp,
      service,
      vehicle,
      schedule,
      client,
    } = payload;

    console.log(`[COMMISSION SERVICE API] Processing booking ${commissionId} for recipient: ${ADMIN_EMAIL}`);

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #050505; color: #fafafa; padding: 32px; border-radius: 16px; border: 1px solid #D6FF00; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D6FF00; margin-bottom: 24px; border-bottom: 1px solid #333; padding-bottom: 12px; font-size: 20px; text-transform: uppercase;">
          // NEW COMMISSION BOOKING MANIFEST [${commissionId}]
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
          <tr><td style="padding: 8px; color: #a1a1aa; width: 180px;">MANIFEST ID:</td><td style="padding: 8px; font-weight: bold; color: #D6FF00;">${commissionId}</td></tr>
          <tr><td style="padding: 8px; color: #a1a1aa;">TIMESTAMP:</td><td style="padding: 8px;">${timestamp}</td></tr>
          <tr><td style="padding: 8px; color: #a1a1aa;">SERVICE SELECTED:</td><td style="padding: 8px; font-weight: bold; color: #ffffff;">${service?.name || service?.id}</td></tr>
        </table>

        <h3 style="color: #D6FF00; margin-top: 24px; border-bottom: 1px solid #222; padding-bottom: 8px; font-size: 14px;">
          CLIENT INFORMATION
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
          <tr><td style="padding: 8px; color: #a1a1aa; width: 180px;">FULL NAME:</td><td style="padding: 8px; font-weight: bold;">${client?.name}</td></tr>
          <tr><td style="padding: 8px; color: #a1a1aa;">EMAIL ADDRESS:</td><td style="padding: 8px; color: #D6FF00;">${client?.email}</td></tr>
          <tr><td style="padding: 8px; color: #a1a1aa;">PHONE NUMBER:</td><td style="padding: 8px;">${client?.phone}</td></tr>
        </table>

        <h3 style="color: #D6FF00; margin-top: 24px; border-bottom: 1px solid #222; padding-bottom: 8px; font-size: 14px;">
          VEHICLE SPECIFICATIONS
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
          <tr><td style="padding: 8px; color: #a1a1aa; width: 180px;">MAKE / MODEL / YEAR:</td><td style="padding: 8px; font-weight: bold;">${vehicle?.make} ${vehicle?.model} (${vehicle?.year})</td></tr>
          <tr><td style="padding: 8px; color: #a1a1aa;">ENGINE SPEC:</td><td style="padding: 8px;">${vehicle?.engineSpec || 'STANDARD'}</td></tr>
        </table>

        <h3 style="color: #D6FF00; margin-top: 24px; border-bottom: 1px solid #222; padding-bottom: 8px; font-size: 14px;">
          SCHEDULE & REQUIREMENTS
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr><td style="padding: 8px; color: #a1a1aa; width: 180px;">TARGET WINDOW:</td><td style="padding: 8px; font-weight: bold;">${schedule?.preferredDate} @ ${schedule?.preferredTime}</td></tr>
          <tr><td style="padding: 8px; color: #a1a1aa;">NOTES & GOALS:</td><td style="padding: 8px;">${schedule?.notes || 'NONE'}</td></tr>
        </table>
      </div>
    `;

    let emailSent = false;
    let previewUrl = "";
    let statusMessage = "";

    if (smtpUser && smtpPass) {
      // Send real email via configured SMTP (e.g. Gmail App Password)
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Car Service Concierge" <${smtpUser}>`,
        to: ADMIN_EMAIL,
        replyTo: client?.email,
        subject: `[NEW BOOKING] ${commissionId} - ${service?.name || service?.id} - ${client?.name}`,
        html: htmlContent,
      });

      emailSent = true;
      statusMessage = `Email successfully dispatched to ${ADMIN_EMAIL} (Message ID: ${info.messageId})`;
      console.log(`[EMAIL SUCCESS] Dispatched to ${ADMIN_EMAIL}`);
    } else {
      // Fallback: Generate Ethereal Test Account and return instant preview URL
      console.log("[EMAIL NOTICE] SMTP_USER/SMTP_PASS not set in .env.local. Creating Ethereal preview email...");
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Car Service Demo" <${testAccount.user}>`,
        to: ADMIN_EMAIL,
        replyTo: client?.email,
        subject: `[COMMISSION MANIFEST] ${commissionId} - ${service?.name || service?.id}`,
        html: htmlContent,
      });

      previewUrl = nodemailer.getTestMessageUrl(info) || "";
      emailSent = true;
      statusMessage = `Test email generated. Preview link: ${previewUrl}`;
      console.log(`[ETHEREAL EMAIL PREVIEW] ${previewUrl}`);
    }

    return NextResponse.json({
      success: true,
      commissionId,
      targetEmail: ADMIN_EMAIL,
      emailSent,
      previewUrl,
      message: statusMessage,
    });
  } catch (error: any) {
    console.error("[COMMISSION API ERROR]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit booking" },
      { status: 500 }
    );
  }
}
