"use client"

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci"

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

import { Label } from "@/components/ui/label";
import { MenuForm } from "./MenuForm";
import { Separator } from "@/components/ui/separator";
import { FilteredProductType, RestaurantType } from "@/lib/types";

export default function ProductsAdmin({
  products, restaurant, userId, token
}: {
  products: FilteredProductType[],
  restaurant: RestaurantType,
  userId: number,
  token: string
}) {
  const { isUpdatingProduct, setIsUpdatingProduct } = useProductFormContext()
  const { productUpdating, setProductUpdating } = useProductFormContext()
  const { showForm, setShowForm } = useProductFormContext()
  const [searchProductName, setSearchProductName] = useState('')
  const [selectBase, setSelectBase] = useState('toutes')
  const placeholder = "marguarita...";
  const [placeholderText, setPlaceholderText] = useState('');
  const [choice, setChoice] = useState("list_products");
  const [filteredProducts, setFilteredProducts] = useState<FilteredProductType[]>([])

  const items = [
    {
      key: "list_products",
      value: "Je veux voir un beau menu s'afficher donc je crée mes produits",
    },
    {
      key: "import_files",
      value: "J'ai pas le temps pour l'instant, j'importe mes menus",
    },
    {
      key: "both",
      value: "Je fais les deux, comme ça le client a le choix",
    }
  ] as const

  useEffect(() => {
    setFilteredProducts(products)
    setChoice(restaurant?.choice_menu)
    let typeTextInterval: any;
    let eraseTextTimeout: any;

    const typeText = (text: string, currentIndex: number) => {
      if (currentIndex <= text.length) {
        setPlaceholderText(text.slice(0, currentIndex));
        typeTextInterval = setTimeout(() => {
          typeText(text, currentIndex + 1);
        }, 100); // Contrôle la vitesse de la machine à écrire
      } else {
        eraseTextTimeout = setTimeout(() => {
          eraseText(text, currentIndex);
        }, 1000); // Temps d'attente avant d'effacer le texte
      }
    };

    const eraseText = (text: string, currentIndex: number) => {
      if (currentIndex >= 0) {
        setPlaceholderText(text.slice(0, currentIndex));
        typeTextInterval = setTimeout(() => {
          eraseText(text, currentIndex - 1);
        }, 5); // Contrôle la vitesse de l'effacement
      } else {
        eraseTextTimeout = setTimeout(() => {
          typeText(placeholder, 0);
        }, 1000); // Temps d'attente avant de recommencer
      }
    };

    typeText(placeholder, 0);

    return () => {
      // Nettoyez les intervalles ou les timeouts lors du démontage du composant.
      clearInterval(typeTextInterval);
      clearTimeout(eraseTextTimeout);
    };
  }, [setIsUpdatingProduct, setShowForm, products, restaurant?.choice_menu]);

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

  const updateProduct = (product: object) => {
    setShowForm(true)
    setIsUpdatingProduct(true)
    setProductUpdating(product)
  }

  const handleChangeRadioBox = async (e: any) => {
    setChoice(e.target.value)
    const data = {
      choice_menu: e.target.value,
      users_permissions_user: {
        connect: [userId]
      }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants/${restaurant?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data })
        })
    } catch (error) {
      console.error("Error message: ", error);
    }
  }

  const renderListProducts = () => {
    return showForm ? <ProductsForm restaurant={restaurant} token={token || ''} /> : products?.length > 0 ? (
      <>
        <p className="block text-lg font-medium leading-6 mb-4 text-gray-900">
          Mes produits
        </p>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="md:w-1/4 mr-6 relative w-full mb-2 md:mb-0 ">
            <Label className="text-muted-foreground">Rechercher un produit</Label>
            <Input
              className="pl-8"
              type="text"
              value={searchProductName}
              onChange={handleChangeSearchProductName}
              placeholder={placeholderText}
            />
            <div className="text-xl absolute text-primary top-8 left-2">
              <CiSearch />
            </div>
          </div>

          <div className="md:w-[120px] w-full mr-6 mb-2 md:mb-0">
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
          <Button className="rounded-3xl md:self-end w-full md:w-fit px-2 py-1 bg-primary hover:bg-secondary text-center md:inline-block cursor-pointer text-white" onClick={() => setShowForm(true)}>Ajouter un produit</Button>
        </div>
        <ProductsList products={filteredProducts} token={token || ''} updateProduct={updateProduct} />
      </>
    ) : (
      <>
        <p className="my-4"> {"Vous n'avez pas encore de produits"} </p>
        <div className="flex flex-col md:flex-row items-center">
          <Button className="rounded-3xl md:self-end w-full md:w-fit px-2 py-1 bg-primary  hover:bg-secondary text-center md:inline-block cursor-pointer text-white" onClick={() => setShowForm(true)}>Ajouter un produit</Button>
        </div>
      </>
    )
  }

  const renderMenuForm = () => {
    return restaurant ? <MenuForm restaurant={restaurant} token={token || ''} /> : null
  }

  return (
    <section>
      <p>Vous choisissez comment vous voulez afficher le menu sur votre page:</p>
      <div className="mt-4 mb-8">
        {
          items.map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <input
                  className="w-6 cursor-pointer h-9"
                  key={index}
                  onChange={handleChangeRadioBox}
                  type="radio"
                  value={item.key}
                  checked={choice === item.key}
                />
                <label className="ml-2 text-muted-foreground"> {item.value} </label>
              </div>
            )
          })
        }
      </div>

      {
        choice === "both" ? (
          <div>
            <div className="mb-6">
              {renderMenuForm()}
            </div>
            <Separator className="my-10" />
            {renderListProducts()}
          </div>
        ) : choice === "list_products" ? renderListProducts() : renderMenuForm()
      }
    </section>
  )
}
