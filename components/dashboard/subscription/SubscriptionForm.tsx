"use client"

import Link from "next/link";
import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { PlanType, UserType } from "@/lib/definitions";
import { createCustomer, createPrice, createProduct, createSessionCheckout, profileAction } from "@/lib/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SubscriptionForm({ user, plans }: { user: UserType, plans: PlanType[] }) {
  const [subscription, setSubscription] = useState(null as PlanType | null)

  async function onHandleCreateOrUpdateSubscription(e: any) {
    e.preventDefault()
    let customer = user?.stripeUserId;
    if (!customer) {
      if (user?.username && user?.email) {
        const customerId = await createCustomer(user?.username, user?.email)
        if (customerId) {
          const response = await profileAction({ stripeUserId: customerId }, user?.id)
          if (response) {
            customer = customerId
          }
        }
      }
    }

    if (customer) {
      if (
        user?.stripe_products[0]?.stripeProductName === "zou-plan" &&
        user?.stripe_products[0]?.stripe_subscriptions[0].stripeSubscriptionId
      ) {
        console.log("update subscription")
      } else {
        const planProductId = await createProduct("zou-plan");
        if (planProductId && subscription) {
          const planPriceId = await createPrice(planProductId, 19.99 * 100, "EUR", "day");
          if (planPriceId) {
            await createSessionCheckout(customer, planPriceId, "subscription");
          }
        }
      }
    }
  }

  return (
    <form onSubmit={onHandleCreateOrUpdateSubscription}>
      {
        plans.map((plan: PlanType) => {
          return (
            <Card key={plan.id} className="flex w-full flex-col justify-between border-2 border-blueDark p-2 md:w-1/2">
              <CardHeader className="space-y-0 p-0">
                <CardTitle className="mb-2 text-center font-medium">
                  <p className="mb-2 text-4xl text-blueDark"> {plan.name} </p>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blueDarker">
                <ul>
                  {
                    plan.features.map((feature: string, index: number) => (
                      <li key={index} className="mb-2 text-center text-blueDarker">{feature}</li>
                    ))
                  }
                </ul>
              </CardContent>
              <CardFooter className="mt-4 flex-col justify-center rounded-full border border-white bg-blueDarker p-2">
                <p className="text-lg tracking-wider text-white"> {formatCurrency(plan.price)} / mois</p>
              </CardFooter>
            </Card>
          )
        })
      }

      <div className="mt-4 flex w-full gap-2 md:w-1/3">
        <Link
          href="/dashboard/subscription"
          className="flex w-full  justify-center rounded-md bg-muted px-3 py-1.5 text-sm font-medium leading-6 text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueDarker"
        >
          Annuler
        </Link>
        <button
          type="submit"
          disabled={!subscription}
          className={cn("flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blueDarker-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", subscription ? "bg-blueDarker" : "bg-gray-300 cursor-not-allowed")}
        >
          Je souscris
        </button>
      </div>
      <p className="mb-2 mt-4 text-sm text-blueDark">Après validation, vous serez redirigé vers une page sécurisée de paiement <em className="text-blueDark ">Stripe</em></p>
    </form >
  );
}