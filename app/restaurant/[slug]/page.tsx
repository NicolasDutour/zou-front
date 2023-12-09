import RestaurantBanner from "@/components/RestaurantBanner"
import Mapbox from "@/components/MapBox"
import RestaurantInfo from "@/components/RestaurantInfo";
import ListMenu from "@/components/ListMenu";
import { Metadata, ResolvingMetadata } from "next";
import RestaurantDescription from "@/components/RestaurantDescription";
import ListMenuFiles from "@/components/ListMenuFiles";

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

const getRestaurantDetails = async (slug: string) => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants?filters[slug][$eq]=${slug}&populate[products][populate]=*&populate[opening_hour][populate]=*&populate[banner_photo][populate]=*&populate[menu_photo][populate]=*`
  const response = await fetch(url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

  if (!response.ok) {
    console.log("error");
  }

  return response.json();
}

export default async function Restaurant({ params }: Props) {
  const slug = params?.slug
  const restaurantData = await getRestaurantDetails(slug)

  const { attributes } = restaurantData?.data[0] || {};

  const hasFilesMenu = attributes?.choice_menu === "import_files" && attributes?.menu_photo?.data?.length > 0;
  const hasListMenu = attributes?.choice_menu === "list_products" && attributes?.products?.data.length > 0;
  const hasBothMenus = attributes?.choice_menu === "both" && attributes?.menu_photo?.data?.length > 0 && attributes?.products?.data.length > 0;


  return (
    <div>
      {attributes ? <RestaurantBanner restaurant={attributes} /> : null}
      {attributes?.description ? <RestaurantDescription description={attributes.description} /> : null}

      {hasFilesMenu && <ListMenuFiles files={attributes?.menu_photo?.data} />}
      {hasListMenu && <ListMenu products={attributes.products.data} />}
      {hasBothMenus && (
        <>
          <ListMenuFiles files={attributes?.menu_photo?.data} />
          <ListMenu products={attributes.products.data} />
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-800">
        {attributes ? <RestaurantInfo restaurant={attributes} /> : null}
        <div>
          {attributes ? <Mapbox restaurant={attributes} /> : null}
        </div>
      </div>
    </div >
  )
}