'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation'; 

export default function CaptchaPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCaptchaVerification = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      redirect('/dashboard');
    }, 2000);
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">CAPTCHA Verification</h1>
        <p className="text-lg text-gray-700 mb-6">
          Please complete the CAPTCHA to proceed.
        </p>
        
        {/* Here you can add your CAPTCHA component */}
        <div className="mb-4">
          {/* Simulate CAPTCHA */}
          <div className="border border-gray-300 rounded-md h-16 flex items-center justify-center">
            <span className="text-gray-600">CAPTCHA IMAGE HERE</span>
          </div>
        </div>

        <Button
          onClick={handleCaptchaVerification}
          disabled={isLoading}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white border border-gray-200 rounded-full flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Verifying...
            </>
          ) : (
            <>
              Verify CAPTCHA
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
