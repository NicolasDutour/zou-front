"use client"

import { useState } from "react";
import Image from "next/image"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Product from './Product';

import { capitalize, formatIngredients } from '@/lib/utils';
import { ProductTypeFromBack } from "@/lib/definitions";

const ListMenu = ({ environment, products }: {
  environment: string,
  products: ProductTypeFromBack[]
}) => {
  const [criteria, setCriteria] = useState("tomato")
  const criterias = ["tomato", "cream", "vegetarian", "dessert"]

  const productsFilterByBase = () => {
    if (products?.length > 0) {
      if (criteria === 'tomato' || criteria === 'cream') {
        return products?.filter(product => product?.attributes?.base === criteria)
      } else if (criteria === 'vegetarian') {
        return products?.filter(product => product?.attributes?.vegetarian)
      } else if (criteria === 'dessert') {
        return products?.filter(product => product?.attributes?.dessert)
      }
      return products
    }
  }

  if (products?.length === 0) {
    return
  }

  return (
    <section className="bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <Tabs defaultValue="tomato" className="w-full">
          <TabsList className={`md:grid-cols-${criterias?.length} mb-6 grid w-full grid-cols-1 gap-1 bg-gray-800`}>
            {criterias.map((criteria, index) => <TabsTrigger className="text-lg hover:bg-white hover:text-gray-800" key={index} onClick={() => setCriteria(criteria)} value={criteria}> {capitalize(criteria)} </TabsTrigger>)}
          </TabsList>
          <TabsContent value={criteria}>
            <div className="grid grid-cols-1 gap-4">
              {
                productsFilterByBase()?.map(product => {
                  const { id, attributes: { product_name, ingredients, price, photo } } = product
                  let picture;
                  if (photo?.data?.attributes?.formats) {
                    if (photo?.data?.attributes?.formats?.small) {
                      picture = photo?.data?.attributes?.formats?.small.url;
                    } else if (photo?.data?.attributes?.formats?.medium) {
                      picture = photo?.data?.attributes?.formats?.medium.url;
                    } else if (photo?.data?.attributes?.formats?.large) {
                      picture = photo?.data?.attributes?.formats?.large.url;
                    } else if (photo?.data?.attributes?.formats?.thumbnail) {
                      picture = photo?.data?.attributes?.formats?.thumbnail.url;
                    }
                  }

                  return (
                    <Popover key={id}>
                      <PopoverTrigger>
                        <Product key={id} product={product} />
                      </PopoverTrigger>
                      <PopoverContent className="w-full md:w-96">
                        <div className="w-full">
                          <Image
                            src={picture ? environment === 'production' ? picture : `${process.env.NEXT_PUBLIC_STRAPI_URL}${picture}` : '/no_image.png'}
                            alt={product_name}
                            style={{
                              objectFit: "cover",
                            }}
                            width={400}
                            height={200}
                            aspect-auto="true"
                            className="rounded-lg"
                          />
                          <p className="py-2 text-2xl font-bold text-gray-900">{product_name}</p>
                          <p className="mb-4 text-sm">{formatIngredients(ingredients)}</p>
                          <p className="text-xl font-bold">{price.toFixed(2) || null} €</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                })
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default ListMenu