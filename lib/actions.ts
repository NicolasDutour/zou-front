"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: any) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/auth/local`;

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

    if (response.status === 400) {
      return { error: data.error.message };
    }

    if (response.ok) {
      createCookie("token", data.jwt)
      createCookie("userId", data?.user.id)
      createCookie("username", data?.user.username)
      return { user: data.user };
    }
  } catch (error) {
    console.error(error);
    return { error: "Erreur serveur, essayez plus tard svp." };
  }
}

export async function registerAction(formData: any) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${BACKEND_URL}/api/auth/local/register`;
  if (!BACKEND_URL) throw new Error("Missing STRAPI_URL environment variable.");

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

    if (response.status === 400) {
      return { error: data.error.message };
    }

    if (response.ok) {
      createCookie("token", data.jwt)
      createCookie("userId", data?.user.id)
      createCookie("username", data?.user.username)
      return { user: data.user };
    }
  } catch (error) {
    console.error(error);
    return { error: "Erreur serveur, essayez plus tard svp." };
  }
}

export async function logoutAction() {
  removeCookie("token")
  removeCookie("userId")
  removeCookie("username")
}

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

export async function createOrUpdateRestaurantAction(payload: any, pathname: any, restaurantId?: any) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/restaurants${pathname?.includes("edit") ? `/${restaurantId}` : ''}`;

  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");

  try {
    const response = await fetch(url, {
      method: `${pathname?.includes("edit") ? 'PUT' : 'POST'}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: payload }),
    });

    if (response.ok) {
      revalidatePath('/dashboard/restaurant')
      return await response.json()
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
    return { error: "Erreur serveur, essayez plus tard svp." };
  }
  redirect('/dashboard/restaurant')
}

export async function createCookie(name: string, data: string) {
  // const oneDay = 24 * 60 * 60 * 1000
  // const oneMinute = 60 * 1000;
  const twoHours = 2 * 60 * 60 * 1000
  cookies().set(name, data, { httpOnly: true, expires: Date.now() + twoHours })
}

export async function removeCookie(name: string) {
  cookies().delete(name)
}