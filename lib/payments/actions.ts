"use server"

import { redirect } from 'next/navigation';

export const checkoutAction = async () => {
  redirect("/payment");
};