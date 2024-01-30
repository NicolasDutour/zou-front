"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createOrUpdateProductAction(payload: any, pathname: any, productId?: any) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/products${pathname?.includes("/update") ? `/${productId}` : ''}`;

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  try {
    const response = await fetch(url, {
      method: `${pathname?.includes("/update") ? 'PUT' : 'POST'}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: payload }),
    });

    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (error) {
    console.error(error);
    return { error: "Erreur serveur création produit, essayez plus tard svp." };
  }
}

export async function createProductPhoto(formData: any) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/upload`;

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  try {
    await fetch(url,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
  } catch (error) {
    console.error("error", error);
    return { error: "Erreur serveur création photo, essayez plus tard svp." };
  }
  redirect('/admin/product')
}

export async function removeProductAction(productId?: any) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/products/${productId}`;

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(error);
    return { error: "Erreur serveur création produit, essayez plus tard svp." };
  }
  revalidatePath('/admin/product')
}