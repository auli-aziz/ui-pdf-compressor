"use client";

import { ShieldCheck } from "lucide-react";
import React from "react";

// TODO: add toast upon successfull email verification
export default function VerifyEmailButton({ email }: { email: string }) {
  const handleVerifyEmail = async () => {
    try {
      if (!email) {
        alert("Email is required.");
      }
      const response = await fetch("/api/add-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    
      if (!response.ok) {
        throw new Error("Failed to send verification email.");
      }

      alert("Verification email sent successfully.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Failed to send verification email.");
    }
  };

  return (
    <button
      className="bg-orange-500 text-white flex items-center rounded-sm px-2 py-2 text-sm hover:bg-orange-600 transition duration-200"
      onClick={handleVerifyEmail}
    >
      <ShieldCheck className="mr-2 h-4 w-4" />
      Verify
    </button>
  );
}
