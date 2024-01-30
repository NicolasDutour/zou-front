import { ProductType } from "@/lib/types/productType";
import { formatIngredients } from "@/lib/utils";

const Product = ({ product }: { product: ProductType }) => {
  const { product_name, ingredients, price } = product

  return (
    <div className="md:flex items-center border border-gray-200 rounded-lg p-4 bg-white hover:border hover:border-slate-400 transition-all">
      <div className="w-full md:w-1/4 uppercase tracking-wider font-bold">{product_name || null}</div>
      <div className="md:pl-6 mb-4 md:mb-0">
        {formatIngredients(ingredients) || null}
      </div>
      <div className="ml-auto font-bold italic text-lg">
        {price.toFixed(2) || null} €
      </div>
    </div>
  )
}

export default Product