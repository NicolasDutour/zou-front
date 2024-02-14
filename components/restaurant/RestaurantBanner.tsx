import Image from "next/image"
import { FaPhone } from "react-icons/fa6";

import { RestaurantType , FormatsType } from '@/lib/definitions'

import { addSpaceToPhoneNumber } from '@/lib/utils';
import { OptionItem } from "./OptionItem";

export default function RestaurantBanner({ restaurant }: { restaurant: RestaurantType }) {
  const environment = process.env.NODE_ENV;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const { restaurant_name, short_description, phone, banner_photo } = restaurant;

  const formats: FormatsType = banner_photo?.data?.attributes?.formats || {};
  const sizeOrder = ['large', 'medium', 'small', 'thumbnail'];
  const options: { key: string, value: string }[] = [
    { key: "drive", value: "drive" },
    { key: "take_away", value: "à emporter" },
    { key: "delivery", value: "livraison" },
    { key: "eat_in", value: "sur place" }
  ]
  const findFirstFormat = (): { url: string; name: string } => {
    for (const size of sizeOrder) {
      if (formats[size]) {
        return { url: formats[size]?.url || '', name: formats[size]?.name || '' };
      }
    }
    return { url: '', name: 'banner' };
  };

  const pictureInfo = findFirstFormat();
  const picture = pictureInfo.url ? (environment === 'production' ? pictureInfo.url : `${STRAPI_URL}${pictureInfo.url}`) : '/no_image.png';
  const pictureName = pictureInfo.name;

  return (
    <section className="w-full">
      <div className="relative flex h-full items-center justify-center">
        <Image
          src={picture}
          alt={pictureName}
          style={{
            objectFit: "cover",
          }}
          fill
          priority
          sizes="100vw"
          quality={100}
          placeholder="blur"
          blurDataURL={picture}
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="z-10 mx-auto p-20 md:max-w-xl">
          <h1 className="text-center text-4xl font-bold uppercase text-white">{restaurant_name}</h1>
          <h2 className="my-8 text-center text-lg italic text-white"> {short_description} </h2>
          <div className={`mt-4 grid grid-cols-1 gap-2 md:grid-cols-2`}>
            {
              options.map(option => (
                <OptionItem key={option.key} option={option} restaurant={restaurant} />
              ))
            }
          </div>
          <div className="my-8 flex items-center justify-center text-3xl text-white">
            <FaPhone />
            <p className="ml-6 text-center">{addSpaceToPhoneNumber(phone)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
