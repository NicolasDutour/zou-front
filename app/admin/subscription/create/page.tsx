import { cookies } from "next/headers";

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/admin/Breadcrumbs';
import { SubscriptionForm } from "@/components/pages/admin/subscription/SubscriptionForm";

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
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Abonnement", href: "/admin/subscription" },
            {
              label: "Création de votre abonnement",
              href: "/admin/subscription/create",
              active: true,
            },
          ]}
        />
      </div>
      <Separator />
      {user ? <SubscriptionForm user={user} /> : null}
    </div>
  )
}