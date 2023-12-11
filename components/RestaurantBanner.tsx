'use client'

import { BsArrowDownCircle } from 'react-icons/bs'
import { RestaurantType } from '@/lib/types'
import { addSpaceToPhoneNumber, capitalize, cn } from '@/lib/utils';

export default function RestaurantBanner({ restaurant }: { restaurant: RestaurantType }) {
  const scrollDown = () => {
    window.scrollBy(0, 400);
  };

  let backgroundImageStyle
  let picture;
  if (restaurant?.banner_photo?.data?.attributes?.formats) {
    if (restaurant.banner_photo?.data?.attributes?.formats?.large) {
      picture = restaurant.banner_photo?.data?.attributes?.formats?.large.url;
      backgroundImageStyle = {
        backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL + picture})`,
      };
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

  return (
    <section className="w-full">
      <div className={cn(`relative p-10 bg-cover bg-center h-full flex justify-center items-center`, picture ? null : "bg-gray-400")} style={backgroundImageStyle}>
        <div className="bg-black opacity-70 absolute inset-0"></div>
        <div className="mb-10 z-10 md:max-w-xl mx-auto">
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
          <p onClick={scrollDown} className='icon-move-down flex justify-center mt-12 text-white text-4xl cursor-pointer'><BsArrowDownCircle /></p>
        </div>
      </div>
    </section>
  )
}
