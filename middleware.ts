import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  // menghindari pengguna terautentikasi dari mengakses halaman sign-in
  if (url.pathname === "/sign-in" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect authenticated users to the dashboard
  }

  // Redirect ke sign-in jika pengguna tidak terautentikasi
  if (!token && !url.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Role-based access control
  if (url.pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// route yang terproteksi
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/admin/:path*", "/sign-in"], 
};
