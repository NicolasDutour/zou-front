'use server'

import { redirect } from "next/navigation";
import Stripe from "stripe"

export async function createCustomer(name: string, email: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.customers.create({
    name,
    email
  })
}

export async function createProduct(name: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.products.create({ name });
}

export async function createPrice(
  productId: string,
  unit_amount: number,
  currency: string,
  interval: "day" | "week" | "month" | "year",
  trial_period_days: number
) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.prices.create(
    {
      unit_amount,
      currency,
      recurring: { interval, trial_period_days },
      product: productId,
    }
  )
}

export async function createSubscription(stripeCustomerId: string, priceId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [
      { price: priceId }
    ]
  })
}

export async function createSessionCheckout(stripeCustomerId: string, hasOptions: boolean, priceId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const line_items = [
    {
      price: priceId,
      quantity: 1,
    }
  ]
  if (hasOptions) {
    // line_items.push(
    //   {
    //     price: priceIdOption,
    //     quantity: optionsQuantity,
    //   },
    // )
  }
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items,
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/admin/subscription?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/admin/subscription?canceled=true`,
  })
  if (session.url) redirect(session?.url);
}

export async function cancelSubscription(subscriptionId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.subscriptions.cancel(subscriptionId, { invoice_now: false, prorate: false })
}

export async function retrieveCustomer(customerId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.customers.retrieve(customerId)
}

export async function listSubscriptions(stripeCustomerId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.subscriptions.list({
    customer: stripeCustomerId
  })
}

export async function listInvoices(stripeCustomerId: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.invoices.list({
    customer: stripeCustomerId
  })
}

export async function listProducts() {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  return await stripe.products.list();
}