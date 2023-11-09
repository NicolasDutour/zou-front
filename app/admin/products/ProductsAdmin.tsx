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
  const placeholderText = "marguarita...";
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let typeTextInterval;
    let eraseTextTimeout;

    const typeText = (text, currentIndex) => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        typeTextInterval = setTimeout(() => {
          typeText(text, currentIndex + 1);
        }, 100); // Contrôle la vitesse de la machine à écrire
      } else {
        eraseTextTimeout = setTimeout(() => {
          eraseText(text, currentIndex);
        }, 1000); // Temps d'attente avant d'effacer le texte
      }
    };

    const eraseText = (text, currentIndex) => {
      if (currentIndex >= 0) {
        setDisplayedText(text.slice(0, currentIndex));
        typeTextInterval = setTimeout(() => {
          eraseText(text, currentIndex - 1);
        }, 5); // Contrôle la vitesse de l'effacement
      } else {
        eraseTextTimeout = setTimeout(() => {
          typeText(placeholderText, 0);
        }, 1000); // Temps d'attente avant de recommencer
      }
    };

    typeText(placeholderText, 0);

    return () => {
      // Nettoyez les intervalles ou les timeouts lors du démontage du composant.
      clearInterval(typeTextInterval);
      clearTimeout(eraseTextTimeout);
    };
  }, []);

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
                className="pl-8"
                type="text"
                value={searchProductName}
                onChange={handleSearchChange}
                placeholder={displayedText}
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