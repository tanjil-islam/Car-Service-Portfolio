import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { contactName, contactPhoneEmail, contactSubject, contactMessage } = await req.json();

    if (!contactName || !contactPhoneEmail || !contactSubject || !contactMessage) {
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

    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: port,
      secure: port === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${contactName}" <${SMTP_USER}>`, 
      replyTo: contactPhoneEmail.includes('@') ? contactPhoneEmail : undefined,
      to: ADMIN_EMAIL,
      subject: `[${contactSubject}] New Inquiry from ${contactName}`,
      text: `Name: ${contactName}\nPhone/Email: ${contactPhoneEmail}\nSubject: ${contactSubject}\n\nMessage:\n${contactMessage}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 20px; border: 1px solid #333; background: #000; color: #fff;">
          <h2 style="color: #e50914; text-transform: uppercase;">// NEW GARAGE INQUIRY</h2>
          <p style="margin-top: 20px;"><strong>NAME:</strong> ${contactName}</p>
          <p><strong>CONTACT INFO:</strong> <span style="color: #e50914;">${contactPhoneEmail}</span></p>
          <p><strong>SUBJECT:</strong> ${contactSubject}</p>
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
