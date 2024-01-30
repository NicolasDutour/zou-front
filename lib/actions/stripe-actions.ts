'use server'

import Stripe from "stripe"

export async function createCustomer(name: string, email: string, description: string) {
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

export async function createSessionCheckout(stripeCustomerId: string, priceId: string) {
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

export async function removeSusbcription(sub_id: string) {
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