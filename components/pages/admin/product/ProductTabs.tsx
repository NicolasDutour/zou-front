import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsList from '@/components/pages/admin/product/ProductsList';
import ProductsVisual from "@/components/pages/admin/product/ProductsVisual"

import { ProductType } from "@/lib/types/productType";

export const ProductTabs = ({ products }: { products: ProductType[] }) => {
  const environment = process.env.NODE_ENV

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="mb-6 grid w-1/4 grid-cols-1 gap-1 bg-gray-600 md:grid-cols-2">
        <TabsTrigger className="hover:bg-white hover:text-gray-800" value="list">Liste</TabsTrigger>
        <TabsTrigger className="hover:bg-white hover:text-gray-800" value="visual">Visuel</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <ProductsList products={products} environment={environment} />
      </TabsContent>
      <TabsContent value="visual">
        <ProductsVisual />
      </TabsContent>
    </Tabs>
  )
}
