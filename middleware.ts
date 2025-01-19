import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  // Prevent authenticated users from accessing the sign-in page
  if (url.pathname === "/sign-in" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect authenticated users to the dashboard
  }

  // Redirect to sign-in if no token is present and accessing protected routes
  if (!token && !url.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Role-based access control
  if (url.pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/admin/:path*", "/sign-in"], // Protect routes
};
