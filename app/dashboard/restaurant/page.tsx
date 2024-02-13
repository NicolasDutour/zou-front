import Breadcrumbs from '@/components/dashboard/Breadcrumbs'
import { Suspense } from 'react'
import { SkeletonCardProfile } from '@/components/SkeletonCardProfile'
import Restaurant from '@/components/dashboard/restaurant/Restaurant'

export default async function RestaurantPage() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={[
        { label: "Restaurant", href: "/dashboard/restaurant", active: true },
      ]} />

      <Suspense fallback={<SkeletonCardProfile />}>
        <Restaurant />
      </Suspense>
    </div>
  )
}