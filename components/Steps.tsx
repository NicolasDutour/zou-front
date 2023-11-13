import { StepType } from "@/lib/types"
import StepCard from "./StepCard"

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/steps`, {
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
  const steps: { data: StepType[] } = await getData()

  return (
    <section className="bg-base py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold">Les étapes</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps?.data.map((step: StepType) => <StepCard key={step.id} step={step} />)}
        </div>
      </div>
    </section>
  )
}
