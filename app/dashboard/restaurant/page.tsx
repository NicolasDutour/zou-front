import Breadcrumbs from '@/components/dashboard/Breadcrumbs'
import { Suspense } from 'react'
import Restaurant from '@/components/dashboard/restaurant/Restaurant'
import { SkeletonCardRestaurant } from '@/components/dashboard/restaurant/SkeletonCardRestaurant'

export default async function RestaurantPage() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={[
        { label: "Restaurant", href: "/dashboard/restaurant", active: true },
      ]} />

      <Suspense fallback={<SkeletonCardRestaurant />}>
        <Restaurant />
      </Suspense>
    </div>
  )
}