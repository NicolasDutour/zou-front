import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/admin/Breadcrumbs';
import { ProductForm } from "@/components/pages/admin/product/ProductForm";
import { cookies, headers } from "next/headers";

async function getProductData(token: string, productId: string) {
  if (token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productId}?populate=*`,
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

export default async function UpdateProductPage() {
  const headersList = headers()
  const queryId = headersList.get('queryId') || ''
  const cookieStore = cookies()
  const environment = process.env.NODE_ENV
  const token = cookieStore.get('token')?.value || ''
  const product = await getProductData(token, queryId)
  const restaurantId = product?.data?.attributes?.restaurant?.data?.id

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Produits", href: "/admin/product" },
            {
              label: `Mise à jour du produit ${product.data.attributes.product_name}`,
              href: "/admin/product/update",
              active: true,
            },
          ]}
        />
      </div>
      <Separator />
      {restaurantId ? <ProductForm product={product.data.attributes} productId={product.data.id} restaurantId={restaurantId} environment={environment} /> : null}
    </div>
  )
}