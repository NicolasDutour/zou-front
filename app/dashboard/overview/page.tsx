import { SkeletonCardOverview } from "@/components/dashboard/overview/SkeletonCardOverview";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import Clients from "@/components/dashboard/overview/Clients";
import Visits from "@/components/dashboard/overview/Visits";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={[
        { label: "Overview", href: "/dashboard/overview", active: true },
      ]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Suspense fallback={<SkeletonCardOverview />}>
          <Visits />
        </Suspense>
        <Suspense fallback={<SkeletonCardOverview />}>
          <Clients />
        </Suspense>
      </div>
    </div>
  )
}
