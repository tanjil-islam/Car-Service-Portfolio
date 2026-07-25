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

      // 1. Send Notification Email to Admin (Shop Owner)
      const adminInfo = await transporter.sendMail({
        from: `"Roadmen Performance" <${smtpUser}>`,
        to: ADMIN_EMAIL,
        replyTo: client?.email,
        subject: `[NEW APPOINTMENT] ${commissionId} - ${service?.name || service?.id} - ${client?.name}`,
        html: htmlContent,
      });

      // 2. Send Confirmation Receipt Email to Client
      let clientEmailSent = false;
      if (client?.email) {
        try {
          const clientHtml = `
            <div style="font-family: Arial, sans-serif; background-color: #050505; color: #fafafa; padding: 32px; border-radius: 16px; border: 1px solid #D6FF00; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #D6FF00; margin-bottom: 16px; font-size: 20px; text-transform: uppercase;">
                // ROADMEN PERFORMANCE - APPOINTMENT CONFIRMED
              </h2>
              <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6;">
                Hello <strong>${client?.name}</strong>,<br/>
                Your service appointment request <strong>[${commissionId}]</strong> has been successfully received.
              </p>
              <div style="background-color: #121212; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #D6FF00; font-size: 13px;">
                <p style="margin: 6px 0;"><strong>SERVICE:</strong> ${service?.name || service?.id}</p>
                <p style="margin: 6px 0;"><strong>VEHICLE:</strong> ${vehicle?.make} ${vehicle?.model} (${vehicle?.year})</p>
                <p style="margin: 6px 0;"><strong>DATE & TIME:</strong> ${schedule?.preferredDate} @ ${schedule?.preferredTime}</p>
                <p style="margin: 6px 0;"><strong>BOOKING ID:</strong> ${commissionId}</p>
              </div>
              <p style="color: #a1a1aa; font-size: 13px; line-height: 1.6;">
                Our executive engineering team will review your specifications and contact you at <strong>${client?.phone}</strong>.
              </p>
              <div style="margin-top: 24px; border-top: 1px solid #222; padding-top: 16px; text-align: center; color: #555; font-size: 11px;">
                ROADMEN PERFORMANCE // LOS ANGELES, CA
              </div>
            </div>
          `;

          await transporter.sendMail({
            from: `"Roadmen Concierge" <${smtpUser}>`,
            to: client.email,
            replyTo: ADMIN_EMAIL,
            subject: `[APPOINTMENT CONFIRMED] ${commissionId} - Roadmen Performance`,
            html: clientHtml,
          });
          clientEmailSent = true;
          console.log(`[CLIENT EMAIL SUCCESS] Dispatched confirmation receipt to ${client.email}`);
        } catch (clientErr) {
          console.error(`[CLIENT EMAIL ERROR] Failed to send receipt to ${client.email}:`, clientErr);
        }
      }

      emailSent = true;
      statusMessage = `Email dispatched to Admin (${ADMIN_EMAIL}) ${clientEmailSent ? `and Client (${client.email})` : ''}`;
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
