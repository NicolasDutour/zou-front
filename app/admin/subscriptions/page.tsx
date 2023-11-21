import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import { capitalize, cn } from '@/lib/utils';
import { PlanType } from '@/lib/types';

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

async function getDataPlans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pricing-plans`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch data')
  }
  return res.json()
}

export default async function SettingsSubscriptionsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getData(token || '')
  const plans: { data: PlanType[] } = await getDataPlans()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Abonnement</h1>
        <p className="text-sm text-muted-foreground">
          Gestion de votre abonnement
        </p>
      </div>
      <Separator />
      {
        data?.pricing_plan ? (
          <>
            <h2 className='text-2xl'>Abonnement actuel</h2>
            <div className={cn("flex items-center w-full md:w-1/2 justify-between border-2 rounded-md mb-2", data?.pricing_plan.title === "essentiel" ? "border-secondary" : "border-primary")}>
              <div className='p-4'>
                <p className={cn('uppercase font-bold', data?.pricing_plan.title === "essentiel" ? "text-secondary" : "text-primary")}> {data?.pricing_plan.title} </p>
                <p> {data?.pricing_plan.description} </p>
                <p className='text-sm mt-6'>Facturé mensuellement</p>
              </div>
              <p className={cn('text-2xl text-white p-4 self-stretch grid place-items-center', data?.pricing_plan.title === "essentiel" ? "bg-secondary" : " bg-primary")}>{data?.pricing_plan.price} € / mois</p>
            </div>
            <div>
              <p>Date début abonnement: ...</p>
              <p>Date fin abonnement: ...</p>
              <p>Renouvellement automatique le: ...</p>
            </div>
            <button
              type='button'
              className={cn("disabled:opacity-40 w-full md:w-1/4 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary", data?.pricing_plan.title === "essentiel" ? "bg-secondary" : "bg-primary")}
            >
              Annuler l'aboonnement
            </button>
            <p>Votre abonnement prendra fin le ... à ... (si annulation demandée)</p>
          </>
        ) : (
          <div>
            <p className='mb-2 text-lg'>Vous n'avez pas d'abonnement pour l'instant.</p>
            <p className='mb-4'>Choisissez-en un:</p>
            {plans?.data.map((plan: PlanType) => {
              const { id, attributes: { title, description, price, access, wedoforyou, youmanage } } = plan
              return (
                <div className={cn("flex items-center w-1/2 justify-between border-2 p-4 rounded-md mb-2 hover:p-6 transition-all cursor-pointer", title === "essentiel" ? "border-secondary" : "border-primary")}>
                  <div>
                    <p className={cn('uppercase font-bold', title === "essentiel" ? "text-secondary" : "text-primary")}> {title} </p>
                    <p> {description} </p>
                  </div>
                  <p className='text-2xl'>{price} € / mois</p>
                </div>
              )
            })}
          </div>
        )
      }
    </div>
  )
}