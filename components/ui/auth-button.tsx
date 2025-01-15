"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function GoogleSignInButton() {
  const handleClick = async () => {
    await signIn("google", { callbackUrl: "/dashboard/general" });
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
  const handleClick = async () => {
    await signIn();
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
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <form action={handleSignOut} className="w-full">
      <button type="submit" className="flex w-full">
        <div className="w-full flex-1 cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </div>
      </button>
    </form>
  );
}
