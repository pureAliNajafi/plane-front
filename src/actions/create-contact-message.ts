"use server";
import { z } from "zod";
import { createContactMessage } from "@/lib/api";
import { CreateContactFormState } from "@/lib/types";

const ContactSchema = z.object({
  Name: z.string().min(1, { message: "required" }),
  Email: z.string().email(),
  Message: z
    .string()
    .min(1, { message: "required" })
    .max(1000, { message: "maximum 1000 characters" }),
});

export async function createContactMessageAction(state: CreateContactFormState, formData: any) {
  const validated = await ContactSchema.safeParseAsync(Object.fromEntries(formData));
  /*   const validatedFields = await ContactSchema.safeParseAsync({
    Name: formData.get("Name"),
    Email: formData.get("Email"),
    Message: formData.get("Message"),
  }); */

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, message: "Invalid input" };
  }
  // await new Promise((resolve) => setTimeout(resolve, 5000)); // delay

  await createContactMessage(validated.data);
  return { success: "Message received. We'll get back to you in 2 business days." };
}
