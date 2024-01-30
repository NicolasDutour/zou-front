"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AiOutlinePlus } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci"
import Image from "next/image"


import { ProductType } from "@/lib/types/productType"
import { capitalize, formatCurrency, formatIngredients } from "@/lib/utils"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { removeProductAction } from "@/lib/actions/product-actions";

export default function ProductsList({ products, environment }: { products: ProductType[], environment: string }) {
  const [searchProductName, setSearchProductName] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [selectBase, setSelectBase] = useState('toutes')

  useEffect(() => {
    setFilteredProducts(products)
  }, [products]);

  const handleChangeSearchProductName = (e: any) => {
    const value = e.target.value.toLowerCase()
    setSearchProductName(value)

    const filtered = products.filter(product =>
      product.product_name.toLowerCase().includes(value) &&
      (selectBase === 'toutes' || product.base === selectBase)
    );
    setFilteredProducts(filtered);
  }

  const handleChangeSelectBase = (base: string) => {
    setSelectBase(base)

    const filtered = products.filter(product =>
      product.product_name.toLowerCase().includes(searchProductName) &&
      (base === 'toutes' || product.base === base)
    );
    setFilteredProducts(filtered);
  }

  return (
    <div>
      {
        products?.length > 0 ? (
          <div className="flex items-end justify-between">
            <div className="relative w-full mr-2">
              <Label className="text-muted-foreground">Rechercher un produit</Label>
              <input
                id='ingredients'
                type="text"
                value={searchProductName}
                onChange={handleChangeSearchProductName}
                className="pl-8 block p-2 w-full rounded-md focus:outline-none border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
              <div className="text-xl absolute text-primary top-8 left-2">
                <CiSearch />
              </div>
            </div>
            <div className="mr-2 w-1/4">
              <Label className="text-muted-foreground">Filtrer base</Label>
              <Select onValueChange={handleChangeSelectBase}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="toutes">Toutes</SelectItem>
                  <SelectItem className="cursor-pointer" value="tomate">Tomate</SelectItem>
                  <SelectItem className="cursor-pointer" value="crème">Crème</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Link
              href="/admin/product/create"
              className="flex justify-center items-center w-full md:w-1/3 h-[36px] rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <p>Ajouter un produit</p>
              <div className="text-2xl ml-4">
                <AiOutlinePlus />
              </div>
            </Link>
          </div>
        ) : null
      }
      <div className="rounded-2xl bg-muted p-4 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12 border-gray-700 font-medium">Nom</TableHead>
              <TableHead className="w-1/12 border-gray-700 font-medium">Image</TableHead>
              <TableHead className="w-1/12 border-gray-700 font-medium">Base</TableHead>
              <TableHead className="w-5/12 border-gray-700 font-medium">Ingredients</TableHead>
              <TableHead className="w-1/12 border-gray-700 font-medium">Prix</TableHead>
              <TableHead className="w-1/12 border-gray-700 font-medium">Statut</TableHead>
              <TableHead className="w-2/12 border-gray-700 font-medium text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts?.map((product) => {
              return (
                <TableRow className="bg-white" key={product.id}>
                  <TableCell className="font-medium">{capitalize(product.product_name.toLowerCase())}</TableCell>
                  <TableCell className="font-medium">
                    {/* <Image
                      src={product ? environment === "production" ? photo.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${photo.url}` : "/no_image.png"}
                      alt={"no_image"}
                      style={{
                        objectFit: "contain",
                      }}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                      aspect-auto="true"
                      className="rounded-lg"
                    /> */}
                  </TableCell>
                  <TableCell>{capitalize(product.base.toLowerCase())}</TableCell>
                  <TableCell>{formatIngredients(product.ingredients)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                  <TableCell className="">
                    <p className="px-2 py-1 text-white bg-green-500 rounded-full font-medium text-center">{product.publishedAt ? 'Publié' : ''}</p>
                  </TableCell>
                  <TableCell className="flex items-center justify-around">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className="text-xl border border-red-400 p-2 rounded-lg text-red-500"><IoTrashOutline /></div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Voulez vous supprimer définitivement <span className="underline underline-offset-4 text-primary">{product.product_name}</span> ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette suppression est permanente. Vous ne pourrez pas revenir en arrière.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeProductAction(product?.id)} className="bg-primary rounded-md text-white">Supprimer</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link
                      href={{
                        pathname: "/admin/product/update",
                        query: { id: product.id }
                      }}
                      className="text-xl border border-secondary p-2 rounded-lg text-secondary cursor-pointer">
                      <MdOutlineModeEditOutline />
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table >
      </div>
    </div>
  )
}
