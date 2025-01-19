import { NextResponse } from "next/server";
import crypto from "crypto";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { and, eq, gt } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const verifyToken = searchParams.get("verifyToken") as string;
    const email = searchParams.get("email") as string;

    if (!verifyToken || !email) {
      return NextResponse.json(
        { message: "Missing required parameters." },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(verifyToken).digest("hex");

    const existingUser = await db.query.user.findFirst({
      where: and(
        eq(user.email, email),
        eq(user.verifyToken, tokenHash),
        gt(user.verifyTokenExpires, new Date()) // Verifying expiration
      ),
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    await db.update(user)
      .set({
        emailVerified: new Date(),
        verifyToken: null,
        verifyTokenExpires: null,
      })
      .where(eq(user.id, existingUser.id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
