import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.STRAPI_JWT_SECRET;

export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/profile"];
  const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

  const token = req.cookies.get("token")?.value;
  let isValidToken = false;

  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET!));
      isValidToken = true;
    } catch (error) {
      console.error("Invalid Token:", (error as Error).message);
    }
  }

  if (!isValidToken && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const response = NextResponse.redirect(new URL("/auth/sign-in", req.url));

    // ✅ Correctly delete cookies in response
    response.cookies.delete("token");
    response.cookies.delete("expire");
    response.cookies.delete("username");
    response.cookies.delete("email");

    return response;
  }

  if (isValidToken && authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};
