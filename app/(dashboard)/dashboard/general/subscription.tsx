"use client";

import PricingCard from "@/components/fragments/pricing-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Subscription({ email }: { email: string }) {
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [expires, setExpires] = useState<string | null>(null);

  async function fetchSubscription() {
    const response = await fetch(`/api/subscription?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const subscription = await response.json();
    console.log("sub response: ", subscription);
    
    if(response.ok) {
      setSubscriptionPlan(subscription.plan);
      setExpires(subscription.expireDate);
    }
  }
  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          {subscriptionPlan ? (
            <PricingCard
              name={subscriptionPlan}
              price={subscriptionPlan === 'Base' ? '100,000' : '200,000'}
              interval={'bulan'}
              description={`Berlaku hingga ${new Date(expires).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`}
              features={
                subscriptionPlan === 'Base'
                  ? ['Penggunaan Tanpa Batas', 'Dukungan via Email']
                  : ['Semua yang ada dalam Base', 'Early Access ke fitur baru', 'Dukungan 24/7']
              }
              showBtn={false}

            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p>No active subscription found.</p>
              <button onClick={() => redirect("/pricing")} className="bg-orange-500 text-white w-fit rounded-lg px-2 py-1.5 text-sm">
                Subscribe now
              </button>
            </div>
          )}
        </CardContent>
      </Card>
  )
}
