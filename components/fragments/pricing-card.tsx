"use client";

import { Check } from 'lucide-react';
import { SubmitButton } from '../ui/submit-button';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function PricingCard({
  name,
  price,
  interval,
  trialDays = 7,
  features,
  username,
  email,
  showBtn = true,
}: {
  name: string;
  price: string;
  interval: string;
  trialDays: number;
  features: string[];
  username?: string | null;
  email?: string | null;
  showBtn?: boolean | null;
}) {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey as string);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  async function handleCheckout(event: any) {
    if(!username || !email) {
      alert("Please sign in first");
      redirect("/sign-in");
    }  

    try{
      const response = await fetch('/api/payment/tokenizer', {
        method: 'POST',
        body: JSON.stringify({
          plan: name,
          price: Number(price.replace(/\./g, "")),
          username,
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const requestData = await response.json();
      window.snap.pay(requestData.token.token);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="w-fit py-6 shadow-md px-7 rounded-lg">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">
      dengan free trial selama {trialDays} hari
      </p>
      <p className="text-4xl font-medium text-gray-900 mb-6">
        Rp{price}{' '}
        <span className="text-xl font-normal text-gray-600">
          / {interval}
        </span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <form action={handleCheckout} className={`${showBtn ? '' : 'hidden'}`}>
        <SubmitButton />
      </form>
    </div>
  );
}
