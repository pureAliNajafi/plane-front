"use server";
import { z } from "zod";
import { SignInState } from "@/lib/types";
import { loginUser } from "@/lib/api";
import { setAuthToken } from "@/lib/cookies";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function signInAction(state: SignInState, formData: FormData) {
  const validated = await LoginSchema.safeParseAsync(Object.fromEntries(formData));

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, message: "Invalid input" };
  }

  const res = await loginUser(validated.data);
  if (res.error) return { message: res.error as string };

  setAuthToken(res.jwt); // ✅ Store token using centralized utility

  return { success: "Logged in successfully!" };
}
