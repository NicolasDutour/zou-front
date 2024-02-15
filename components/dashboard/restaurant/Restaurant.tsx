import { addSpaceToPhoneNumber, capitalize, createSlug } from "@/lib/utils";
import { cookies } from "next/headers"
import { NoRestaurant } from "./NoRestaurant";
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlinePhone } from 'react-icons/ai'
import { MdAlternateEmail, MdOutlineDeliveryDining, MdOutlineTableRestaurant, MdSevereCold } from 'react-icons/md'
import { FaWheelchairMove } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { FaHandRock } from "react-icons/fa";
import { TbPaperBag } from "react-icons/tb";
import { GoSun } from "react-icons/go";

async function getRestaurantData(token: string) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/users/me?populate[restaurants][populate]=*`;

  if (token) {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!response.ok) {
      console.log("error");
    }
    return response.json()
  }
}

const options = [
  { key: "drive", value: "drive", icon: <FaHandRock /> },
  { key: "take_away", value: "à emporter", icon: <TbPaperBag /> },
  { key: "delivery", value: "livraison", icon: <MdOutlineDeliveryDining /> },
  { key: "eat_in", value: "sur place", icon: <MdOutlineTableRestaurant /> },
  { key: "pmr", value: "Accessible PMR", icon: <FaWheelchairMove /> },
  { key: "terrace", value: "Terrace", icon: <GoSun /> },
  { key: "air_conditioner", value: "Air conditioner", icon: <MdSevereCold /> },
]

export default async function Restaurant() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getRestaurantData(token || '')
  const environment = process.env.NODE_ENV
  const restaurant = data?.restaurants[0]

  const hasFilesMenu = restaurant?.choice_menu === "import_files" && restaurant?.menu_photo?.length > 0;
  const hasBothMenus = restaurant?.choice_menu === "both" && restaurant?.menu_photo?.length > 0 && restaurant?.products?.length > 0;

  return (
    <div>
      {
        restaurant ? (
          <div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='w-full space-y-4 rounded-2xl border border-gray bg-blueDark p-4 text-white'>
                <p className='mb-6 text-center text-3xl font-medium'>{capitalize(restaurant?.restaurant_name)} </p>
                <div className='flex items-center'>
                  <p className='mr-4'>
                    <IoLocationOutline className="text-2xl" />
                  </p>
                  <p>{restaurant?.address}</p>
                </div>
                <div className='flex items-center '>
                  <p className='mr-4'>
                    <MdAlternateEmail className="text-2xl" />
                  </p>
                  <p>{restaurant?.email}</p>
                </div>
                <div className='flex items-center '>
                  <p className='mr-4'>
                    <AiOutlinePhone className="text-2xl" />
                  </p>
                  <p>{addSpaceToPhoneNumber(restaurant?.phone)}</p>
                </div>
                <div className='flex items-center'>
                  <p className='mr-4'>
                    <IoIosLink className="text-2xl" />
                  </p>
                  <Link className="underline underline-offset-4" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(restaurant?.restaurant_name)}`} target="_blank">
                    {`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(restaurant?.restaurant_name)}`}
                  </Link>
                </div>
              </div>
              <div className='relative h-48 w-full space-y-4 rounded-2xl border border-gray bg-blueDark p-4 lg:h-full'>
                <Image
                  src={restaurant?.banner_photo ? environment === "production" ? restaurant?.banner_photo.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${restaurant?.banner_photo.url}` : "/no_image.png"}
                  alt={restaurant?.banner_photo?.name || "no_image"}
                  style={{
                    objectFit: restaurant?.banner_photo ? "cover" : "contain",
                  }}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={80}
                  aspect-auto="true"
                  className="rounded-lg"
                />
              </div>
              <div className='w-full space-y-8 rounded-2xl border border-gray bg-blueDark p-4 text-white'>
                <p className='text-lg font-medium'> Brève présentation </p>
                <p>{restaurant?.short_description}</p>
              </div>
              <div className='w-full space-y-8 rounded-2xl border border-gray bg-blueDark p-4 text-white'>
                <p className='text-lg font-medium'> Services proposés</p>
                <div className={`grid grid-cols-2 gap-4`}>
                  {options.map(({ key, value, icon }) => {
                    if (restaurant[key] === true) {
                      return (
                        <div key={key} className="flex items-center">
                          <p className='mr-4 text-6xl'>{icon}</p>
                          <p> {capitalize(value)} </p>
                        </div>
                      );
                    }
                    return null
                  })}
                </div>
              </div>
              <div className="w-full space-y-8 rounded-2xl border border-gray bg-blueDark p-4 text-white lg:col-span-2">
                <p className='text-lg font-medium'> Présentation de votre établissement </p>
                <p>{restaurant?.description}</p>
              </div>

              {
                hasBothMenus ? (
                  <div className='space-y-4 rounded-2xl bg-blueDark p-4 text-white lg:col-span-2'>
                    <p className='text-xl font-medium'>Les menus</p>
                    <div className={`mt-4 grid grid-cols-2 gap-4`}>
                      {restaurant?.menu_photo?.map((file: any, index: number) => {
                        return (
                          <div key={index} className="flex items-center">
                            <Link href={environment === 'production' ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${file.url}`} target='_blank' className="flex cursor-pointer items-center justify-center rounded-md border border-gray bg-blueDarker p-6 transition-colors duration-700 ease-out hover:bg-white hover:text-blueDark"><span className='underline underline-offset-4'> {file.name}</span> </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null
              }

              {
                hasFilesMenu ? (
                  <div className='space-y-4 rounded-2xl bg-blueDark p-4 text-white'>
                    <p className=' text-xl font-medium'>Les menus</p>
                    <div className={`mt-4 grid grid-cols-2 gap-4`}>
                      {restaurant?.menu_photo?.map((file: any, index: number) => {
                        return (
                          <div key={index} className="flex items-center">
                            <Link href={environment === 'production' ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${file.url}`} target='_blank' className="flex cursor-pointer items-center justify-center rounded-md border border-gray bg-blueDarker p-6 transition-colors duration-700 ease-out hover:bg-white hover:text-blueDark"><span className='underline underline-offset-4'> {file.name}</span> </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null
              }
            </div>
            <Link
              href="/dashboard/restaurant/edit"
              className="mt-4 flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-medium leading-6 text-blueDark md:w-1/2 lg:w-1/3"
            >
              Modifier
            </Link>
          </div>
        ) : (
          <NoRestaurant />
        )
      }
    </div>
  )
}
