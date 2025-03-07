import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose"; // ✅ Use `jose` instead of `jsonwebtoken` (next.js edge runtime compatibility)

const JWT_SECRET = process.env.STRAPI_JWT_SECRET;

const encoder = new TextEncoder(); // Required for `jose` key encoding

export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/profile"];
  const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

  // ✅ Get token from cookies
  const token = req.cookies.get("token")?.value;

  let isValidToken = false;

  if (token) {
    try {
      await jwtVerify(token, encoder.encode(JWT_SECRET!)); // ✅ Use `jose` for verification
      isValidToken = true;
    } catch (error) {
      console.error("Invalid Token:", (error as Error).message);
    }
  }

  // ✅ Redirect unauthenticated users from protected pages
  if (!isValidToken && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const response = NextResponse.redirect(new URL("/auth/sign-in", req.url));
    response.cookies.delete("token"); // Remove fake token
    return response;
  }

  // ✅ Redirect authenticated users away from auth pages
  if (isValidToken && authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

// ✅ Middleware applies to specific routes
export const config = {
  matcher: ["/profile", "/auth/:path*"], // 👈 Ensures middleware runs on these paths
};
