"use server";

import { getTokenAction } from "./auth/auth-status";
import { http } from "@/core/services/interceptor";
export async function toggleLikeFlyingMachine(id: string): Promise<{ liked: boolean }> {
  const token = await getTokenAction();

  const response = await http.post(
    "/likes/toggle-flying-machine",
    { flyingMachineId: id }, // Request body (data)
    {
      headers: {
        Authorization: `Bearer ${token}`, // Corrected syntax
      },
    }
  );

  return response.data;
}
