"use server";
import { cookies } from "next/headers";

export async function getTokenAction(): Promise<string | null> {
  const token = cookies().get("token")?.value || null;
  return token;
}
