'use client'

import { BsArrowDownCircle } from 'react-icons/bs'
import { RestaurantType } from '@/lib/types'

export default async function RestaurantBanner({ restaurant }: { restaurant: RestaurantType }) {
  const scrollDown = () => {
    window.scrollBy(0, 400);
  };

  return (
    <section className="h-[550px] w-full">
      <div className="relative p-6 bg-cover bg-center h-full bg-hero-pattern flex justify-center items-center">
        <div className="bg-black opacity-50 absolute inset-0"></div>
        <div className="mb-10 z-10">
          <h1 className="mb-10 text-center text-4xl uppercase font-bold text-white">
            {restaurant?.restaurant_name || null}
          </h1>
          <p className="w-full lg:max-w-2xl text-left text-lg text-white mt-6"> {restaurant?.description || null} </p>
          <p onClick={scrollDown} className='icon-move-down flex justify-center mt-8 text-white text-4xl cursor-pointer'><BsArrowDownCircle /></p>
        </div>
      </div>
    </section>
  )
}
