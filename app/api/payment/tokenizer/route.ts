import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { user, orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

let snap = new Midtrans.Snap({
  isProduction: process.env.NODE_ENV === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
  const { plan, price, username, email } = body;

  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (!existingUser) {
    return NextResponse.json(
      { message: "User not found." },
      { status: 404 }
    );
  }

  const orderId = crypto.randomUUID();

  let parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: price,
    },
    credit_card: {
      secure: true,
    },
    items_details: {
      id: orderId,
      name: plan,
      price: price,
      quantity: 1,
    },
    customer_details: {
      first_name: username,
      email,
    },
  };

  const token = await snap.createTransaction(parameter);

  await db.insert(orders).values({
    userId: existingUser.id,
    orderId,
    plan,
    price,
    status: "PENDING",
    createdAt: new Date(),
  });

  return NextResponse.json({ token }, {status: 200});
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
