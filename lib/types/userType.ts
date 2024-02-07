import * as z from "zod"
import { RestaurantType } from "./restaurantType"

export const FormSchemaProfile = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
})

export type TypeFormSchemaProfile = z.infer<typeof FormSchemaProfile>

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