import { cookies } from "next/headers";

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/dashboard/Breadcrumbs';
import { RestaurantForm } from "@/components/pages/dashboard/restaurant/RestaurantForm";

async function getData(token: string) {
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[restaurants][populate]=*&populate[pricing_plan][populate]=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!res.ok) {
      console.log("error");
    }
    return res.json()
  }
}

export default async function UpdateRestaurantPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const environment = process.env.NODE_ENV
  const user = await getData(token || '')
  const restaurant = user?.restaurants[0]

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Restaurant", href: "/dashboard/restaurant" },
            {
              label: "Mise à jour de votre restaurant",
              href: "/dashboard/restaurantedit",
              active: true,
            },
          ]}
        />
      </div>
      <Separator />
      {user && restaurant ? <RestaurantForm user={user} environment={environment} restaurant={restaurant} /> : null}
    </div>
  )
}