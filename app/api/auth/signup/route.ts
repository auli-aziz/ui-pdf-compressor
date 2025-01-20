import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import { getVerificationToken } from "@/lib/email/verify";
import { sendEmail } from "@/lib/email/send";
import { verficationEmailTemplate } from "@/lib/email/template";

// POST /api/auth/signup
export async function POST(request: Request) {
  try {
    // Parse request body
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if(password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Check jika user dengan email tsb sudah ada dalam database
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    // verify email dengan memanggil fungsi getVerificationToken untuk mendapatkan token dan expired date
    const {verificationToken, verifyToken, verifyTokenExpires} = getVerificationToken();

    // Hash password and create user dengan memasukkan name, email, verifyToken, verifyTokenExpires, dan hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(user).values({
      name,
      email,
      verifyToken,
      verifyTokenExpires,
      password: hashedPassword,
    });

    // Membuat link verifikasi email
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&email=${email}`;
    // Membuat payload email dengan memanggil fungsi yang memberikan template email
    const payload = verficationEmailTemplate(verificationLink);

    // Mengirim email verifikasi dengan argument email, subject, dan payload
    await sendEmail(email, "Verify your email", payload);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in signup API:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
