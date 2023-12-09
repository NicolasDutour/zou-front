import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import { capitalize, cn } from '@/lib/utils';
import { PlanType } from '@/lib/types';
import PlanCard from './PlanCard';
import SubscriptionButton from './SubscriptionButton';
import Stripe from 'stripe';
import dayjs from "dayjs"
require('dayjs/locale/fr')
dayjs.locale('fr')

async function getDataUserInfo(token: string) {
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

async function retrieveSusbcription(sub_id: string) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
  const data = await stripe.subscriptions.retrieve(sub_id);
  return {
    data
  }
}

export default async function SettingsSubscriptionsPage({ params }) {
  // console.log("params", params);

  // const cookieStore = cookies()
  // const token = cookieStore.get('token')?.value
  // const user = await getDataUserInfo(token || '')
  // const plans = await getDataPlans()
  // const subscription_info = await retrieveSusbcription("sub_1OEvErHaenaduY9GBlNX9Tu2")

  // const sub_id: string = subscription_info.data.id
  // const current_period_start: number = subscription_info.data.current_period_start
  // const current_period_end: number = subscription_info.data.current_period_end
  // const plan_id: string = subscription_info.data.plan.id
  // const amount: number = subscription_info.data.plan.amount
  // const interval: string = subscription_info.data.plan.interval
  // const status: string = subscription_info.data.status

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Abonnement</h1>
        <p className="text-sm text-muted-foreground">Gestion de votre abonnement</p>
      </div>
      <Separator />
      {/* {
        false ? (
          <div>
            <h2 className='text-2xl'>Abonnement actuel</h2>
            <div className={cn("flex items-center w-full md:w-1/2 justify-between border-2 rounded-md mb-2", plan_id === "price_1OEuWMHaenaduY9Gz2bCYG9w" ? "border-primary" : "border-primary")}>
              <div className='p-4'>
                <p className={cn('uppercase font-bold', plan_id === "price_1OEuWMHaenaduY9Gz2bCYG9w" ? "text-primary" : "text-primary")}> {plan_id === "price_1OEuWMHaenaduY9Gz2bCYG9w" ? "Essentiel" : "Premium"} </p>
                <p className='text-sm mt-6'> {interval === "month" ? "Facturé mensuellement" : ""}</p>
              </div>
              <p className={cn('text-2xl text-white p-4 self-stretch grid place-items-center', plan_id === "price_1OEuWMHaenaduY9Gz2bCYG9w" ? "bg-primary" : " bg-primary")}>{(amount / 100).toFixed(2)} € / mois</p>
            </div>
            <div className='border border-primary rounded-md w-1/2 p-4'>
              <p className='mb-2'>Début abonnement: <span className='text-primary font-bold tracking-wider'>{dayjs.unix(current_period_start).format('DD MMMM YYYY')}</span> </p>
              <p className='mb-2'>Fin abonnement: <span className='text-primary font-bold tracking-wider'>{dayjs.unix(current_period_end).format('DD MMMM YYYY')}</span> </p>
              {status === "canceled" && current_period_end <= Date.now() ? null : <p>Renouvellement automatique le <span className='text-primary font-bold tracking-wider'>{dayjs.unix(current_period_end).format('DD MMMM YYYY')}</span> </p>}
            </div>
            {status === "active" ? <SubscriptionButton sub_id={sub_id} plan_id={plan_id} /> : null}
            {status == "canceled" ? (
              <div>
                <p>{"Vous avez demandé l'annulation de votre abonnement."}</p>
                <p>Il prendra fin le <span className='text-primary font-bold tracking-wider'>{dayjs.unix(current_period_end).format('DD MMMM YYYY')}</span> à <span className='text-primary font-bold tracking-wider'>{dayjs.unix(current_period_end).format('HH:mm').replace(':', 'h')}</span></p>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <p className='mb-2 text-lg'> {"Vous n'avez pas d'abonnement pour l'instant."} </p>
            <p className='mb-4'>Choisissez-en un:</p>
            {plans?.data.map((plan: PlanType, index: string) => <PlanCard key={index} plan={plan} user={user} />)}
          </div>
        )
      } */}
    </div>
  )
}