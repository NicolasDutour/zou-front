import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ProductType } from "@/lib/types";
import { formatIngredients } from "@/lib/utils";

const imageStyle: React.CSSProperties = {
  objectFit: "cover",
};

const Product = ({ product }: { product: ProductType }) => {
  // const { attributes: { product_name, ingredients, price, photo: { data: { attributes: { formats } } } } } = product
  const { attributes: { product_name, ingredients, price, base } } = product

  // let photo;

  // if (formats) {
  //   if (formats.thumbnail) {
  //     photo = formats.thumbnail.url;
  //   } else if (formats.small) {
  //     photo = formats.small.url;
  //   } else if (formats.medium) {
  //     photo = formats.medium.url;
  //   } else if (formats.large) {
  //     photo = formats.large.url;
  //   }
  // }

  const baseImage = () => {
    if (base === "tomate") {
      return (
        <Image
          src="/tomato.png"
          alt="tomate"
          width={30}
          height={30}
        />
      )
    } else {
      return (
        <Image
          src="/cream.png"
          alt="crème"
          width={30}
          height={30}
        />
      )
    }
  }

  return (
    <div className="md:flex items-center border border-gray-200 rounded-lg p-4 bg-white">
      <div className="w-full md:w-1/4">{product_name || null}</div>
      <div className="mb-2 md:mb-0">{baseImage()}</div>
      <div className="md:pl-6 mb-4 md:mb-0">
        {formatIngredients(ingredients) || null}
      </div>
      <div className="ml-auto">
        {price.toFixed(2) || null} €
      </div>
    </div>

    // <div className="flex justify-between items-center rounded-lg p-2 bg-white hover:shadow-lg transition-shadow">
    //   <p className="uppercase font-semibold">{product_name || null}</p>
    //   <p className="">{base || null}</p>
    //   <p className="">{formatIngredients(ingredients) || null}</p>
    //   <p className="text-red-800 p-4 text-2xl font-semibold">{price.toFixed(2) || null} €</p>
    // </div>
  )
}

export default Product