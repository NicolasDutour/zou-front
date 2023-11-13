import PlanCard from "./PlanCard"


async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pricing-plans`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Steps() {
  const plans = await getData()

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold">Les abonnements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans?.data.map(plan => <PlanCard key={plan.id} plan={plan} />)}
        </div>
      </div>
    </section>
  )
}
