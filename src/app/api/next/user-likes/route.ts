import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("token")?.value; // Read token from cookies
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const response = await fetch(`${process.env.API_URL}/likes/my-flying-machines`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // Avoid caching user-specific data
  });

  const data = await response.json();
  return NextResponse.json(data);
}
