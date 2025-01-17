"use client";

import { Link } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const verifyToken = searchParams.get("verifyToken");
  const email = searchParams.get("email");

  if (!verifyToken || !email) {
    return <div>Invalid verification link</div>;
  }

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/verify-email?verifyToken=${verifyToken}&email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setVerified(true);
          setLoading(false);
        } else {
          setError("Something went wrong");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setLoading(false);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [verifyToken, email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        Verifying your email. Please wait...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
        {verified && (
          <>
            <h1 className="text-2xl sm:text-3xl font-semibold text-orange-600 mb-4">
              Email Verified
            </h1>
            <p className="text-md sm:text-lg text-gray-600 mb-6">
              Thank you for verifying your email. You can now proceed to the
              homepage.
            </p>
            <a
              href="/"
              className="bg-orange-600 text-white py-2 px-4 rounded-md text-sm sm:text-base inline-block transition duration-200 hover:bg-green-600"
            >
              Go to Home
            </a>
          </>
        )}
        {error && (
          <>
            <h1 className="text-2xl sm:text-3xl font-semibold text-orange-600 mb-4">
              Error Verifying Email
            </h1>
            <p className="text-md sm:text-lg text-gray-600 mb-6">{error}</p>
            <a
              href="/"
              className="bg-orange-600 text-white py-2 px-4 rounded-md text-sm sm:text-base inline-block transition duration-200 hover:bg-red-600"
            >
              Go to Home
            </a>
          </>
        )}
      </div>
    </div>
  );
}
