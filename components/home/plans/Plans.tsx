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
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold">Un abonnement unique</h1>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          <PlansList plans={plans?.data} />
        </div>
      </div>
    </section>
  )
}
