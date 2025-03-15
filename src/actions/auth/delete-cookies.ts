"use server";

import { deleteAuthCookies } from "@/lib/cookies/server";

export async function deleteAuthCookiesAction() {
  await deleteAuthCookies();
}
