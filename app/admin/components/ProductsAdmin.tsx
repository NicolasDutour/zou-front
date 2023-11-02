"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductsForm } from './ProductsForm';
import { Separator } from "@/components/ui/separator";
import ProductsList from "@/components/ProductsList";
import { useSelector } from "react-redux";
import { useState } from "react";
import { string } from "zod";

export default function ProductsAdmin() {
  const user = useSelector((state: any) => state.auth.user)
  const [showForm, setShowForm] = useState(false)
  const [isProductUpdating, setIsProductUpdating] = useState(false)
  const [product, setProduct] = useState({
    product_name: '',
    ingredients: '',
    price: 0
  })

  const updateProduct = (product: object) => {
    setShowForm(true)
    setIsProductUpdating(true)
    setProduct(product)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Products</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Mettez à jour vos produits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm ? null : <div className="rounded-md p-2 bg-secondary text-center md:inline-block cursor-pointer text-white" onClick={() => setShowForm(true)}>Add new product</div>}
        <Separator />
        {showForm ? <ProductsForm closeForm={() => setShowForm(false)} isProductUpdating={isProductUpdating} product={product} /> : null}
        {user ? <ProductsList products={user?.restaurants[0]?.products} updateProduct={updateProduct} /> : null}
      </CardContent>
    </Card>
  )
}
