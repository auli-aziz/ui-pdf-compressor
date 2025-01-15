import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "../db/"
import CredentialsProvider from "next-auth/providers/credentials";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;

        // 1. Cari user berdasarkan email
        const existingUser = await db.query.user.findFirst({
          where: eq(user.email, email),
        });

        if (!existingUser) {
          throw new Error("Invalid email or password.");
        }

        // 2. Verifikasi password
        const isValidPassword = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid email or password.");
        }

        // 3. Return user object
        return { id: existingUser.id, name: existingUser.name, email, role: existingUser.role };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in', // Replace default sign-in page
    verifyRequest: '/auth/verify-request', // Custom email verification page
    newUser: '/dashboard/general' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      } 

      if(user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        };
      }
      return session;
    },
  }
};
