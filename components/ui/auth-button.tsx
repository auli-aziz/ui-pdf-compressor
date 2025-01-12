"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./button";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
    >
      <FcGoogle className="w-[20px] h-[20px]" />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      
      <span className="ml-4">Continue with Email</span>
    </button>
  );
}

export function SignOutButton() {
  const handleClick = () => {
    signOut();
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 text-white mt-3"
    >
      <span>Sign Out</span>
    </Button>
  );
}