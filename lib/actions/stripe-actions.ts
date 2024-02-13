'use server'

import { redirect } from 'next/navigation'
import Stripe from "stripe";

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