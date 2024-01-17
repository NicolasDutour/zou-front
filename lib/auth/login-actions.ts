
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { FormSchemaLogin } from "@/lib/types"

export async function loginAction(prevState: any, formData: any) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/auth/local`;
  const rawFormData = Object.fromEntries(formData.entries())
  const validatedFields = FormSchemaLogin.safeParse(rawFormData)

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors
    };
  }

  const { identifier, password } = validatedFields.data;

  try {
    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
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