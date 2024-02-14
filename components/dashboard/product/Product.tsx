import { cookies } from "next/headers"
import { NoRestaurant } from "./NoRestaurant";
import { ProductTabs } from "./ProductTabs";
import { NoProduct } from "./NoProduct";

async function getProductData(token: string) {
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

export default async function Restaurant() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getProductData(token || '')
  const restaurant = data?.restaurants[0]
  const products = data?.restaurants[0]?.products

  return (
    <div>
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
