import { cookies } from "next/headers";

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/dashboard/Breadcrumbs';
import { RestaurantForm } from "@/components/pages/dashboard/restaurant/RestaurantForm";

async function getUserData(token: string) {
  if (token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
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

export default async function CreateRestaurantPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ""
  const user = await getUserData(token)

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Restaurant", href: "/dashboard/restaurant" },
            {
              label: "Création de votre restaurant",
              href: "/dashboard/restaurant/new",
              active: true,
            },
          ]}
        />
      </div>
      <Separator />
      {user ? <RestaurantForm user={user} /> : null}
    </div>
  )
}