import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth/config"

// NextAuth handler
const handler = NextAuth(authConfig);

// Export the NextAuth handler for GET and POST requests
export { handler as GET, handler as POST }