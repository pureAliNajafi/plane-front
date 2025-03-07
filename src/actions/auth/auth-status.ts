"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.STRAPI_JWT_SECRET;

export async function checkAuthStatusAction(): Promise<boolean> {
  const token = cookies().get("token")?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET!));
    return true;
  } catch {
    return false;
  }
}
