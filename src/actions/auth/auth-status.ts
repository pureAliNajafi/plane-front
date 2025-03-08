"use server";
import { cookies } from "next/headers";

export async function checkTokenAction(): Promise<boolean> {
  const token = cookies().get("token")?.value;
  return Boolean(token);
}
