import { MetadataRoute } from 'next'

async function getAllRestaurants() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants`,
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

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const restaurantsData = await getAllRestaurants()

//   const restaurants = restaurantsData?.data?.map(({ attributes: { slug, updatedAt } }: { attributes: { slug: string, updatedAt: string } }) => ({
//     url: `${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${slug}`,
//     lastModified: updatedAt,
//     changeFrequency: 'yearly',
//     priority: 1,
//   }))

//   const routes = [''].map((route) => ({
//     url: `${process.env.NEXT_PUBLIC_FRONT_URL}/${route}`,
//     lastModified: new Date(),
//     changeFrequency: 'yearly',
//     priority: 0.8,
//   }))

//   return [...restaurants, ...routes]
// }


export async function GET() {
  const restaurantsData = await getAllRestaurants()

  const restaurants = restaurantsData?.data?.map(({ attributes: { slug, updatedAt } }: { attributes: { slug: string, updatedAt: string } }) => ({
    url: `${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${slug}`,
    lastModified: updatedAt,
    changeFrequency: 'yearly',
    priority: 1,
  }))

  const routes = [''].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_FRONT_URL}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  const xmls = [...restaurants, ...routes]

  const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmls
      .map((restaurant: any) => `<sitemap><loc>${restaurant.url}</loc></sitemap>`)
      .join("")}
    </urlset>`;

  return new Response(xmlStr, {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
    },
  });
}