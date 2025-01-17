import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, payload: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to,
      subject,
      html: payload,
    };
  
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}