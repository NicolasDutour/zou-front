"use client"

import Link from "next/link";
import Image from "next/image"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { createBannerPhoto, createOrUpdateRestaurantAction } from "@/lib/actions";
import { PartialFormSchemaRestaurant, RestaurantType, SuggestionAddress, TypePartialFormSchemaRestaurant, UserType } from "@/lib/validations";
import { Label } from "@/components/ui/label";
import { cn, createSlug } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RestaurantForm({ user, environment, restaurant }: { user: UserType, environment?: string, restaurant?: RestaurantType }) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')

  const form = useForm<TypePartialFormSchemaRestaurant>({
    resolver: zodResolver(PartialFormSchemaRestaurant),
    mode: "onTouched"
  })

  const { register, handleSubmit, reset, setValue, formState } = form
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (pathname.includes("edit") && restaurant) {
      const { restaurant_name, description, short_description, email, address, phone, drive, take_away, delivery, eat_in, pmr, terrace, air_conditioner } = restaurant
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
      setValue('pmr', pmr)
      setValue('terrace', terrace)
      setValue('air_conditioner', air_conditioner)
    }
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset, setValue, pathname, restaurant])

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

  const handleFormSubmit = async (formData: TypePartialFormSchemaRestaurant) => {
    const slug = createSlug(formData?.restaurant_name)
    const newData = {
      ...formData,
      slug,
      longitude: longitude || restaurant?.longitude,
      latitude: latitude || restaurant?.latitude,
      users_permissions_user: {
        connect: [user?.id]
      }
    }

    const { banner_photo, ...dataWithoutImage } = newData

    const response = await createOrUpdateRestaurantAction(dataWithoutImage, pathname, restaurant?.id)

    if (response.data.id && formData?.banner_photo?.length > 0) {
      const formData = new FormData()
      formData.append("ref", 'api::restaurant.restaurant')
      formData.append("refId", response?.data?.id.toString())
      formData.append("field", 'banner_photo')
      formData.append("files", banner_photo[0])
      createBannerPhoto(formData)
    }

    if (response) {
      router.push('/dashboard/restaurant')
      toast({
        title: "Félicitation !",
        description: "Restaurant créé ou mis à jour avec succès.",
        className: "border-white text-blueDark",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="w-full space-y-2 rounded-2xl bg-white p-6">
          <Label htmlFor="restaurant_name">Nom du restaurant</Label>
          <Input
            className={cn("focus-visible:ring-blueDark", { "border-destructive focus-visible:ring-red-500": errors.restaurant_name })}
            {...register("restaurant_name")}
            id="restaurant_name"
            type="text"
          />
          <p className="mt-2 text-sm text-destructive">{errors.restaurant_name?.message}</p>

          <Label htmlFor="address">Adresse</Label>
          <Input
            className={cn("focus-visible:ring-blueDark", { "border-destructive focus-visible:ring-red-500": errors.address })}
            {...register("address")}
            id="address"
            type="text"
            onChange={(e) => handleAddressChange(e.target.value)}
          />
          <p className="mt-2 text-sm text-destructive">{errors.address?.message}</p>
          {
            openAddressDialog && (
              <div className="relative left-0 top-0 z-40 h-44 w-full overflow-scroll overflow-x-hidden rounded-lg border border-blueDark bg-white text-gray-700">
                {
                  addressSuggestions.length > 0 && (
                    <ul className="z-50">
                      {
                        addressSuggestions.map((suggestion: SuggestionAddress, index) => {
                          return (
                            <li key={index} className="cursor-pointer p-2 hover:bg-blueDark hover:text-white" onClick={() => {
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

          <Label htmlFor="email">Email</Label>
          <Input
            className={cn("focus-visible:ring-blueDark", { "border-destructive focus-visible:ring-red-500": errors.email })}
            {...register("email")}
            id="email"
            type="email"
          />
          <p className="mt-2 text-sm text-destructive">{errors.email?.message}</p>

          <Label htmlFor="phone">Phone</Label>
          <Input
            className={cn("focus-visible:ring-blueDark", { "border-destructive focus-visible:ring-red-500": errors.phone })}
            {...register("phone")}
            id="phone"
            type="tel"
          />
          <p className="mt-2 text-sm text-destructive">{errors.phone?.message}</p>
        </div>

        <div className="w-full space-y-2 rounded-2xl bg-white p-6">
          <Label htmlFor="banner_photo">Photo principale de votre restaurant</Label>
          <Input
            className={cn("focus-visible:ring-blueDark", { "border-destructive focus-visible:ring-red-500": errors.banner_photo })}
            {...register("banner_photo")}
            id="banner_photo"
            type="file"
          />
          <p className="mt-2 text-sm text-destructive">
            {errors.banner_photo && typeof errors.banner_photo.message === 'string'
              ? errors.banner_photo.message
              : ''}
          </p>
          <div className='relative h-56 w-full space-y-4 overflow-hidden rounded-2xl bg-blueDark p-8'>
            <Image
              src={restaurant?.banner_photo ?
                environment === "production" ?
                  restaurant?.banner_photo.url :
                  `${process.env.NEXT_PUBLIC_STRAPI_URL}${restaurant?.banner_photo.url}` :
                "/no_image.png"}
              alt={restaurant?.banner_photo?.name || "no_image"}
              style={{
                objectFit: restaurant?.banner_photo ? "cover" : "contain",
              }}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
              aspect-auto="true"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="w-full space-y-2 rounded-2xl bg-white p-6">
          <Label htmlFor="short_description">Brève description</Label>
          <Textarea
            className={cn("resize-none text-blueDark focus-visible:ring-blueDark sm:text-sm sm:leading-6", { "border-destructive focus-visible:ring-red-500": errors.short_description })}
            {...register("short_description")}
            id="short_description"
            rows={4}
          />
          <p className="mt-2 text-sm text-destructive">{errors.short_description?.message}</p>
        </div>

        <div className="w-full space-y-2 rounded-2xl bg-white p-6">
          <p className="block text-sm font-medium leading-6 text-blueDarker">
            Services proposés
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center rounded-md border p-4">
              <input
                {...register("drive")}
                id="drive"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              />
              <Label htmlFor="drive" className="ml-4">Drive</Label>
            </div>
            <div className="flex items-center rounded-md border p-4">
              <input
                {...register("take_away")}
                id="take_away"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              />
              <Label htmlFor="take_away" className="ml-4">Take away</Label>
            </div>
            <div className="flex items-center rounded-md border p-4">
              <input
                {...register("delivery")}
                id="delivery"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              />
              <Label htmlFor="delivery" className="ml-4">Delivery</Label>
            </div>
            <div className="flex items-center rounded-md border p-4">
              <input
                {...register("eat_in")}
                id="eat_in"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              />
              <Label htmlFor="eat_in" className="ml-4">Eat in</Label>
            </div>
            <div className="flex items-center rounded-md border p-4">
              <input
                {...register("pmr")}
                id="pmr"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              />
              <Label htmlFor="pmr" className="ml-4">Accessible PMR</Label>
            </div>
            <div className="flex items-center rounded-md border p-4">
              <input
                {...register("terrace")}
                id="terrace"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              />
              <Label htmlFor="terrace" className="ml-4">Terrace</Label>
            </div>
            <div className="flex items-center rounded-md border p-4">
              <input
                {...register("air_conditioner")}
                id="air_conditioner"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              />
              <Label htmlFor="air_conditioner" className="ml-4">Air conditioner</Label>
            </div>
          </div>
        </div>

        <div className="w-full space-y-2 rounded-2xl bg-white p-6 lg:col-span-2">
          <Label htmlFor="description">Description de votre restaurant</Label>
          <Textarea
            className={cn("resize-none text-blueDark focus-visible:ring-blueDark sm:text-sm sm:leading-6", { "border-destructive focus-visible:ring-red-500": errors.description })}
            {...register("description")}
            id="description"
            rows={7}
          />
          <p className="mt-2 text-sm text-destructive">{errors.description?.message}</p>
        </div>
      </div>

      <div className="flex w-full gap-4 md:w-1/2">
        <Button asChild className="mt-4 w-full bg-white text-blueDark hover:bg-muted">
          <Link href="/dashboard/restaurant">Annuler</Link>
        </Button>

        <Button disabled={!isDirty || isSubmitting} className={cn(buttonVariants(), "mt-4 w-full border border-white bg-blueDark hover:bg-blueDarker")}>
          {isSubmitting ? (
            <>
              <svg className="-ml-1 mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#8c9fb9" strokeWidth="4"></circle>
                <path fill="#135A9A" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Loading...</p>
            </>
          ) : pathname?.includes("edit") ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </form>
  )
}