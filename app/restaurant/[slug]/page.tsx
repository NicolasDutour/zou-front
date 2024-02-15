import { Metadata } from "next";

import RestaurantBanner from "@/components/restaurant/RestaurantBanner"
import Mapbox from "@/components/restaurant/MapBox"
import RestaurantInfo from "@/components/restaurant/RestaurantInfo";
import ListMenu from "@/components/restaurant/ListMenu";
import RestaurantDescription from "@/components/restaurant/RestaurantDescription";
import ListMenuFiles from "@/components/restaurant/ListMenuFiles";

export async function generateMetadata(
  {
    params
  }: {
    params: {
      slug: string
    }
  },
): Promise<Metadata> {
  const slug = params.slug

  const restaurantDetails = await getRestaurantDetails(slug)
  const { restaurant_name, description } = restaurantDetails?.data[0].attributes || {}

  return {
    title: restaurant_name || "",
    description: description || "",
    alternates: {
      canonical: `/${slug}`,
      // languages: {
      //   "fr": `fr/${restaurantData.data[0].attributes.slug}`,
      //   "en-EN": `en/${restaurantData.data[0].attributes.slug}`
      // }
    },
    openGraph: {
      title: restaurant_name || "",
      description: description || "",
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: restaurant_name || "",
      description: description || ""
    }
  }
}

const getRestaurantDetails = async (slug: string) => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/restaurants?filters[slug][$eq]=${slug}&populate[products][populate]=*&populate[opening_hour][populate]=*&populate[banner_photo][populate]=*&populate[menu_photo][populate]=*`;

  const response = await fetch(url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

  if (!response.ok) {
    console.log("error");
  }

  return response.json();
}

export default async function Restaurant({
  params
}: {
  params: {
    slug: string
  }
}) {
  const slug = params?.slug
  const restaurantDetails = await getRestaurantDetails(slug)
  const environment = process.env.NODE_ENV

  const { attributes } = restaurantDetails?.data[0] || {};

  // const hasFilesMenu = attributes?.choice_menu === "import_files" && attributes?.menu_photo?.data;
  const hasListMenu = attributes?.choice_menu === "list_products" && attributes?.products?.data;
  // const hasBothMenus = attributes?.choice_menu === "both" && attributes?.menu_photo?.data && attributes?.products?.data.length > 0;

  // const renderListMenuFiles = () => hasFilesMenu && <ListMenuFiles files={attributes?.menu_photo?.data} />;
  // const renderBothMenus = () => hasBothMenus && (
  //   <>
  //     <ListMenuFiles files={attributes?.menu_photo?.data} />
  //     <ListMenu environment={environment} products={attributes?.products?.data} />
  //   </>
  // );

  return (
    <div>
      {attributes && <RestaurantBanner restaurant={attributes} />}
      {attributes?.description && <RestaurantDescription description={attributes.description} />}

      {/* {renderListMenuFiles()} */}
      {hasListMenu && <ListMenu environment={environment} products={attributes?.products?.data} />}
      {/* {renderBothMenus()} */}

      <div className="grid grid-cols-1 bg-blueDark md:grid-cols-2">
        {attributes && <RestaurantInfo restaurant={attributes} />}
        <div>
          {attributes && <Mapbox restaurant={attributes} />}
        </div>
      </div>
    </div>
  )
}