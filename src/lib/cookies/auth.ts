"use server";

import { cookies } from "next/headers";

const TOKEN_NAME = "token";
const USER_NAME = "username";
const EMAIL_NAME = "email";

const EXPIRATION_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days
const EXPIRATION_DATE = new Date(Date.now() + EXPIRATION_INTERVAL);

export async function setAuthCookies(token: string, username: string, email: string) {
  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: EXPIRATION_DATE,
  });

  cookies().set(USER_NAME, username, { path: "/", expires: EXPIRATION_DATE });
  cookies().set(EMAIL_NAME, email, { path: "/", expires: EXPIRATION_DATE });
}

export async function getAuthCookies() {
  return {
    token: cookies().get(TOKEN_NAME)?.value || null,
    username: cookies().get(USER_NAME)?.value || null,
    email: cookies().get(EMAIL_NAME)?.value || null,
  };
}

export async function deleteAuthCookies() {
  cookies().delete(TOKEN_NAME);
  cookies().delete(USER_NAME);
  cookies().delete(EMAIL_NAME);
}
