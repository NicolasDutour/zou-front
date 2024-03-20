
import { Suspense } from "react";
import { SkeletonPlans } from "./SkeletonPlans";
import PlansList from "./PlansList";

export default async function Plans() {
  return (
    <section id="plans" className="bg-primary-foreground p-10">
      <div className="mx-auto lg:max-w-5xl">
        <h1 className="mb-8 text-2xl font-medium text-gray-700">Les formules</h1>
        <Suspense fallback={<SkeletonPlans />}>
          <PlansList />
        </Suspense>
      </div>
    </section>
  )
}
