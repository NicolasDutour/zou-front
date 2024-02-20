"use client"

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image"

import { createProductPhoto, createOrUpdateProductAction } from "@/lib/actions";
import { TypeFormSchemaProduct, FormSchemaProduct, ProductTypeFiltered } from "@/lib/validations";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function ProductForm({ product, productId, restaurantId, environment = "" }: { product?: ProductTypeFiltered, productId?: number, restaurantId?: string, environment?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<TypeFormSchemaProduct>({
    resolver: zodResolver(FormSchemaProduct),
    mode: "onTouched"
  })

  const { register, handleSubmit, reset, setValue, formState } = form
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (pathname.includes("edit") && product) {
      const { product_name, ingredients, price, vegetarian, dessert, tomato_base, cream_base } = product
      setValue('product_name', product_name)
      setValue('ingredients', ingredients)
      setValue('price', price)
      setValue('tomato_base', tomato_base)
      setValue('cream_base', cream_base)
      setValue('vegetarian', vegetarian)
      setValue('dessert', dessert)
    }

    if (isSubmitSuccessful) {
      reset()
    }
  }, [setValue, pathname, product, isSubmitSuccessful, reset])

  async function handleFormSubmit(formData: TypeFormSchemaProduct) {
    const newData = {
      ...formData,
      restaurant: {
        connect: [restaurantId]
      }
    }

    const { photo, ...dataWithoutImage } = newData

    const response = await createOrUpdateProductAction(dataWithoutImage, pathname, productId)

    if (response?.data?.id && formData?.photo?.length > 0) {
      const formData = new FormData()
      formData.append("ref", 'api::product.product')
      formData.append("refId", response?.data?.id.toString())
      formData.append("field", 'photo')
      formData.append("files", photo[0])
      createProductPhoto(formData)
    }

    if (response) {
      router.push('/dashboard/product')
      toast({
        title: "Félicitation !",
        description: "Produit créé ou mis à jour avec succès.",
        className: "border-blue text-blue",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className='w-full space-y-2 rounded-2xl bg-white p-6'>
          <label htmlFor="product_name" className="block text-sm font-medium leading-6 text-blueDarker">
            Nom du produit
          </label>
          <input
            className="block w-full rounded-md p-1.5 text-blueDark shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
            {...register("product_name")}
            id="product_name"
            type="text"
          />
          <p className="mt-2 text-sm text-error">{errors.product_name?.message}</p>

          <label htmlFor="ingredients" className="block text-sm font-medium leading-6 text-blueDarker">
            Ingredients (Séparés par une virgule. ex: tomate, fromage, ...)
          </label>
          <input
            className="block w-full rounded-md p-1.5 text-blueDark shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
            {...register("ingredients")}
            id="ingredients"
            type="text"
          />
          <p className="mt-2 text-sm text-error">{errors.ingredients?.message}</p>

          <label htmlFor="price" className="block text-sm font-medium leading-6 text-blueDarker">
            Prix
          </label>
          <input
            {...register('price', {
              setValueAs: (value) => Number(value),
            })}
            id="price"
            type="number"
            className="block w-full rounded-md p-1.5 text-blueDark shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
          />
          <p className="mt-2 text-sm text-error">{errors.price?.message}</p>
        </div>

        <div className="w-full space-y-2 rounded-2xl bg-white p-6">
          <label
            className="block text-sm font-medium leading-6 text-blueDarker"
            htmlFor="photo"
          >
            Photo principale de votre restaurant
          </label>
          <div>
            <Input
              {...register("photo")}
              id="photo"
              type="file"
              className="block w-full rounded-md p-1.5 text-blueDark shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">
              {errors.photo && typeof errors.photo.message === 'string'
                ? errors.photo.message
                : ''}
            </p>
            <div className='relative h-56 w-full space-y-4 overflow-hidden rounded-2xl bg-blueDark  p-8'>
              <Image
                src={product?.photo?.data ?
                  environment === "production" ? product?.photo?.data?.attributes?.url :
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}${product?.photo?.data?.attributes?.url}` :
                  "/no_image.png"}
                alt={product?.photo?.data?.attributes?.name || "no_image"}
                style={{
                  objectFit: product?.photo?.data ? "cover" : "contain",
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

        <div className="w-full space-y-2 rounded-2xl bg-white p-6">
          <p className="block font-medium leading-6 text-blueDarker">
            Les critères
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center rounded-md border border-gray p-4">
              <input
                {...register("tomato_base")}
                id="tomato_base"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              ></input>
              <Label htmlFor="tomato_base" className="ml-4">Tomato base</Label>
            </div>
            <div className="flex items-center rounded-md border border-gray p-4">
              <input
                {...register("cream_base")}
                id="cream_base"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              ></input>
              <Label htmlFor="cream_base" className="ml-4">Cream base</Label>
            </div>
            <div className="flex items-center rounded-md border border-gray p-4">
              <input
                {...register("vegetarian")}
                id="vegetarian"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              ></input>
              <Label htmlFor="vegetarian" className="ml-4">Vegetarian</Label>
            </div>
            <div className="flex items-center rounded-md border border-gray p-4">
              <input
                {...register("dessert")}
                id="dessert"
                type="checkbox"
                className="peer size-5 shrink-0 cursor-pointer rounded-sm border border-blueDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=checked]:bg-blueDark data-[state=checked]:text-white"
              ></input>
              <Label htmlFor="dessert" className="ml-4">Dessert</Label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4 md:w-1/2">
        <Link
          href="/dashboard/restaurant"
          passHref
          legacyBehavior
        >
          <Button className="mt-4 w-full bg-white text-center text-blueDark ring-1 ring-inset ring-gray">
            Annuler
          </Button>
        </Link>

        <Button type="submit" disabled={!isDirty || isSubmitting} className="mt-4 w-full border border-white bg-blueDark text-center text-white">
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
    </form >
  )
}