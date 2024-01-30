"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createBannerPhoto, createOrUpdateRestaurantAction } from "@/lib/actions/restaurant-actions";
import { UserType } from '@/lib/types/userType';
import { PartialFormSchemaRestaurant, RestaurantType, SuggestionAddress, TypePartialFormSchemaRestaurant } from '@/lib/types/restaurantType';
import { createSlug } from "@/lib/utils";

export function RestaurantForm({
  user, environment = "", restaurant = null
}: {
  user: UserType,
  environment?: string,
  restaurant?: RestaurantType | null
}) {
  const pathname = usePathname()
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TypePartialFormSchemaRestaurant>({
    resolver: zodResolver(PartialFormSchemaRestaurant),
  });

  useEffect(() => {
    if (pathname.includes("/update") && restaurant) {
      const { restaurant_name, description, short_description, email, address, phone, drive, take_away, delivery, eat_in } = restaurant
      setValue('restaurant_name', restaurant_name)
      setValue('description', description)
      setValue('short_description', short_description)
      setValue('email', email)
      setValue('address', address)
      setValue('phone', phone)
      setValue('drive', drive)
      setValue('take_away', take_away)
      setValue('delivery', delivery)
      setValue('eat_in', eat_in)
    }
  }, [setValue])

  const fetchAddressSuggestions = async (query: string) => {
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })

      const address = await res.json()
      return address
    } catch (error) {
      console.error("Erreur pour récupérer l'adresse depuis api-adresse.data.gouv.fr: ", error);
    }
  };

  const handleAddressChange = async (value: string) => {
    setOpenAddressDialog(true)
    if (value.trim() !== '') {
      try {
        const suggestions = await fetchAddressSuggestions(value);
        if (suggestions && suggestions.features) {
          setAddressSuggestions(suggestions.features);
        }
      } catch (error) {
        console.error("Erreur: ", error);
      }

    } else {
      setAddressSuggestions([])
    }
  };

  const selectAddress = (coordinates: string[]) => {
    setAddressSuggestions([])
    setOpenAddressDialog(false)
    setLongitude(coordinates[0].toString())
    setLatitude(coordinates[1].toString())
  }

  async function onHandleCreateOrUpdateRestaurant(payload: z.infer<typeof PartialFormSchemaRestaurant>) {
    const slug = createSlug(payload?.restaurant_name)
    const newData = {
      ...payload,
      slug,
      longitude: longitude || restaurant?.longitude,
      latitude: latitude || restaurant?.latitude,
      users_permissions_user: {
        connect: [user?.id]
      }
    }

    const { banner_photo, ...dataWithoutImage } = newData

    const data = await createOrUpdateRestaurantAction(dataWithoutImage, pathname, restaurant?.id)

    if (data.data.id && payload?.banner_photo?.length > 0) {
      const formData = new FormData()
      formData.append("ref", 'api::restaurant.restaurant')
      formData.append("refId", data?.data?.id.toString())
      formData.append("field", 'banner_photo')
      formData.append("files", payload.banner_photo[0])
      createBannerPhoto(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit(onHandleCreateOrUpdateRestaurant)}>
      <p className="text-sm mb-2 font-medium">Champs obligatoires <span className="text-red-600">*</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='rounded-2xl bg-muted p-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor="restaurant_name" className="block text-sm font-medium leading-6 text-gray-600">
              Nom du restaurant <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                {...register("restaurant_name")}
                id="restaurant_name"
                type="text"
                autoFocus
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.restaurant_name?.message}</p>
            </div>
          </div>
          <div className='relative space-y-2'>
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-600">
              Adresse <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                {...register("address")}
                id="address"
                type="text"
                onChange={(e) => handleAddressChange(e.target.value)}
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.address?.message}</p>
            </div>
            {
              openAddressDialog && (
                <div className="absolute overflow-scroll overflow-x-hidden z-40 bottom-30 left-0 h-44 w-full rounded-lg bg-white text-black border border-primary">
                  {
                    addressSuggestions.length > 0 && (
                      <ul className="z-50">
                        {
                          addressSuggestions.map((suggestion: SuggestionAddress, index) => {
                            return (
                              <li key={index} className="cursor-pointer p-2 hover:bg-slate-400 hover:text-white" onClick={() => {
                                setValue('address', suggestion.properties.label)
                                selectAddress(suggestion.geometry.coordinates)
                              }}>
                                {suggestion.properties.label}
                              </li>
                            )
                          })
                        }
                      </ul>
                    )
                  }
                </div>
              )
            }
          </div>
          <div className='space-y-2'>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
              Email <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                type="email"
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-600">
              Téléphone <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                {...register("phone")}
                id="phone"
                type="tel"
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.phone?.message}</p>
            </div>
          </div>
        </div>
        <div className='rounded-2xl bg-muted p-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor="banner_photo" className="block text-sm font-medium leading-6 text-gray-600">
              Photo principale de votre restaurant
            </label>
            <div className="mt-2">
              <input
                {...register("banner_photo")}
                id="banner_photo"
                type="file"
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {errors.banner_photo && typeof errors.banner_photo.message === 'string'
                  ? errors.banner_photo.message
                  : ''}
              </p>
              <div className="relative border rounded-md h-52 mt-6">
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
            </div>
          </div>
        </div>
        <div className='rounded-2xl bg-muted p-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor="short_description" className="block text-sm font-medium leading-6 text-gray-600">
              Brève description
            </label>
            <div className="mt-2">
              <textarea
                {...register("short_description")}
                id="short_description"
                rows={4}
                className="resize-none block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              ></textarea>
              <p className="text-red-500 text-sm mt-2">{errors.short_description?.message}</p>
            </div>
          </div>
        </div>
        <div className='rounded-2xl bg-muted p-4 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className="flex items-center border p-4 rounded-lg">
              <div className="mt-2">
                <input
                  {...register("drive")}
                  id="drive"
                  type="checkbox"
                  className="w-4 h-4"
                ></input>
              </div>
              <label htmlFor="drive" className="block text-sm font-medium leading-6 text-gray-600 ml-2">
                Drive
              </label>
            </div>
            <div className="flex items-center border p-4 rounded-lg">
              <div className="mt-2">
                <input
                  {...register("take_away")}
                  id="take_away"
                  type="checkbox"
                  className="w-4 h-4"
                ></input>
              </div>
              <label htmlFor="take_away" className="block text-sm font-medium leading-6 text-gray-600 ml-2">
                A emporter
              </label>
            </div>
            <div className="flex items-center border p-4 rounded-lg">
              <div className="mt-2">
                <input
                  {...register("delivery")}
                  id="delivery"
                  type="checkbox"
                  className="w-4 h-4"
                ></input>
              </div>
              <label htmlFor="delivery" className="block text-sm font-medium leading-6 text-gray-600 ml-2">
                Livraison
              </label>
            </div>
            <div className="flex items-center border p-4 rounded-lg">
              <div className="mt-2">
                <input
                  {...register("eat_in")}
                  id="eat_in"
                  type="checkbox"
                  className="w-4 h-4"
                ></input>
              </div>
              <label htmlFor="eat_in" className="block text-sm font-medium leading-6 text-gray-600 ml-2">
                Sur place
              </label>
            </div>
          </div>
        </div>
        <div className='rounded-2xl md:col-span-2 bg-muted p-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-600">
              Présentation de votre restaurant
            </label>
            <div className="mt-2">
              <textarea
                {...register("description")}
                id="description"
                rows={7}
                className="resize-none block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              ></textarea>
              <p className="text-red-500 text-sm mt-2">{errors.description?.message}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Link
            href="/admin/restaurant"
            className="flex w-full justify-center rounded-md bg-muted px-3 py-1.5 text-sm font-medium leading-6 text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Annuler
          </Link>
          <button
            className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Valider
          </button>
        </div>
      </div>
    </form >
  )
}