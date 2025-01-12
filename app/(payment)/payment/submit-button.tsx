'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
// import { useFormStatus } from 'react-dom';
import { redirect } from 'next/navigation';

export function SubmitButton() {
  // const { pending } = useFormStatus();

  const handleClick = () => {
    redirect("/payment/pin");
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={false}
      className="w-full bg-gray-900 hover:bg-gray-800 text-white border border-gray-200 rounded-full flex items-center justify-center"
    >
      {false ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        <>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
