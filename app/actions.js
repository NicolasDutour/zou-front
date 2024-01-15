'use server'

import Stripe from "stripe"
import { cookies } from 'next/headers'

// Cookies
export async function createCookie(name, data) {
  const oneDay = 24 * 60 * 60 * 1000
  const twoHours = 2 * 60 * 60 * 1000
  const oneMinute = 60 * 1000;
  cookies().set(name, data, { httpOnly: true, expires: Date.now() + twoHours })
}

export async function removeCookie(name) {
  cookies().delete(name)
}



// Stripe api

export async function createCustomer(name, email, description) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const data = await stripe.customers.create({
    name,
    email,
    description
  });
  return {
    data
  }
}

export async function createSessionCheckout(stripeCustomerId, priceId) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/admin/subscriptions?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/admin/subscriptions?canceled=true`,
  })

  return {
    data: session.url
  }
}

export async function removeSusbcription(sub_id) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const data = await stripe.subscriptions.cancel(sub_id);
  return {
    data
  }
}


export async function listProducts() {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const data = await stripe.products.list();
  return {
    data
  }
}

// export async function retrieveSusbcription(sub_id) {
//   const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
//   const data = await stripe.subscriptions.retrieve(sub_id);
//   return {
//     data
//   }
// }