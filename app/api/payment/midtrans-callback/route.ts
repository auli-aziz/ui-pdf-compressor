import { NextResponse } from "next/server";
import * as crypto from "crypto";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      throw new Error('Server key is not set in environment variables');
    }

    const body = await req.json();
    const { signature_key, order_id, gross_amount, status_code, transaction_status } = body;

    const computedSignature = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex');

    if (signature_key !== computedSignature) {
      console.error('Invalid signature:', {
        received: signature_key,
        computed: computedSignature,
      });
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    if (transaction_status === "settlement") {
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

      await db.update(orders)
        .set({
          status: "PAID",
          expiresAt: oneMonthFromNow,
        })
        .where(eq(orders.orderId, order_id));
    }

    return NextResponse.json({ message: 'Notification processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
