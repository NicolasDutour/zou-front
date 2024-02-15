import { ProductTypeFromBack } from "@/lib/definitions";
import { formatIngredients } from "@/lib/utils";

const Product = ({ product }: { product: ProductTypeFromBack }) => {
  const { attributes: { product_name, ingredients, price } } = product

  return (
    <div className="items-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border hover:border-slate-400 md:flex">
      <div className="w-full font-bold uppercase tracking-wider md:w-1/4">{product_name || null}</div>
      <div className="mb-4 md:mb-0 md:pl-6">
        {formatIngredients(ingredients) || null}
      </div>
      <div className="ml-auto text-lg font-bold italic">
        {price.toFixed(2) || null} €
      </div>
    </div>
  )
}

export default Product