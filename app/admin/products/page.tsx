import { cookies } from 'next/headers'
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import ProductsAdmin from "./ProductsAdmin";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Manage your restaurant details",
}

async function getData(token: string) {
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[restaurants][populate]=*&populate[pricing_plan][populate]=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!res.ok) {
      console.log("error");
    }
    return res.json()
  }
}

export default async function SettingsProductsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  const data = await getData(token || '')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Products</h3>
        <p className="text-sm text-muted-foreground">
          Update your products details
        </p>
      </div>
      <Separator />
      {data ? <ProductsAdmin token={token || ''} user={data} /> : null}
    </div>
  )
}