import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { and, eq, gt } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Missing required parameters." },
        { status: 400 }
      );
    }

    // Query to find the user
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    console.log("existingUser: ", existingUser);

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

    // Respond with the subscription plan
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
