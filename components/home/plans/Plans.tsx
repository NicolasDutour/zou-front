import { PlanType } from "@/lib/types/homeType"
import PlansList from "./PlansList"

async function getData() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/pricing-plans?sort=id:asc`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    console.error('Failed to fetch data')
  }
  return response.json()
}

export default async function Plans() {
  const plans: { data: PlanType[] } = await getData()

  if (plans.data.length === 0) {
    return <div>No plans for today</div>
  }

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Un abonnement unique</h1>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <PlansList plans={plans?.data} />
        </div>
      </div>
    </section>
  )
}
