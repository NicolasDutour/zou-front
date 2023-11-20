import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import { capitalize } from '@/lib/utils';

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

export default async function SettingsSubscriptionsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getData(token || '')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Abonnement</h1>
        <p className="text-sm text-muted-foreground">
          Gestion de votre abonnement
        </p>
      </div>
      <Separator />
      <h2 className='text-2xl'>Abonnement actuel</h2>
      <p className='text-lg text-secondary'> {capitalize(data?.pricing_plan.title)}</p>
      <p> <span className="font-bold text-2xl text-secondary">{data?.pricing_plan.price}</span> € / mois </p>
      <p className='text-sm'>Facturé mensuellement</p>
      {/* <p>Annulation le ... à ... (si annulation demandée)</p> */}
    </div>
  )
}