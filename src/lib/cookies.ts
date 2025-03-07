"use server";
import { cookies } from "next/headers";

const TOKEN_NAME = "token"; // Consistent naming
const EXPIRATION_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
// const EXPIRATION_INTERVAL = 10 * 1000; //test
const EXPIRATION_Date = Date.now() + EXPIRATION_INTERVAL;

export const setAuthToken = (token: string) => {
  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(EXPIRATION_Date), // ✅ Set expiration on frontend
  });
};

export const getAuthToken = () => cookies().get(TOKEN_NAME)?.value || null;

export const deleteAuthToken = () => cookies().delete(TOKEN_NAME);
