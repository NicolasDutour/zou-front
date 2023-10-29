import { productType } from "@/lib/types";
import { formatIngredients } from "@/lib/utils";

const imageStyle: React.CSSProperties = {
  objectFit: "cover",
};

const Product = ({ product }: { product: productType }) => {
  const { attributes: { productName, ingredients, price, photo: { data: { attributes: { formats } } } } } = product
  let photo;

  if (formats) {
    if (formats.thumbnail) {
      photo = formats.thumbnail.url;
    } else if (formats.small) {
      photo = formats.small.url;
    } else if (formats.medium) {
      photo = formats.medium.url;
    } else if (formats.large) {
      photo = formats.large.url;
    }
  }

  return (
    <div className="flex justify-between items-center rounded-lg p-2 bg-white hover:shadow-lg transition-shadow">
      <p className="uppercase font-semibold">{productName || null}</p>
      <p className="">{formatIngredients(ingredients) || null}</p>
      <p className="text-red-800 p-4 text-2xl font-semibold">{price.toFixed(2) || null} €</p>
    </div>
  )
}

export default Product