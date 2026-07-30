import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { contactName, contactEmail, contactMessage } = await req.json();

    if (!contactName || !contactEmail || !contactMessage) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const { SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;

    if (!SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
      console.error("Missing SMTP environment variables. Please check your .env.local file.");
      return NextResponse.json(
        { error: 'Server configuration error. Contact administrator.' },
        { status: 500 }
      );
    }

    // Configure the transporter
    // For Gmail, use host 'smtp.gmail.com' and port 465 or 587
    // Adjust if using Outlook or another provider (e.g. smtp.office365.com)
    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: port,
      secure: port === 465, // true for 465, false for other ports (like 587)
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${contactName}" <${SMTP_USER}>`, // Sent via authenticated user to avoid spam filters
      replyTo: contactEmail,                   // The user's actual email they entered
      to: ADMIN_EMAIL,                         // Where you want to receive the email
      subject: `New Garage Inquiry from ${contactName}`,
      text: `Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 20px; border: 1px solid #333; background: #000; color: #fff;">
          <h2 style="color: #c4ff00; text-transform: uppercase;">// NEW GARAGE INQUIRY</h2>
          <p style="margin-top: 20px;"><strong>NAME:</strong> ${contactName}</p>
          <p><strong>EMAIL:</strong> <a href="mailto:${contactEmail}" style="color: #c4ff00;">${contactEmail}</a></p>
          <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
          <p style="text-transform: uppercase; color: #888; font-size: 12px; letter-spacing: 2px;">MESSAGE DETAILS</p>
          <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${contactMessage}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });

  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: 'Failed to send message.', details: error.message }, { status: 500 });
  }
}
