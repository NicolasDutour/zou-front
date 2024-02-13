import { cookies } from "next/headers";

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/dashboard/Breadcrumbs';
import { SubscriptionForm } from "@/components/pages/dashboard/subscription/SubscriptionForm";

async function getUserData(token: string) {
  if (token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[stripe_products][populate]=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!response.ok) {
      console.log("error");
    }
    return response.json()
  }
}

async function getDataPlans() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/plans?sort=amount:asc`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    console.error('Failed to fetch data')
  }
  return response.json()
}

export default async function CreateSubscriptionPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ""
  const user = await getUserData(token)
  const plans = await getDataPlans()

  // console.log("user", user);
  // console.log("stripe_subscriptions", user?.stripe_products[0]?.stripe_subscriptions);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Abonnement", href: "/dashboard/subscription" },
            {
              label: `${user?.stripeUserId && user?.stripe_products[0]?.stripeProductName === "zou-plan" &&
                user?.stripe_products[0]?.stripe_subscriptions[0].stripeSubscriptionId ? "Ajout d'une option" : "Création de votre abonnement"}`,
              href: "/dashboard/subscription/new",
              active: true,
            },
          ]}
        />
      </div>
      <Separator />
      {user && plans ? <SubscriptionForm user={user} plans={plans.data} /> : null}
    </div>
  )
}