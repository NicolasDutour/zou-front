import RestaurantBanner from "@/components/RestaurantBanner"
import Mapbox from "@/components/MapBox"
import RestaurantInfo from "@/components/RestaurantInfo";
import ListMenu from "@/components/ListMenu";

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

export default async function Restaurant({ params }: { params: { slug: string } }) {
  const slug = params?.slug
  const restaurantData = await getRestaurantDetails(slug)
  const restaurant = restaurantData?.data[0]?.attributes;
  const products = restaurantData?.data[0]?.attributes?.products?.data

  return (
    <div className="bg-[#F6F7F8]">
      <RestaurantBanner restaurant={restaurant} />
      <ListMenu products={products} />
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-800">
        <RestaurantInfo restaurant={restaurant} />
        <div>
          <Mapbox restaurant={restaurant} />
        </div>
      </div>
    </div >
  )
}