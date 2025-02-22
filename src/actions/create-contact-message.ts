"use server";

import { createContactMessage } from "@/lib/api";
import { CreateContactMessageFormState } from "@/lib/types";
import { z } from "zod";

const ContactSchema = z.object({
  Name: z.string().min(1),
  Email: z.string().email(),
  Message: z.string().max(1000),
});

export async function createContactMessageAction(
  state: CreateContactMessageFormState,
  formData: FormData
) {
  console.log(formData);

  const validatedFields = await ContactSchema.safeParseAsync({
    Name: formData.get("Name"),
    Email: formData.get("Email"),
    Message: formData.get("Message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "bad request",
    };
  }

  await createContactMessage(validatedFields.data);

  return {
    success:
      "Rest assured, your inquiry will reach cruising altitude and receive a prompt response with 2 business days.",
  };
}
