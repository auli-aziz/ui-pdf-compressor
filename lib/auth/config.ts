import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "../db/"
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// konfigurasi autentikasi next auth
export const authConfig: NextAuthOptions = {
  providers: [
    // sign in dengan google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // sign in manual dengan email dan password
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
        return { id: existingUser.id, name: existingUser.name, email, role: existingUser.role, emailVerified: existingUser.emailVerified};
      },
    }),
  ],
  pages: {
    signIn: '/sign-in', // Replace default sign-in page
    newUser: '/dashboard/general' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: DrizzleAdapter(db), // adapter untuk drizzle
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.emailVerified = user.emailVerified;
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
          emailVerified: token.emailVerified ? new Date(token.emailVerified).toISOString() : null,
          role: token.role,
        };
      }
      return session;
    }
    
  }
};
