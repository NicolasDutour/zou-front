import Breadcrumbs from '@/components/dashboard/Breadcrumbs'
import { Suspense } from 'react'
import { SkeletonCardProduct } from '@/components/dashboard/product/SkeletonCardProduct'
import Product from '@/components/dashboard/product/Product'

export default async function ProductPage() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={[
        { label: "Product", href: "/dashboard/product", active: true },
      ]} />

      <Suspense fallback={<SkeletonCardProduct />}>
        <Product />
      </Suspense>
    </div>
  )
}