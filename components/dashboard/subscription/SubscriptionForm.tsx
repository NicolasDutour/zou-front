"use client"

import Link from "next/link";
import { UserType } from '@/lib/definitions/userType';
import { createCustomer, createPrice, createProduct, createSessionCheckout } from "@/lib/actions/stripe-actions";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn, formatCurrency } from "@/lib/utils";
import { PlanType } from "@/lib/definitions";
import { profileAction } from "@/lib/actions";

export function SubscriptionForm({ user, plans }: { user: UserType, plans: PlanType[] }) {
  const [subscription, setSubscription] = useState(null as PlanType | null)

  async function onHandleCreateOrUpdateSubscription(e) {
    e.preventDefault()
    let customer = user?.stripeUserId;
    if (!customer) {
      console.log("no stripe customer");

      if (user?.username && user?.email) {
        console.log("has username and email", user?.username, user?.email);

        const customerId = await createCustomer(user?.username, user?.email)
        if (customerId) {
          console.log("stripe customerId created", customerId);

          const response = await profileAction({ stripeUserId: customerId }, user?.id)
          if (response) {
            customer = customerId
          }
        }
      }
    }

    if (customer) {
      console.log("has stripe customer", customer);

      if (
        user?.stripe_products[0]?.stripeProductName === "zou-plan" &&
        user?.stripe_products[0]?.stripe_subscriptions[0].stripeSubscriptionId
      ) {
        console.log("subscription created");

      } else {
        const planProductId = await createProduct("zou-plan");
        if (planProductId && subscription) {
          console.log("stripe product created", planProductId);


          const planPriceId = await createPrice(planProductId, subscription?.attributes?.amount * 100, "EUR", "day");
          if (planPriceId) {
            console.log("stripe price created", planPriceId);

            await createSessionCheckout(customer, planPriceId, "subscription");
          }
        }
      }
    }
  }

  const handlePlan = (value: string) => {
    setSubscription(JSON.parse(value))
  }

  const monthlyAmount = (amount: number, period: number, period_type: string) => {
    if (period_type === 'an') return formatCurrency(amount / 12)
    return formatCurrency(amount / period)
  }

  return (
    <form onSubmit={onHandleCreateOrUpdateSubscription}>
      <RadioGroup onValueChange={handlePlan} className="grid grid-cols-3 gap-4">
        {
          plans.map((plan: PlanType) => {
            return (
              <div key={plan.id}>
                <RadioGroupItem value={JSON.stringify(plan)} id={plan.attributes.name} className="peer sr-only" />
                <Label
                  htmlFor={plan.attributes.name}
                  className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-yellow-400 [&:has([data-state=checked])]:border-yellow-400"
                >
                  <div>
                    <p className="text-4xl mb-2">{plan.attributes.period}</p>
                    <p> {plan.attributes.period_type} </p>
                  </div>
                  <p className="text-xl">{monthlyAmount(plan.attributes.amount, plan.attributes.period, plan.attributes.period_type)}<span className="text-gray-500 text-sm"> / mois</span></p>
                  <p className={cn("rounded-full text-center w-full p-2 mt-4", plan.attributes.name === subscription?.attributes?.name ? "bg-yellow-400 text-blueDarker" : "bg-blueDarker text-white")}> {plan.attributes.period} {plan.attributes.period_type}  pour {formatCurrency(plan.attributes.amount)} </p>
                </Label>
              </div>
            )
          })
        }
      </RadioGroup>

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