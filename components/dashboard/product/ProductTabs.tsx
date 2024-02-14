import { Tabs, TabsContent } from "@/components/ui/tabs"

import { ProductType } from "@/lib/definitions";
import ProductsList from "./ProductsList";
import ProductsVisual from "./ProductsVisual";

export const ProductTabs = ({ products }: { products: ProductType[] }) => {
  // const environment = process.env.NODE_ENV

  return (
    <Tabs defaultValue="list" className="w-full">
      {/* <TabsList className="mb-6 grid w-full grid-cols-2 gap-1 bg-gray-600 md:w-1/2 md:grid-cols-2 lg:w-1/4">
        <TabsTrigger className="hover:bg-white hover:text-gray-800" value="list">Liste</TabsTrigger>
        <TabsTrigger className="hover:bg-white hover:text-gray-800" value="visual">Visuel</TabsTrigger>
      </TabsList> */}
      <TabsContent value="list">
        <ProductsList products={products} />
      </TabsContent>
      <TabsContent value="visual">
        <ProductsVisual />
      </TabsContent>
    </Tabs>
  )
}
