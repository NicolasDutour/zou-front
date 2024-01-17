
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { FormSchemaRegister } from "@/lib/types"

export async function registerAction(prevState: any, formData: any) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/auth/local/register`;
  const rawFormData = Object.fromEntries(formData.entries())
  const validatedFields = FormSchemaRegister.safeParse(rawFormData)

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      cache: "no-cache",
    });

    const data = await response.json();
    if (!response.ok && data.error) return { ...prevState, message: data.error.message, errors: null };
    if (response.ok && data.jwt) {
      cookies().set("token", data.jwt)
    }
  } catch (error) {
    console.error(error);
    return { error: "Erreur serveur, essayez plus tard svp." };
  }
  redirect("/admin");
}