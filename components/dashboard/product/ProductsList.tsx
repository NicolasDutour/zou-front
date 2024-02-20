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
// import Image from "next/image"

import { capitalize, formatCurrency, formatIngredients } from "@/lib/utils"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductTypeFiltered } from "@/lib/validations";
import { removeProductAction } from "@/lib/actions";

export default function ProductsList({ products }: { products: ProductTypeFiltered[] }) {
  const [searchProductName, setSearchProductName] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductTypeFiltered[]>([])
  const [selectBase, setSelectBase] = useState('all')

  useEffect(() => {
    setFilteredProducts(products)
  }, [products]);

  const handleChangeSearchProductName = (e: any) => {
    const value = e.target.value.toLowerCase()
    setSearchProductName(value)

    const filtered = products.filter(product =>
      product?.product_name.toLowerCase().includes(value) &&
      (selectBase === 'all' || product?.base === selectBase)
    );
    setFilteredProducts(filtered);
  }

  const handleChangeSelectBase = (base: string) => {
    setSelectBase(base)

    const filtered = products.filter(product =>
      product?.product_name.toLowerCase().includes(searchProductName) &&
      (base === 'all' || product?.base === base)
    );
    setFilteredProducts(filtered);
  }

  return (
    <div>
      {
        products?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Label className="text-white">Rechercher un produit</Label>
              <input
                id='ingredients'
                type="text"
                value={searchProductName}
                onChange={handleChangeSearchProductName}
                className="block w-full rounded-md border-0 bg-white p-2 py-1.5 pl-8 text-blueDark shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blueDark sm:text-sm sm:leading-6"
              />
              <div className="absolute left-2 top-8 text-xl text-blueDark">
                <CiSearch />
              </div>
            </div>
            <div className="md:w-1/2">
              <Label className="text-white">Filtrer base</Label>
              <Select onValueChange={handleChangeSelectBase}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer focus:bg-blueDark focus:text-white" value="all">Toutes</SelectItem>
                  <SelectItem className="cursor-pointer focus:bg-blueDark focus:text-white" value="tomato">Tomate</SelectItem>
                  <SelectItem className="cursor-pointer focus:bg-blueDark focus:text-white" value="cream">Crème</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Link
              href="/dashboard/product/new"
              className="ml-auto flex h-[36px] w-full items-center justify-center rounded-md bg-white px-3 py-1.5 text-sm font-medium leading-6 text-blueDark shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueDarker md:w-auto md:self-end"
            >
              <p>Ajouter un produit</p>
              <div className="ml-4 text-2xl">
                <AiOutlinePlus />
              </div>
            </Link>
          </div>
        ) : null
      }
      <div className="mt-4 rounded-2xl bg-blueDark p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12 border-white font-medium text-white">Nom</TableHead>
              <TableHead className="w-1/12 border-white font-medium text-white">Image</TableHead>
              <TableHead className="w-1/12 border-white font-medium text-white">Base</TableHead>
              <TableHead className="w-5/12 border-white font-medium text-white">Ingredients</TableHead>
              <TableHead className="w-1/12 border-white font-medium text-white">Prix</TableHead>
              <TableHead className="w-1/12 border-white font-medium text-white">Statut</TableHead>
              <TableHead className="w-2/12 border-white text-center font-medium text-white"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts?.map((product) => {
              return (
                <TableRow className="border-b-blueDark bg-white" key={product.id}>
                  <TableCell className="font-medium">{capitalize(product?.product_name.toLowerCase())}</TableCell>
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
                  <TableCell> "base" </TableCell>
                  <TableCell>{formatIngredients(product?.ingredients)}</TableCell>
                  <TableCell>{formatCurrency(product?.price)}</TableCell>
                  <TableCell>
                    <p className="rounded-full bg-green-500 px-2 py-1 text-center font-medium text-white">{product?.publishedAt ? 'Publié' : ''}</p>
                  </TableCell>
                  <TableCell className="flex items-center justify-around">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className="rounded-lg border border-error p-2 text-xl text-error"><IoTrashOutline /></div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Voulez vous supprimer définitivement <span className="text-error underline underline-offset-4">{product?.product_name}</span> ?</AlertDialogTitle>
                          <AlertDialogDescription className="text-error">
                            Cette suppression est permanente. Vous ne pourrez pas revenir en arrière.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeProductAction(product?.id)} className="rounded-md bg-error text-white">Supprimer</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link
                      href={{
                        pathname: "/dashboard/product/edit",
                        query: { id: product.id }
                      }}
                      className="cursor-pointer rounded-lg border border-blueDarker p-2 text-xl text-blueDarker">
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
