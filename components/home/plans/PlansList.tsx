import { PlanType } from "@/lib/types/homeType"
import PlanItem from "./PlanItem"

export default async function PlansList({ plans }: { plans: PlanType[] }) {
  return (
    <>
      {
        plans?.map((plan: PlanType) => <PlanItem key={plan.id} plan={plan} />)
      }
    </>
  )
}
