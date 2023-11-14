import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const restaurant = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants?filters[slug][$eq]=${params.slug}&populate[products][populate]=*&populate[opening_hour][populate]=*&populate[banner_photo][populate]=*`).then((res) =>
    res.json()
  )

  return new ImageResponse(
    (
      <div tw='relative flex items-center justify-center'>
        {/* <img src={restaurant.data[0].attributes.banner_photo} alt={restaurant.data[0].attributes.restaurant_name} /> */}
        <div>
          <p>{restaurant.restaurant_name}</p>
          <p>{restaurant.data[0].attributes.updatedAt}</p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}