"use client";

import { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton } from "@/components/ui/auth-button";

export default function DropdownMenuComponent({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {session ? (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer size-9">
              <AvatarImage alt={session.user.name || ""} />
              <AvatarFallback>
                {session &&
                  session.user.email &&
                  session.user.email
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-1">
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/dashboard" className="flex w-full items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          asChild
          className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
        >
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </>
  );
}
