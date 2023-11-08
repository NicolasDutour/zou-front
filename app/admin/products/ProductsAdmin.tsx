"use client"

import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci"
import { useSelector } from "react-redux";
import Cookies from 'js-cookie'

import { useProductFormContext } from "@/context/store";
import { ProductsForm } from "./ProductsForm";
import ProductsList from "./ProductsList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ProductAdminType, productAdminSchema } from "@/lib/types";
import { Label } from "@/components/ui/label";


export default function ProductsAdmin({ user, token }) {
  // const user = useSelector((state: any) => state.auth.user)
  const { isUpdatingProduct, setIsUpdatingProduct } = useProductFormContext()
  const { productUpdating, setProductUpdating } = useProductFormContext()
  const { showForm, setShowForm } = useProductFormContext()
  const [searchProductName, setSearchProductName] = useState('')
  const [searchBase, setSearchBase] = useState('all')

  const handleSearchChange = (e: any) => {
    setSearchProductName(e.target.value);
  }

  const filteredProducts = user?.restaurants[0]?.products.filter((product) => {
    return product?.product_name.toLowerCase().includes(searchProductName.toLowerCase());
  });

  const filterProductByBase = (filteredProducts) => {
    if (searchBase === 'all') {
      return filteredProducts;
    } else {
      return filteredProducts.filter((product) => product.base === searchBase);
    }
  };

  const handleSearchChangeBase = (base: string) => {
    setSearchBase(base)
  }

  const updateProduct = (product: object) => {
    setShowForm(true)
    setIsUpdatingProduct(true)
    setProductUpdating(product)
  }

  return (
    <section>
      {showForm || isUpdatingProduct ? <ProductsForm user={user} /> : user ? (
        <>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="md:w-1/4 mr-6 relative w-full mb-2 md:mb-0 ">
              <Label className="text-muted-foreground">Rechercher un produit</Label>
              <Input
                type="text"
                value={searchProductName}
                onChange={handleSearchChange}
              />
              <IconContext.Provider value={{ color: "green", className: "text-xl absolute top-8 left-2" }}>
                <div>
                  <CiSearch />
                </div>
              </IconContext.Provider>
            </div>

            <div className="md:w-[120px] w-full mr-6 mb-2 md:mb-0">
              <Label className="text-muted-foreground">Filtrer base</Label>
              <Select onValueChange={handleSearchChangeBase}>
                <SelectTrigger className="">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="all">All</SelectItem>
                  <SelectItem className="cursor-pointer" value="tomato">Tomato</SelectItem>
                  <SelectItem className="cursor-pointer" value="cream">Cream</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="rounded-3xl md:self-end w-full md:w-fit px-2 py-1 bg-secondary text-center md:inline-block cursor-pointer text-white" onClick={() => setShowForm(true)}>Add new product</Button>
          </div>
          <ProductsList products={filterProductByBase(filteredProducts)} token={token || ''} updateProduct={updateProduct} />
        </>
      ) : null}
    </section>
  )
}
