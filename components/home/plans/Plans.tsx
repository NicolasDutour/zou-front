
import { PlansList } from "./PlansList";
// import { OptionsCard } from "@/components/pages/admin/subscription/OptionsCard"

export const Plans = ({ plans }: { plans: any }) => {
  return (
    <section className="bg-base px-6 py-10">
      <div className="mx-auto lg:max-w-5xl">
        <PlansList plans={plans} />
        {/* <OptionsCard /> */}
      </div>
    </section>
  )
}
