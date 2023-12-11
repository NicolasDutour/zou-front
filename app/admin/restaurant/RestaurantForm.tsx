"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { FaLink } from "react-icons/fa6";

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

import { TypePartialFormSchemaRestaurant, PartialFormSchemaRestaurant, UserType, SuggestionAddress } from '@/lib/types';
import { capitalize, createSlug, truncateFileName } from "@/lib/utils"
import { useRestaurantFormContext } from "@/context/store"
import { AiOutlineDelete } from "react-icons/ai"
import { BiEditAlt } from "react-icons/bi"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LoaderButton from "@/components/LoaderButton"

export function RestaurantForm({ user, token }: { user: UserType, token: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const { isUpdatingRestaurant, setIsUpdatingRestaurant } = useRestaurantFormContext()
  const { showForm, setShowForm } = useRestaurantFormContext()
  const [showFileInput, setShowFileInput] = useState(false)
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
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
  } = useForm<TypePartialFormSchemaRestaurant>({
    resolver: zodResolver(PartialFormSchemaRestaurant),
  });

  const watchRestaurantName = watch('restaurant_name')
  const watchAddress = watch('address')
  const watchDescription = watch('description')
  const watchEmail = watch('email')
  const watchPhone = watch('phone')
  const watchDrive = watch('drive')
  const watchTakeAway = watch('take_away')
  const watchDelivery = watch('delivery')
  const watchEatIn = watch('eat_in')

  useEffect(() => {
    if (user?.restaurants.length > 0) {
      const { restaurant_name, description, email, address, phone, drive, take_away, delivery, eat_in } = user?.restaurants[0]
      setValue('restaurant_name', restaurant_name)
      setValue('description', description)
      setValue('email', email)
      setValue('address', address)
      setValue('phone', phone)
      setValue('drive', drive)
      setValue('take_away', take_away)
      setValue('delivery', delivery)
      setValue('eat_in', eat_in)
    }
  }, [setValue, user?.restaurants])

  const closeForm = () => {
    setShowForm(false)
    setIsUpdatingRestaurant(false)
  }

  const onHandleUpdateRestaurant = async (payload: z.infer<typeof PartialFormSchemaRestaurant>) => {
    const slug = createSlug(payload?.restaurant_name)
    const newData = {
      ...payload,
      slug,
      longitude,
      latitude,
      users_permissions_user: {
        connect: [user?.id]
      }
    }

    const { banner_photo, ...dataWithoutImage } = newData

    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants${isUpdatingRestaurant ? `/${user?.restaurants[0]?.id}` : ''}`,
        {
          method: `${isUpdatingRestaurant ? 'PUT' : 'POST'}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data: dataWithoutImage })
        })

      if (response.status === 200) {
        setIsLoading(false)
        try {
          const restaurant = await response.json()

          if (payload?.banner_photo?.length > 0) {
            const formData = new FormData()
            formData.append("ref", 'api::restaurant.restaurant')
            formData.append("refId", user?.restaurants[0]?.id.toString())
            formData.append("field", 'banner_photo')
            formData.append("files", payload.banner_photo[0])

            const pictureUpload = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`
                },
                body: formData
              })

            if (pictureUpload.ok) {
              setShowFileInput(false)
              router.refresh()
            }
          }

          toast({
            title: `Restaurant ${isUpdatingRestaurant ? 'mis à jour' : 'ajouté'} avec succés !`
          })
        } catch (error) {
          console.error('ERROR: ', error);
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
          console.error("Erreur lors de l'analyse de la réponse JSON : ", error);
        }
      }
    } catch (error) {
      console.error("Error message: ", error);
    }
  }

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
      console.error("Erreur: ", error);
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

  const imageStyle: React.CSSProperties = {
    objectFit: "cover",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(watchRestaurantName)}`)
    toast({
      title: `Lien copié avec succés !`
    })
  }

  const updatePhoto = () => {
    setShowFileInput(true)
  }

  const removePhoto = async (photoId: number) => {
    const pictureRemoved = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${photoId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    if (pictureRemoved.ok) {
      setShowFileInput(false)
      router.refresh()
      toast({
        title: "Photo supprimée avec succés !"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onHandleUpdateRestaurant)}>
      {
        getValues('restaurant_name') ? (
          <div className="font-medium leading-6 text-gray-900 mt-6">
            <p className="mr-4">Lien public de votre site web:</p>
            <div className="flex items-center">
              <Link className="underline underline-offset-4 text-primary" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(watchRestaurantName)}`} target="_blank">
                {`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${createSlug(watchRestaurantName)}`}
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={copyToClipboard} className="ml-6 text-xl border border-gray-900 rounded-md px-4 py-2">
                    <FaLink />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copier le lien</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
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
                className="block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.restaurant_name?.message}</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <label htmlFor="banner_photo" className="block text-sm font-medium leading-6 text-gray-900">
            Photo
          </label>
          <div className="mt-2">
            {
              user?.restaurants[0].banner_photo && !showFileInput ? (
                <div className="">
                  <div className="relative border rounded-md h-56">
                    <Image
                      src={user?.restaurants[0].banner_photo ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${user?.restaurants[0].banner_photo.url}` : ""}
                      alt={user?.restaurants[0].banner_photo.name}
                      style={imageStyle}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      aspect-auto="true"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <p className="mr-4">{truncateFileName(user?.restaurants[0].banner_photo.name, 30)}</p>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger className="text-2xl text-red-600">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger><AiOutlineDelete /></TooltipTrigger>
                              <TooltipContent className=" bg-white text-red-600 text-base border border-primary">
                                <p>Supprimer photo</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Voulez vous supprimer définitivement cette photo ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette suppression est permanente. Vous ne pourrez pas revenir en arrière.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 rounded-md text-white" onClick={() => removePhoto(user?.restaurants[0].banner_photo.id)}>Supprimer</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="text-2xl text-primary" onClick={updatePhoto}>
                            <BiEditAlt />
                          </TooltipTrigger>
                          <TooltipContent className=" bg-white text-primary text-base border border-primary">
                            <p>Mise à jour photo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    {...register("banner_photo")}
                    id="banner_photo"
                    type="file"
                    className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-seconbg-secondary sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {errors.banner_photo && typeof errors.banner_photo.message === 'string'
                      ? errors.banner_photo.message
                      : ''}
                  </p>
                </>
              )
            }
          </div>
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
              className="block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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

        <div>
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              {...register("description")}
              id="description"
              rows={5}
              className="resize-none block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                className="block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                className="block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.phone?.message}</p>
            </div>
          </div>
        </div>

        <p className="text-sm font-medium leading-6 text-gray-900">Sélectionnez les services que vous proposez</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <label className="mr-2" htmlFor="drive">Drive</label>
            <input
              {...register("drive")}
              id="drive"
              type="checkbox"
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center">
            <label className="mr-2" htmlFor="take_away"> {capitalize('à emporter')} </label>
            <input
              {...register("take_away")}
              id="take_away"
              type="checkbox"
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center">
            <label className="mr-2" htmlFor="delivery">Livraison</label>
            <input
              {...register("delivery")}
              id="delivery"
              type="checkbox"
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center">
            <label className="mr-2" htmlFor="eat_in">Sur place</label>
            <input
              {...register("eat_in")}
              id="eat_in"
              type="checkbox"
              className="w-4 h-4"
            />
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
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-seconbg-secondary sm:text-sm sm:leading-6"
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
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-seconbg-secondary sm:text-sm sm:leading-6"
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
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-seconbg-secondary sm:text-sm sm:leading-6"
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
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-seconbg-secondary sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.closing_time_afternoon?.message}</p>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col md:flex-row items-center w-full md:w-1/4 gap-2">
          {
            !isUpdatingRestaurant ? (
              <button
                onClick={closeForm}
                type='button'
                className="disabled:opacity-40 w-full rounded-md px-3 py-1.5 border border-black text-black text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Annuler
              </button>
            ) : null
          }
          <button
            type='submit'
            disabled={
              isLoading ||
              (
                watchRestaurantName == user?.restaurants[0]?.restaurant_name &&
                watchAddress == user?.restaurants[0]?.address &&
                watchDescription == user?.restaurants[0]?.description &&
                watchEmail == user?.restaurants[0]?.email &&
                watchPhone == user?.restaurants[0]?.phone &&
                watchDrive == user?.restaurants[0]?.drive &&
                watchTakeAway == user?.restaurants[0]?.take_away &&
                watchDelivery == user?.restaurants[0]?.delivery &&
                watchEatIn == user?.restaurants[0]?.eat_in
              )
            }
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-primary hover:bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {
              isLoading ? (
                <LoaderButton />
              ) : isUpdatingRestaurant ? 'Mettre à jour' : 'Créer'
            }
          </button>
        </div>
      </div>
    </form >
  )
}