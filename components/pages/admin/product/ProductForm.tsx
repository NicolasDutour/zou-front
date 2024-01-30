"use client"

import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image"

import { createProductPhoto, createOrUpdateProductAction } from "@/lib/actions/product-actions";
import { TypeFormSchemaProduct, FormSchemaProduct, ProductType } from "@/lib/types/productType";

import Link from "next/link";
import { useEffect } from "react";

export function ProductForm({ product, productId, restaurantId, environment = "" }: { product?: ProductType, productId?: number, restaurantId?: string, environment?: string }) {
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TypeFormSchemaProduct>({
    resolver: zodResolver(FormSchemaProduct),
  });

  useEffect(() => {
    if (pathname.includes("/update") && product) {
      const { product_name, ingredients, price, base, vegetarian, dessert } = product

      setValue('product_name', product_name)
      setValue('ingredients', ingredients)
      setValue('price', price)
      // setValue('base', base)
      setValue('vegetarian', vegetarian)
      setValue('dessert', dessert)
    }
  }, [setValue])

  async function onHandleCreateOrUpdateProduct(payload: z.infer<typeof FormSchemaProduct>) {
    const newData = {
      ...payload,
      restaurant: {
        connect: [restaurantId]
      }
    }

    const { photo, ...dataWithoutImage } = newData

    const data = await createOrUpdateProductAction(dataWithoutImage, pathname, productId)

    if (data?.data?.id && payload?.photo?.length > 0) {
      const formData = new FormData()
      formData.append("ref", 'api::product.product')
      formData.append("refId", data?.data?.id.toString())
      formData.append("field", 'photo')
      formData.append("files", payload.photo[0])
      createProductPhoto(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit(onHandleCreateOrUpdateProduct)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='rounded-2xl bg-muted p-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor="product_name" className="block text-sm font-medium leading-6 text-gray-600">
              Nom du produit
            </label>
            <div className="mt-2">
              <input
                {...register("product_name")}
                id="product_name"
                type="text"
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.product_name?.message}</p>
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor="ingredients" className="block text-sm font-medium leading-6 text-gray-600">
              Ingredients (Séparés par une virgule. ex: tomate, fromage, ...)
            </label>
            <div className="mt-2">
              <input
                {...register("ingredients")}
                id="ingredients"
                type="text"
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.ingredients?.message}</p>
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-600">
              Prix
            </label>
            <div className="mt-2">
              <input
                {...register('price', {
                  setValueAs: (value) => Number(value),
                })}
                id="price"
                type="number"
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.price?.message}</p>
            </div>
          </div>
        </div>
        <div className='rounded-2xl bg-muted p-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-600">
              Photo du produit
            </label>
            <div className="mt-2">
              <input
                {...register("photo")}
                id="photo"
                type="file"
                className="block p-2 w-full focus:outline-none rounded-md border-0 bg-white py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">
                {errors.photo && typeof errors.photo.message === 'string'
                  ? errors.photo.message
                  : ''}
              </p>
              <div className="relative border rounded-md h-52 mt-6">
                <Image
                  src={product?.photo ? environment === "production" ? product?.photo?.data?.attributes?.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${product?.photo?.data?.attributes?.url}` : "/no_image.png"}
                  alt={product?.photo?.data?.attributes?.name || "no_image"}
                  style={{
                    objectFit: product?.photo ? "cover" : "contain",
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className="flex items-center border p-4 rounded-lg">
              <div className="mt-2">
                <input
                  {...register("vegetarian")}
                  id="vegetarian"
                  type="checkbox"
                  className="w-4 h-4"
                ></input>
              </div>
              <label htmlFor="vegetarian" className="block text-sm font-medium leading-6 text-gray-600 ml-2">
                Pizza végétarienne
              </label>
            </div>
            <div className="flex items-center border p-4 rounded-lg">
              <div className="mt-2">
                <input
                  {...register("dessert")}
                  id="dessert"
                  type="checkbox"
                  className="w-4 h-4"
                ></input>
              </div>
              <label htmlFor="dessert" className="block text-sm font-medium leading-6 text-gray-600 ml-2">
                Pizza dessert
              </label>
            </div>
          </div>
        </div>
        <div>base</div>
        {/* <div className="flex justify-center items-center">
                  <div className="w-full">
                    <label htmlFor="base" className="block text-sm font-medium leading-6 text-gray-900">
                      Base
                    </label>
                    <Select {...register('base')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisissez une base" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="tomate">Tomate</SelectItem>
                        <SelectItem className="cursor-pointer" value="crème">Cream</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}
        <div className="flex w-full gap-2">
          <Link
            href="/admin/product"
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