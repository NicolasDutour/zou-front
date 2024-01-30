import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/admin/Breadcrumbs';
import { ProductForm } from "@/components/pages/admin/product/ProductForm";
import { cookies } from "next/headers";

async function getUserData(token: string) {
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

export default async function CreateProductPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ""
  const environment = process.env.NODE_ENV
  const user = await getUserData(token)
  const restaurantId = user?.restaurants[0]?.id

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Produits", href: "/admin/product" },
            {
              label: "Création d'un produit",
              href: "/admin/product/create",
              active: true,
            },
          ]}
        />
      </div>
      <Separator />
      {restaurantId ? <ProductForm restaurantId={restaurantId} environment={environment} /> : null}
    </div>
  )
}