"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createOrUpdateRestaurantAction(payload: any, pathname: any, restaurantId?: any) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/restaurants${pathname?.includes("/update") ? `/${restaurantId}` : ''}`;

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
    return { error: "Erreur serveur, essayez plus tard svp." };
  }
}

export async function createBannerPhoto(formData: any) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/upload`;

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  try {
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
  } catch (error) {
    console.error("error", error);
    return { error: "Erreur serveur, essayez plus tard svp." };
  }
  redirect('/admin/restaurant')
}
