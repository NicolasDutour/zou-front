import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import { RestaurantForm } from "@/components/dashboard/restaurant/RestaurantForm";
import { cookies } from "next/headers";

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
      {user ? <RestaurantForm user={user} /> : null}
    </div>
  )
}