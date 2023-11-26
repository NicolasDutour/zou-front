import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Separator } from "@/components/ui/separator";
import RestaurantsAdmin from './RestaurantAdmin';

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

export default async function SettingsRestaurantPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getData(token)

  if (!token) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Restaurant</h1>
        <p className="text-sm text-muted-foreground">
          Gestion de votre établissemnt
        </p>
      </div>
      <Separator />
      {data ? <RestaurantsAdmin user={data} token={token || ''} /> : null}
    </div>
  )
}