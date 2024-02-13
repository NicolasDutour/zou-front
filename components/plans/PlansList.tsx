import { PlanCard } from "./PlanCard"

const plans = [
  {
    id: 1,
    name: "The One",
    price: 19.99,
    features: [
      "Dashboard access",
      "Email support"
    ]
  },
]

export default async function PlansList() {
  return (
    <div className={`flex justify-center`}>
      {
        plans?.map((plan: any) => (
          <PlanCard key={plan.id} plan={plan} />
        ))
      }
    </div>
  )
}
