import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

import { getVerificationToken } from "@/lib/email/verify";
import { sendEmail } from "@/lib/email/send";
import { verficationEmailTemplate } from "@/lib/email/template";

export async function POST(request: Request) {
  try {
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

    // Check if user already exists
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    // verify email
    const {verificationToken, verifyToken, verifyTokenExpires} = getVerificationToken();

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(user).values({
      name,
      email,
      verifyToken,
      verifyTokenExpires,
      password: hashedPassword,
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&email=${email}`;
    const payload = verficationEmailTemplate(verificationLink);

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
