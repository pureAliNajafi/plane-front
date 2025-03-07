"use server";
import { deleteAuthToken } from "@/lib/cookies";

export async function logoutAction() {
  deleteAuthToken(); // ✅ Remove token using centralized utility
}
