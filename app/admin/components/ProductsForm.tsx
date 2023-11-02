"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import Loader from "@/components/Loader"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { TypeFormSchemaProduct, FormSchemaProduct } from '@/lib/types';
import { useSelector } from "react-redux"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function ProductsForm({ closeForm, isProductUpdating, product }:
  { closeForm: () => void, isProductUpdating: boolean, product: { product_name: string, ingredients: string, price: number, id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const token = useSelector((state: any) => state.auth.token)
  const user = useSelector((state: any) => state.auth.user)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, },
    setValue,
    setFocus
  } = useForm<TypeFormSchemaProduct>({
    resolver: zodResolver(FormSchemaProduct),
  });

  useEffect(() => {
    setValue('product_name', product.product_name)
    setValue('ingredients', product.ingredients)
    setValue('price', product.price)
    setFocus('product_name')
  }, [])


  const onCreateOrUpdateProduct = async (payload: z.infer<typeof FormSchemaProduct>) => {
    closeForm()
    const newData = {
      ...payload,
      restaurant: {
        connect: [user?.restaurants[0]?.id]
      }
    }

    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products${isProductUpdating ? '/' + product.id : null}`,
        {
          method: `${isProductUpdating ? 'PUT' : 'POST'}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data: newData }),
          cache: 'no-cache'
        })
      if (response.status === 200) {
        try {
          const product = await response.json()
          toast({
            title: `Produit ${isProductUpdating ? 'mis à jour' : 'ajouté'} avec succés !`
          })
          router.refresh()
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> {isProductUpdating ? `Mise à jour de ${product.product_name}` : "Création d'un nouveau produit"} </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onCreateOrUpdateProduct)}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="product_name" className="block text-sm font-medium leading-6 text-gray-900">
                    Nom du produit
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("product_name")}
                      id="product_name"
                      type="text"
                      className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500 text-sm mt-2">{errors.product_name?.message}</p>
                  </div>
                </div>

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
                    <SelectItem className="cursor-pointer" value="tomato">Tomate</SelectItem>
                    <SelectItem className="cursor-pointer" value="cream">Cream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div> */}

                <div>
                  <label htmlFor="ingredients" className="block text-sm font-medium leading-6 text-gray-900">
                    Ingrédients
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('ingredients')}
                      id='ingredients'
                      type="text"
                      className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500 text-sm mt-2">{errors.ingredients?.message}</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                    Prix
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('price', {
                        setValueAs: (value) => Number(value),
                      })}
                      id='price'
                      type="number"
                      className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500 text-sm mt-2">{errors.price?.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center w-full md:w-1/4 gap-2">
                <button
                  onClick={closeForm}
                  type='button'
                  className="disabled:opacity-40 w-full rounded-md px-3 py-1.5 border border-black text-black text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Annuler
                </button>
                <button
                  type='submit'
                  className={cn("disabled:opacity-40 w-full rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  )}
                >
                  {isProductUpdating ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Separator />
    </>
  )
}