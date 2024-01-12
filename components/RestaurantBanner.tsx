'use client'

import { RestaurantType } from '@/lib/types'
import { addSpaceToPhoneNumber, capitalize, cn } from '@/lib/utils';
import Image from "next/image"

export default function RestaurantBanner({ environment, restaurant }: { environment: string, restaurant: RestaurantType }) {
  let picture: string
  let pictureName
  if (restaurant?.banner_photo?.data?.attributes?.formats) {
    if (restaurant.banner_photo?.data?.attributes?.formats?.large) {
      picture = restaurant.banner_photo?.data?.attributes?.formats?.large.url;
      pictureName = restaurant.banner_photo?.data?.attributes?.formats?.large.name;
    } else if (restaurant.banner_photo?.data?.attributes?.formats?.medium) {
      picture = restaurant.banner_photo?.data?.attributes?.formats?.medium.url;
      pictureName = restaurant.banner_photo?.data?.attributes?.formats?.medium.name;
    } else if (restaurant.banner_photo?.data?.attributes?.formats?.small) {
      picture = restaurant.banner_photo?.data?.attributes?.formats?.small.url;
      pictureName = restaurant.banner_photo?.data?.attributes?.formats?.small.name;
    } else if (restaurant.banner_photo?.data?.attributes?.formats?.thumbnail) {
      picture = restaurant.banner_photo?.data?.attributes?.formats?.thumbnail.url;
      pictureName = restaurant.banner_photo?.data?.attributes?.formats?.thumbnail.name;
    }
  }

  const options = [
    { key: "drive", value: "drive" },
    { key: "take_away", value: "à emporter" },
    { key: "delivery", value: "livraison" },
    { key: "eat_in", value: "sur place" }
  ]

  const activeOptions = () => {
    return options.filter(option => (restaurant as any)[option.key])
  }

  const getImage = () => {
    if (picture) {
      if (environment === 'production') {
        return picture
      }
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}${picture}`
    }
    return ''
  }

  return (
    <section className="w-full">
      <div className="relative h-full flex items-center justify-center">
        <Image
          src={getImage()}
          alt={pictureName || 'banner'}
          style={{
            objectFit: "cover",
          }}
          fill
          priority
          sizes="100vw"
          quality={100}
          placeholder="blur"
          blurDataURL={getImage()}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="bg-black opacity-70 absolute inset-0"></div>
        <div className="z-10 p-20 md:max-w-xl mx-auto">
          <h1 className="text-center text-4xl uppercase font-bold text-white">
            {restaurant?.restaurant_name || null}
          </h1>
          <h2 className="italic text-center text-lg text-white my-8"> {restaurant?.short_description || null} </h2>
          <div className={`grid grid-cols-1 md:grid-cols-${activeOptions().length} mt-4 gap-2`}>
            {
              activeOptions().map(option => (
                <p key={option.key} className='text-white text-center text-lg border rounded-md p-2'> {capitalize(option.value)} </p>
              ))
            }
          </div>
          <p className="text-center text-3xl text-white my-8"> {addSpaceToPhoneNumber(restaurant?.phone) || null} </p>
        </div>
      </div>
    </section>
  )
}
