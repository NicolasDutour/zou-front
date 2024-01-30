import { cookies } from "next/headers";

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/admin/Breadcrumbs';
import { ProductTabs } from "@/components/pages/admin/product/ProductTabs";
import { NoProduct } from "@/components/pages/admin/product/NoProduct";
import { NoRestaurant } from "@/components/pages/admin/product/NoRestaurant";

async function getData(token: string) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/users/me?populate[restaurants][populate]=*`;

  if (token) {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!response.ok) {
      console.log("error");
    }
    return response.json()
  }
}

export default async function ProductsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getData(token || '')
  const restaurant = data?.restaurants[0]
  const products = data?.restaurants[0]?.products

  return (
    <div className="space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Produits", href: "/admin/product" }
        ]}
      />
      <Separator />
      {
        restaurant ? (
          products?.length > 0 ? (
            <ProductTabs products={products} />
          ) : (
            <NoProduct />
          )
        ) : (
          <NoRestaurant />
        )
      }
    </div>
  )
}