import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "../db/schema"

import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/sign-in', // Replace default sign-in page
    error: '/auth/error', // Custom error page
    verifyRequest: '/auth/verify-request', // Custom email verification page
    newUser: '/dashboard/general' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({session, user}) {
      session.user.id = user.id;
      return session
    },
  }
};
