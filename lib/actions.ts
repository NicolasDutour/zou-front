"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import Stripe from "stripe";

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
      createCookie("email", data?.user.email)
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
  removeCookie("email")
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

export async function createOrUpdateProductAction(payload: any, pathname: any, productId?: any) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Not Authorized.");

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/products${pathname?.includes("edit") ? `/${productId}` : ''}`;

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
      revalidatePath('/dashboard/product')
      return await response.json()
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
  redirect('/dashboard/product')
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
  revalidatePath('/dashboard/product')
}

export async function createCookie(name: string, data: string) {
  const oneDay = 24 * 60 * 60 * 1000
  // const oneMinute = 60 * 1000;
  // const twoHours = 2 * 60 * 60 * 1000
  cookies().set(name, data, { httpOnly: true, expires: Date.now() + oneDay })
}

export async function removeCookie(name: string) {
  cookies().delete(name)
}

export async function createCustomer(name: string, email: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const customer = await stripe.customers.create({ name, email })
  return customer.id
}

export async function createProduct(name: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const product = await stripe.products.create({ name })
  return product.id
}

export async function createPrice(
  productId: string,
  unit_amount: number,
  currency: string,
  interval: 'day' | 'week' | 'month' | 'year',
) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const price = await stripe.prices.create({
    unit_amount,
    currency,
    product: productId,
    recurring: { interval }
  })
  return price.id
}

export async function createSessionCheckout(
  stripeCustomerId: string,
  priceId: string,
  mode: 'payment' | 'setup' | 'subscription'
) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer: stripeCustomerId,
    line_items: [{
      price: priceId,
      quantity: 1,
    }],
    mode,
    success_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/dashboard/subscription?success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/dashboard/subscription?canceled`,
  })
  if (session?.url) {
    redirect(session.url)
  }
}

export async function cancelSubscription(subscriptionId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.subscriptions.cancel(subscriptionId, { invoice_now: false, prorate: false })
}

export async function retrieveSession(sessionId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.checkout.sessions.retrieve(sessionId);
}

export async function listSubscriptions(stripeCustomerId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.subscriptions.list({ customer: stripeCustomerId })
}

export async function listInvoices(stripeCustomerId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.invoices.list({ customer: stripeCustomerId })
}