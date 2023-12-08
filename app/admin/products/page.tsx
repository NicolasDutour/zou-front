import { cookies } from 'next/headers'
import { Separator } from "@/components/ui/separator";
import ProductsAdmin from "./ProductsAdmin";

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

  // console.log("data: ", data?.restaurants[0]?.menu_photo)


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Produits</h1>
        <p className="text-sm text-muted-foreground">
          Gestion des produits
        </p>
      </div>
      <Separator />
      {data ? <ProductsAdmin token={token || ''} user={data} /> : null}
    </div>
  )
}