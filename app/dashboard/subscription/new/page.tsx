import { cookies } from "next/headers";

import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import { SubscriptionForm } from "@/components/dashboard/subscription/SubscriptionForm";
import { plans } from "@/components/plans/PlansList";

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

export default async function CreateSubscriptionPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ""
  const user = await getUserData(token)

  return (
    <div className="space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Abonnement", href: "/dashboard/subscription" },
          {
            label: `${user?.stripeCustomerId && user?.stripeSubscriptionId ? "Ajout d'une option" : "Création de votre abonnement"}`,
            href: "/dashboard/subscription/new",
            active: true,
          },
        ]}
      />
      {user && plans ? <SubscriptionForm user={user} plans={plans} /> : null}
    </div>
  )
}