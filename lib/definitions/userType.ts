import * as z from "zod"
import { RestaurantType } from "./restaurantType"

export type UserType = {
  id: number
  email: string
  username: string
  updatedAt: string
  restaurants: RestaurantType[]
  stripeUserId: string
  stripe_products: StripeProductType[]
}

export type StripeProductType = {
  id: number
  stripeProductName: string
  stripeProductId: string
  stripePriceId: string
  stripe_subscriptions: StripeSubscriptionType[]
}

export type StripeSubscriptionType = {
  id: number
  stripeSubscriptionId: string
}