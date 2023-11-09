import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import { RestaurantForm } from "./RestaurantForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Manage your restaurant details",
}

async function getData() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

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

export default async function SettingsRestaurantPage() {
  const data = await getData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Restaurant</h1>
        <p className="text-sm text-muted-foreground">
          Update your restaurant details
        </p>
      </div>
      <Separator />
      {data ? <RestaurantForm user={data} /> : null}
    </div>
  )
}