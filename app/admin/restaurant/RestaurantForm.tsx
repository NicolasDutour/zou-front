"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Controller, useForm } from "react-hook-form"
import Link from "next/link"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useToast } from "@/components/ui/use-toast"
import Loader from "@/components/Loader"

import { TypeFormSchemaRestaurant, FormSchemaRestaurant, UserType } from '@/lib/types';
import { cn, createSlug } from "@/lib/utils"
import { setUserInfo } from "@/redux/features/auth/authSlice"
import { useRestaurantFormContext } from "@/context/store"

export function RestaurantForm({ user, token }: { user: UserType, token: string }) {
  const dispatch = useDispatch()
  const { toast } = useToast()
  // const token = useSelector((state) => state.auth.token)
  const { isUpdatingRestaurant, setIsUpdatingRestaurant } = useRestaurantFormContext()
  const { showForm, setShowForm } = useRestaurantFormContext()
  const { restaurantUpdating, setRestaurantUpdating } = useRestaurantFormContext()
  const tempUser = useSelector((state) => state.auth.user)

  const [isLoading, setIsLoading] = useState(false)
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<TypeFormSchemaRestaurant>({
    resolver: zodResolver(FormSchemaRestaurant),
  });

  const watchRestaurantName = watch('restaurant_name')
  const watchAddress = watch('address')
  const watchDescription = watch('description')
  const watchEmail = watch('email')
  const watchPhone = watch('phone')



  useEffect(() => {
    if (user?.restaurants.length > 0) {
      const { restaurant_name, description, email, address, phone } = user?.restaurants[0]
      setValue('restaurant_name', restaurant_name)
      setValue('description', description)
      setValue('email', email)
      setValue('address', address)
      setValue('phone', phone)
    }
  }, [])

  const isAnyFormInputsModified = () => {
    return (
      watchRestaurantName == user?.restaurants[0]?.restaurant_name &&
      watchAddress == user?.restaurants[0]?.address &&
      watchDescription == user?.restaurants[0]?.description &&
      watchEmail == user?.restaurants[0]?.email &&
      watchPhone == user?.restaurants[0]?.phone
    )
  }

  const closeForm = () => {
    setShowForm(false)
    setIsUpdatingRestaurant(false)
  }

  const onSubmit = async (payload: z.infer<typeof FormSchemaRestaurant>) => {
    // const imageUpload = {
    //   ref: "api::restaurant.restaurant",
    //   refId: user?.restaurants[0].id,
    //   field: "banner_photo",
    //   files: payload.banner_photo[0].name
    // }

    const slug = createSlug(payload?.restaurant_name)
    const newData = {
      ...payload,
      slug,
      longitude: tempUser?.restaurants[0].longitude,
      latitude: tempUser?.restaurants[0].latitude,
      users_permissions_user: {
        connect: [user?.id]
      }
    }

    // const { banner_photo, ...dataWithoutImage } = newData

    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants${isUpdatingRestaurant ? `/${user?.restaurants[0]?.id}` : ''}`,
        {
          method: `${isUpdatingRestaurant ? 'PUT' : 'POST'}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data: newData }),
          cache: 'no-cache'
        })

      if (response.status === 200) {
        try {
          const restaurant = await response.json()

          // const pictureUpload = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
          //   {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //       Authorization: `Bearer ${token}`
          //     },
          //     body: new FormData(imageUpload),
          //     cache: 'no-cache'
          //   })

          toast({
            title: `Restaurant ${isUpdatingRestaurant ? 'mis à jour' : 'ajouté'} avec succés !`
          })
        } catch (error) {
          console.error('ERROR: ', error);
          toast({
            title: "ERROR:",
            description: error
          })
        }
      } else if (response.status === 400) {
        setIsLoading(false)
        try {
          const errorResponse = JSON.parse(await response.text());
          if (errorResponse.error && errorResponse.error.message) {
            const errorMessage = errorResponse.error.message;
            toast({
              title: "Erreur 400",
              description: errorMessage,
            })
            console.error("Erreur 400 : ", errorMessage);
          } else {
            toast({
              title: "Réponse 400 sans message d'erreur valide:",
              description: errorResponse,
            })
            console.error("Réponse 400 sans message d'erreur valide : ", errorResponse);
          }
        } catch (error) {
          toast({
            title: "Erreur lors de l'analyse de la réponse JSON",
            description: error,
          })
          console.error("Erreur lors de l'analyse de la réponse JSON : ", error);
        }
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code: ", errorCode);
      console.log("Error message: ", errorMessage);
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAddressSuggestions = async (query: string) => {
    const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache'
    })

    const address = await res.json()
    return address
  };

  const handleAddressChange = async (value: string) => {
    setOpenAddressDialog(true)
    if (value.trim() !== '') {
      const suggestions = await fetchAddressSuggestions(value);
      setAddressSuggestions(suggestions.features);

    } else {
      setAddressSuggestions([])
    }
  };

  const selectAddress = (coordinates: string[]) => {
    console.log("coordinates", coordinates);

    setAddressSuggestions([])
    setOpenAddressDialog(false)
    dispatch(setUserInfo(
      {
        ...user,
        restaurants: [
          {
            ...user.restaurants[0],
            longitude: coordinates[0].toString(),
            latitude: coordinates[1].toString()
          }
        ]
      }
    ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        getValues('restaurant_name') ? (
          <p className="font-medium leading-6 text-gray-900 mt-6">
            <span className="mr-4">Lien public de votre site web:</span>
            <Link className="text-secondary hover:font-semibold underline underline-offset-4" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(watchRestaurantName)}`}>
              {`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(watchRestaurantName)}`}
            </Link>
          </p>
        ) : null
      }
      <div className="space-y-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label htmlFor="restaurant_name" className="block text-sm font-medium leading-6 text-gray-900">
              Nom du restaurant
            </label>
            <div className="mt-2">
              <input
                {...register("restaurant_name")}
                id="restaurant_name"
                type="text"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.restaurant_name?.message}</p>
            </div>
          </div>

          {/* <div className="w-full">
            <label htmlFor="banner_photo" className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className="mt-2">
              <input
                {...register("banner_photo")}
                id="banner_photo"
                type="file"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.banner_photo?.message}</p>
            </div>
          </div> */}
        </div>

        <div className="relative w-full">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Adresse
          </label>
          <div className="mt-2">
            <input
              {...register("address")}
              id="address"
              type="text"
              onChange={(e) => handleAddressChange(e.target.value)}
              className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
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
                        addressSuggestions.map((suggestion, index) => {
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

        <div>
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              {...register("description")}
              id="description"
              rows="5"
              className="resize-none block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            ></textarea>
            <p className="text-red-500 text-sm mt-2">{errors.description?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                type="email"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Téléphone
            </label>
            <div className="mt-2">
              <input
                {...register("phone")}
                id="phone"
                type="text"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.phone?.message}</p>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-4 gap-4">
          <div>
            <label htmlFor="opening_time_morning" className="block text-sm font-medium leading-6 text-gray-900">
              Heure d'ouverture du matin
            </label>
            <div className="mt-2">
              <input
                {...register("opening_time_morning")}
                id="opening_time_morning"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.opening_time_morning?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="closing_time_morning" className="block text-sm font-medium leading-6 text-gray-900">
              Heure de fermeture du matin
            </label>
            <div className="mt-2">
              <input
                {...register("closing_time_morning")}
                id="closing_time_morning"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.closing_time_morning?.message}</p>
            </div>
          </div>
          <div>
            <label htmlFor="opening_time_afternoon" className="block text-sm font-medium leading-6 text-gray-900">
              Heure d'ouverture de l'après midi
            </label>
            <div className="mt-2">
              <input
                {...register("opening_time_afternoon")}
                id="opening_time_afternoon"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.opening_time_afternoon?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="closing_time_afternoon" className="block text-sm font-medium leading-6 text-gray-900">
              Heure de fermeture de l'après midi
            </label>
            <div className="mt-2">
              <input
                {...register("closing_time_afternoon")}
                id="closing_time_afternoon"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.closing_time_afternoon?.message}</p>
            </div>
          </div>
        </div> */}



        {/* <div>
          <label htmlFor="photo_banner" className="block text-sm font-medium leading-6 text-gray-900">
            Photo de présentation du restaurant
          </label>
          <div className="mt-2">
            <input
              {...register("photo_banner")}
              id="photo_banner"
              type="file"
              className="block p-2 w-1/2 rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.photo_banner?.message}</p>
          </div>
        </div> */}

        <div className="flex flex-col md:flex-row items-center w-full md:w-1/4 gap-2">
          {
            !isUpdatingRestaurant ? (
              <button
                onClick={closeForm}
                type='button'
                className="disabled:opacity-40 w-full rounded-md px-3 py-1.5 border border-black text-black text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Annuler
              </button>
            ) : null
          }
          <button
            type='submit'
            className={cn("disabled:opacity-40 w-full rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            )}
          >
            {isUpdatingRestaurant ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>

        {/* <div className="w-full md:w-1/2">
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 w-full flex justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {
              isLoading ? <Loader width={30} height={30} /> : 'Mettre à jour'
            }
          </button>
        </div> */}
      </div>
    </form >
  )
}