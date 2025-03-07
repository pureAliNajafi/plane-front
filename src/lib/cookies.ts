"use server";
import { cookies } from "next/headers";

const TOKEN_NAME = "token"; // Consistent naming

export const setAuthToken = (token: string) => {
  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

export const getAuthToken = () => cookies().get(TOKEN_NAME)?.value || null;

export const deleteAuthToken = () => cookies().delete(TOKEN_NAME);
