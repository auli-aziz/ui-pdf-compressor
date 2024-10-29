'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession, createCustomerPortalSession } from './stripe';

export const checkoutAction = async () => {
  // const priceId = formData.get('priceId') as string;
  // await createCheckoutSession({ team: team, priceId });
  redirect("/payment");
};

export const customerPortalAction = async () => {
  // const portalSession = await createCustomerPortalSession(team);
  redirect("/dashboard");
};
