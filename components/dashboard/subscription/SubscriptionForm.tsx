"use client"

import Link from "next/link";
import { useState } from "react";
import { capitalize, cn, formatCurrency } from "@/lib/utils";
import { PlanType, UserType } from "@/lib/validations";
import { createStripeCustomer, createPrice, createStripeProduct, createSessionCheckout, createSubscription, profileAction } from "@/lib/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

export function SubscriptionForm({ user, plans }: { user: UserType, plans: PlanType[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onHandleCreateSubscription(plan: string) {
    setIsSubmitting(true)
    if (plan === "free") {
      // await profileAction({ stripeCustomerId }, user?.id)
    } else {
      let customer = user?.stripeCustomerId;
      if (!customer) {
        if (user?.username && user?.email) {
          const stripeCustomerId = await createStripeCustomer(user)
          if (stripeCustomerId) {
            await profileAction({ stripeCustomerId }, user?.id)
            customer = stripeCustomerId
          }
        }
      }

      if (customer) {
        const stripeProductId = await createStripeProduct("zou-plan");
        if (stripeProductId) {
          const stripePriceId = await createPrice(stripeProductId, Math.round(19.99 * 100), "EUR", "month");
          if (stripePriceId) {
            const stripeSubscriptionId = await createSubscription(customer, stripePriceId);
            if (stripeSubscriptionId) {
              const stripeSessionId = await createSessionCheckout(user.stripeCustomerId, user.stripePriceId, "subscription");
              await profileAction({
                stripeCustomerId: customer,
                stripeProductId,
                stripePriceId,
                stripeSubscriptionId,
                stripeSessionId
              }, user?.id)
              setIsSubmitting(false)
            }
          }
        }
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {
        plans.map((plan: PlanType) => {
          return (
            <Card key={plan.id} className="flex w-full flex-col justify-between border-2 border-blueDark p-2 group">
              <CardHeader className="space-y-0 p-0">
                <CardTitle className="mb-2 text-center font-medium">
                  <p className="mb-2 text-4xl text-blueDark"> {capitalize(plan.name)} </p>
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
              <CardFooter className="flex flex-col">
                <Button
                  className={cn(buttonVariants(), "mt-4 w-full border-2 bg-blueDark hover:bg-white hover:text-blueDark hover:border-blueDark")}
                  onClick={() => onHandleCreateSubscription(plan.name)}
                >

                  {isSubmitting ? (
                    <>
                      <svg className="-ml-1 mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#8c9fb9" strokeWidth="4"></circle>
                        <path fill="#135A9A" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p>Loading...</p>
                    </>
                  ) : (
                    <div className="flex">
                      <p className="text-lg tracking-wider">{plan.name === "free" ? "Free for 1 month" : `${formatCurrency(plan.price)} / mois`}  </p>
                      <p className="text-lg hidden group-hover:block ml-2"> - S'ouscrire</p>
                    </div>
                  )
                  }
                </Button>
                {
                  plan.name === "premium" ? (
                    <p className="mt-2 text-sm text-blueDark">Après validation, vous serez redirigé vers une page sécurisée de paiement <em className="text-blueDark ">Stripe</em></p>
                  ) : (
                    <p className="mt-2 text-sm text-blueDark">Après la fin de votre période d'essai, votre page web ne sera plus accessible</p>
                  )
                }
              </CardFooter>
            </Card>
          )
        })
      }
    </div>
  );
}