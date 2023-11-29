"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

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
import { useProductFormContext } from "@/context/store"
import LoaderButton from "@/components/LoaderButton"

export function ProductsForm({ user }) {
  const router = useRouter()
  const { toast } = useToast()
  const token = useSelector((state: any) => state.auth.token)
  const [isLoading, setIsLoading] = useState(false)
  const { isUpdatingProduct, setIsUpdatingProduct } = useProductFormContext()
  const { showForm, setShowForm } = useProductFormContext()
  const { productUpdating, setProductUpdating } = useProductFormContext()


  const {
    register,
    handleSubmit,
    formState: { errors, },
    setValue,
    setFocus,
    watch
  } = useForm<TypeFormSchemaProduct>({
    resolver: zodResolver(FormSchemaProduct),
  });

  const watchProductName = watch('product_name')
  const watchIngredients = watch('ingredients')
  const watchPrice = watch('price')

  useEffect(() => {
    if (isUpdatingProduct) {
      setValue('product_name', productUpdating.product_name)
      setValue('ingredients', productUpdating.ingredients)
      setValue('price', productUpdating.price)
      setFocus('product_name')
    }
  }, [])

  const closeForm = () => {
    setShowForm(false)
    setIsUpdatingProduct(false)
  }


  const onCreateOrUpdateProduct = async (payload: z.infer<typeof FormSchemaProduct>) => {
    setShowForm(false)
    setIsUpdatingProduct(false)
    const newData = {
      ...payload,
      restaurant: {
        connect: [user?.restaurants[0]?.id]
      }
    }

    if (!token) {
      router.push('/login')
      toast({
        title: "Vous devez vous reconnecter"
      })
    }


    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products${isUpdatingProduct ? `/${productUpdating.id}` : ''}`,
        {
          method: `${isUpdatingProduct ? 'PUT' : 'POST'}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data: newData })
        })
      if (response.status === 200) {
        setIsLoading(false)
        try {
          const product = await response.json()
          toast({
            title: `Produit ${isUpdatingProduct ? 'mis à jour' : 'ajouté'} avec succés !`
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
          setIsLoading(false)
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
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> {isUpdatingProduct ? `Mise à jour de product name` : "Création d'un nouveau produit"} </CardTitle>
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
                      className="block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                        <SelectItem className="cursor-pointer" value="tomate">Tomate</SelectItem>
                        <SelectItem className="cursor-pointer" value="crème">Cream</SelectItem>
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
                      className="block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                      className="block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500 text-sm mt-2">{errors.price?.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center w-full md:w-1/2 gap-2">
                <button
                  onClick={closeForm}
                  type='button'
                  className="disabled:opacity-40 w-full rounded-md px-3 py-1.5 border border-black text-black text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Annuler
                </button>
                <button
                  type='submit'
                  disabled={
                    isLoading ||
                    (
                      isUpdatingProduct &&
                      watchProductName == productUpdating.product_name &&
                      watchIngredients == productUpdating.ingredients &&
                      watchPrice == productUpdating.price
                    ) || (
                      !isUpdatingProduct &&
                      watchProductName == '' &&
                      watchIngredients == '' &&
                      watchPrice == 0
                    )
                  }
                  className="disabled:opacity-40 flex w-full justify-center rounded-md bg-primary hover:bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {
                    isLoading ? (
                      <LoaderButton />
                    ) : isUpdatingProduct ? 'Mettre à jour' : 'Créer'
                  }
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