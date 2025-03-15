"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(token: string, username: string, email: string) {
  const EXPIRATION_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  // const EXPIRATION_INTERVAL = 10 * 1000; // test
  const EXPIRATION_TIMESTAMP = Date.now() + EXPIRATION_INTERVAL; // ✅ Store as a timestamp
  const EXPIRATION_DATE = new Date(EXPIRATION_TIMESTAMP);
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(EXPIRATION_TIMESTAMP), // ✅ Still needs a Date object here
  });

  cookies().set("expire", EXPIRATION_TIMESTAMP.toString(), { path: "/", expires: EXPIRATION_DATE }); // ✅ Store timestamp as a string
  cookies().set("username", username, { path: "/", expires: EXPIRATION_DATE });
  cookies().set("email", email, { path: "/", expires: EXPIRATION_DATE });
}
export async function getAuthCookies() {
  return {
    token: cookies().get("token")?.value || null,
    expire: cookies().get("expire")?.value || null,
    username: cookies().get("username")?.value || null,
    email: cookies().get("email")?.value || null,
  };
}

export async function deleteAuthCookies() {
  cookies().delete("token");
  cookies().delete("expire");
  cookies().delete("username");
  cookies().delete("email");
}
