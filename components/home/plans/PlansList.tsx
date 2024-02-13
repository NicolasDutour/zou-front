import { PlanCard } from "./PlanCard"

export const PlansList = ({ plans }: { plans: any }) => {
  return (
    <div className={`md:grid-cols-${plans?.length} grid w-full grid-cols-1 gap-4`}>
      {
        plans.map((plan: any) => (
          <PlanCard key={plan.id} plan={plan} />
        ))
      }
    </div>
  )
}
