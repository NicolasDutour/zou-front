import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image"
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlinePhone } from 'react-icons/ai'
import { MdAlternateEmail } from 'react-icons/md'
import { IoIosLink } from "react-icons/io";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { TbPaperBag } from "react-icons/tb";
import { FaHandRock } from "react-icons/fa";
import { MdOutlineTableRestaurant } from "react-icons/md";

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/admin/Breadcrumbs';
import { NoRestaurant } from '@/components/pages/admin/restaurant/NoRestaurant'

import { addSpaceToPhoneNumber, capitalize, createSlug } from '@/lib/utils'

async function getData(token: string) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/users/me?populate[restaurants][populate]=*&populate[pricing_plan][populate]=*`;

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

export default async function RestaurantPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const data = await getData(token)
  const environment = process.env.NODE_ENV
  const restaurant = data?.restaurants[0]

  if (!token) {
    redirect('/login')
  }

  const options = [
    { key: "drive", value: "drive", icon: <FaHandRock /> },
    { key: "take_away", value: "à emporter", icon: <TbPaperBag /> },
    { key: "delivery", value: "livraison", icon: <MdOutlineDeliveryDining /> },
    { key: "eat_in", value: "sur place", icon: <MdOutlineTableRestaurant /> }
  ]

  const hasFilesMenu = restaurant?.choice_menu === "import_files" && restaurant?.menu_photo?.length > 0;
  const hasBothMenus = restaurant?.choice_menu === "both" && restaurant?.menu_photo?.length > 0 && restaurant?.products?.length > 0;

  return (
    <div className="space-y-6">
      <div className='flex justify-between items-center'>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Restaurant", href: "/admin/restaurant" }
          ]}
        />
        <Link
          href="/admin/restaurant/update"
          className="flex w-1/6 justify-center rounded-md bg-secondary py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          Modifier
        </Link>
      </div>
      <Separator />

      {
        restaurant ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='rounded-2xl bg-muted p-4 space-y-4'>
              <div className='space-y-2'>
                <p className=' font-medium text-center text-2xl mb-8 uppercase text-primary'>{restaurant?.restaurant_name} </p>
                <div className='flex items-center text-gray-600'>
                  <p className='text-gray-600 mr-4'>
                    <IoLocationOutline className="text-2xl text-primary" />
                  </p>
                  <p>{restaurant?.address}</p>
                </div>
                <div className='flex items-center text-gray-600'>
                  <p className='text-gray-600 mr-4'>
                    <MdAlternateEmail className="text-2xl text-primary" />
                  </p>
                  <p>{restaurant?.email}</p>
                </div>
                <div className='flex items-center text-gray-600'>
                  <p className='text-gray-600 mr-4'>
                    <AiOutlinePhone className="text-2xl text-primary" />
                  </p>
                  <p>{addSpaceToPhoneNumber(restaurant?.phone)}</p>
                </div>
                <div className='flex items-center text-gray-600'>
                  <p className='text-gray-600 mr-4'>
                    <IoIosLink className="text-2xl text-primary" />
                  </p>
                  <Link className="underline underline-offset-4 text-primary" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(restaurant?.restaurant_name)}`} target="_blank">
                    {`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(restaurant?.restaurant_name)}`}
                  </Link>
                </div>
              </div>
            </div>
            <div className='relative rounded-2xl bg-muted p-4 space-y-4 h-48 md:h-full'>
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
            <div className='rounded-2xl bg-muted p-4 space-y-4'>
              <div className='space-y-2'>
                <p className=' font-medium text-lg mb-8 text-gray-600'> Brève présentation </p>
                <div className='flex items-center text-gray-600'>
                  <p>{restaurant?.short_description}</p>
                </div>
              </div>
            </div>
            <div className='rounded-2xl bg-muted p-4 space-y-4'>
              <div className='space-y-2'>
                <p className=' font-medium text-lg mb-8 text-gray-600'> Services proposés</p>
                <div className={`grid grid-cols-2 mt-4 gap-4`}>
                  {options.map(({ key, value, icon }) => {
                    if (restaurant[key] === true) {
                      return (
                        <div key={key} className="flex items-center">
                          <p className='text-secondary text-6xl mr-4'>{icon}</p>
                          <p className='text-secondary'> {capitalize(value)} </p>
                        </div>
                      );
                    }
                    return null
                  })}
                </div>
              </div>
            </div>
            <div className='rounded-2xl bg-muted p-4 space-y-4 md:col-span-2'>
              <div className='space-y-2'>
                <p className=' font-medium text-lg mb-8 text-gray-600'> Présentation de votre établissement </p>
                <div className='flex items-center text-gray-600'>
                  <p>{restaurant?.description}</p>
                </div>
              </div>
            </div>
            {
              hasBothMenus ? (
                <div className='rounded-2xl bg-muted col-span-2 p-4 space-y-4'>
                  <div className='space-y-2'>
                    <p className=' font-medium text-xl mb-8 text-gray-600'> Les menus</p>
                    <div className={`grid grid-cols-2 mt-4 gap-4`}>
                      {restaurant?.menu_photo?.map((file: any, index: number) => {
                        return (
                          <div key={index} className="flex items-center">
                            <Link href={environment === 'production' ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${file.url}`} target='_blank' className="p-6 rounded-md border border-primary bg-white hover:bg-primary hover:text-white transition-all flex justify-center items-center cursor-pointer"><span className='underline underline-offset-4'> {file.name}</span> </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null
            }

            {
              hasFilesMenu ? (
                <div className='rounded-2xl bg-muted p-4 space-y-4'>
                  <div className='space-y-2'>
                    <p className=' font-medium text-xl mb-8 text-gray-600'> Les menus</p>
                    <div className={`grid grid-cols-2 mt-4 gap-4`}>
                      {restaurant?.menu_photo?.map((file: any, index: number) => {
                        return (
                          <div key={index} className="flex items-center">
                            <Link href={environment === 'production' ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${file.url}`} target='_blank' className="p-6 rounded-md border border-primary bg-white hover:bg-primary hover:text-white transition-all flex justify-center items-center cursor-pointer"><span className='underline underline-offset-4'> {file.name}</span> </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null
            }
          </div>
        ) : (
          <NoRestaurant />
        )
      }
    </div>
  )
}