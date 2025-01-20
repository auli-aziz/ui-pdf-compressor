import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send";
import { verficationEmailTemplate } from "@/lib/email/template";
import { getVerificationToken } from "@/lib/email/verify";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// POST /api/email/add-token khusus digunakan untuk mengirim email verifikasi
export async function POST(req: Request) {
  try {
    // Ambil data dari body request
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // mendapatkan token verifikasi
    const { verificationToken, verifyToken, verifyTokenExpires } =
      getVerificationToken();

    await db.update(user)
      .set({
        verifyToken,
        verifyTokenExpires,
      })
      .where(eq(user.email, email));

    // membuat link verifikasi
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&email=${email}`;
    // membuat payload email dengan template
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
