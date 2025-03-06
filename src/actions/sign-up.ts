"use server";
import { z } from "zod";
import { registerUser } from "@/lib/api";
import { SignUpFormState } from "@/lib/types";

const SignUpSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function signUpAction(state: SignUpFormState, formData: FormData) {
  const validated = await SignUpSchema.safeParseAsync(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid input",
    };
  }

  const res = await registerUser(validated.data);

  if (res.error) {
    return { message: res.error as string };
  }

  return { success: "Account created successfully!" };
}
