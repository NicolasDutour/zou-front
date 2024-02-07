"use server";

import { cookies } from "next/headers";

export async function profileAction(formData: any, userId: number) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/users/${userId}`;

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    return { error: "Erreur serveur profile, essayez plus tard svp." };
  }
}