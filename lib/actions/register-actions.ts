
"use server";

import { cookies } from "next/headers";

export async function registerAction(formData: any) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/auth/local/register`;

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  try {
    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    if (response.ok) {
      cookies().set("token", data.jwt)
      cookies().set("userId", data?.user.id)
      return { user: data.user };
    }
  } catch (error) {
    console.error(error);
    return { error: "Erreur serveur, essayez plus tard svp." };
  }
}