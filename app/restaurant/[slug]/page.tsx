import RestaurantBanner from "@/components/RestaurantBanner"
import Mapbox from "@/components/MapBox"
import RestaurantInfo from "@/components/RestaurantInfo";
import ListMenu from "@/components/ListMenu";
import { Metadata, ResolvingMetadata } from "next";
import RestaurantDescription from "@/components/RestaurantDescription";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug

  const restaurantData = await getRestaurantDetails(slug)

  return {
    title: restaurantData.data[0]?.attributes.restaurant_name,
    description: restaurantData.data[0]?.attributes.description,
    alternates: {
      canonical: `/${restaurantData.data[0]?.attributes.slug}`,
      // languages: {
      //   "fr": `fr/${restaurantData.data[0].attributes.slug}`,
      //   "en-EN": `en/${restaurantData.data[0].attributes.slug}`
      // }
    },
    openGraph: {
      title: restaurantData.data[0]?.attributes.restaurant_name,
      description: restaurantData.data[0]?.attributes.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: restaurantData.data[0]?.attributes.restaurant_name,
      description: restaurantData.data[0]?.attributes.description
    }
  }
}

async function getRestaurantDetails(slug: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants?filters[slug][$eq]=${slug}&populate[products][populate]=*&populate[opening_hour][populate]=*&populate[banner_photo][populate]=*`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache'
    })

  if (!response.ok) {
    console.log("error");
  }

  return response.json();
}

export default async function Restaurant({ params }: Props) {
  const slug = params?.slug
  const restaurantData = await getRestaurantDetails(slug)
  const restaurant = restaurantData?.data[0]?.attributes;
  const products = restaurantData?.data[0]?.attributes?.products?.data

  return (
    <div>
      {restaurant ? <RestaurantBanner restaurant={restaurant} /> : null}
      {restaurant?.description ? <RestaurantDescription description={restaurant.description} /> : null}
      {products ? <ListMenu products={products} /> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-800">
        {restaurant ? <RestaurantInfo restaurant={restaurant} /> : null}
        <div>
          {restaurant ? <Mapbox restaurant={restaurant} /> : null}
        </div>
      </div>
    </div >
  )
}