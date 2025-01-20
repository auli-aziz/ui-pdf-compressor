import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { and, eq, gt } from "drizzle-orm";

// GET /api/subscription api untuk mengecek status subscription user
export async function GET(request: Request) {
  try {
    // Mengambil email dari query params
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Missing required parameters." },
        { status: 400 }
      );
    }

    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist or token expired." },
        { status: 404 }
      );
    }

    // Query to find the user's active order
    const existingOrder = await db.query.orders.findFirst({
      where: and(
        eq(orders.userId, existingUser.id),
        eq(orders.status, "PAID"), // Check if the order is paid
        gt(orders.expiresAt, new Date()) // Check if the order is still active
      ),
    });

    if (!existingOrder) {
      return NextResponse.json(
        { message: "No active subscription found." },
        { status: 404 }
      );
    }

    // Respond with the subscription plan & expiration date
    return NextResponse.json(
      { plan: existingOrder.plan, expireDate: existingOrder.expiresAt },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
