"use client"

import { SetStateAction, useState } from "react";
import Image from "next/image"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Product from './Product';

import { formatIngredients } from '@/lib/utils';
import { ProductType } from "@/lib/types";

const imageStyle: React.CSSProperties = {
  objectFit: "cover",
};

const ListMenu = ({ products }: {
  products: ProductType[]
}) => {
  const [basePizza, setBasePizza] = useState('toutes')

  const handleBase = (e: SetStateAction<string>) => {
    setBasePizza(e)
  }

  const productsFilterByBase = () => {
    if (products?.length > 0) {
      if (basePizza === 'toutes') {
        return products
      }
      return products?.filter(product => product.attributes.base === basePizza)
    }
  }

  if (products?.length === 0) {
    return
  }

  return (
    <div className="max-w-5xl mx-auto my-8 px-6">
      <div className="mb-6">
        <Select onValueChange={handleBase}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Toutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="toutes">Toutes</SelectItem>
            <SelectItem className="cursor-pointer" value="tomate">Tomate</SelectItem>
            <SelectItem className="cursor-pointer" value="crème">Crème</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {
          productsFilterByBase()?.map(product => {

            console.log("product: ", product);

            // const { id, attributes: { product_name, ingredients, photo: { data: { attributes: { formats } } } } } = product
            const { id, attributes: { product_name, ingredients, price } } = product

            // let photo;

            // if (formats) {
            //   if (formats.small) {
            //     photo = formats.small.url;
            //   } else if (formats.medium) {
            //     photo = formats.medium.url;
            //   } else if (formats.large) {
            //     photo = formats.large.url;
            //   } else if (formats.thumbnail) {
            //     photo = formats.thumbnail.url;
            //   }
            // }
            return (
              <HoverCard key={id}>
                <HoverCardTrigger>
                  <Product key={id} product={product} />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div>
                    {/* <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${photo}`}
                      alt={product_name}
                      style={imageStyle}
                      width={200}
                      height={200}
                      aspect-auto="true"
                      className="rounded-lg"
                    /> */}
                    <p className="text-gray-900 font-bold py-2">{product_name}</p>
                    <p className="text-sm mb-4">{formatIngredients(ingredients)}</p>
                    <p className="text-sm">{price}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListMenu