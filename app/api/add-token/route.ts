import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send";
import { verficationEmailTemplate } from "@/lib/email/template";
import { getVerificationToken } from "@/lib/email/verify";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const { verificationToken, verifyToken, verifyTokenExpires } =
      getVerificationToken();

    await db.update(user)
      .set({
        verifyToken,
        verifyTokenExpires,
      })
      .where(eq(user.email, email));

    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&email=${email}`;
    const payload = verficationEmailTemplate(verificationLink);

    await sendEmail(email, "Verify your email", payload);

    return NextResponse.json({
      message: "Verification email sent successfully.",
    });
  } catch (error) {
    console.error("Error in add-token:", error);
    return NextResponse.json(
      { message: "Failed to send verification email." },
      { status: 500 }
    );
  }
}
