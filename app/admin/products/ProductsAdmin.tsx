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

export default function ProductsAdmin({ user, token }) {
  const { isUpdatingProduct, setIsUpdatingProduct } = useProductFormContext()
  const { productUpdating, setProductUpdating } = useProductFormContext()
  const { showForm, setShowForm } = useProductFormContext()
  const [searchProductName, setSearchProductName] = useState('')
  const [searchBase, setSearchBase] = useState('toutes')
  const placeholderText = "marguarita...";
  const [displayedText, setDisplayedText] = useState('');
  const [choice, setChoice] = useState("list_products");

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
    setChoice(user?.restaurants[0]?.choice_menu)
    let typeTextInterval: any;
    let eraseTextTimeout: any;

    if (user?.restaurants?.products?.length > 0) {
      setShowForm(true)
      setIsUpdatingProduct(true)
    }

    const typeText = (text: string, currentIndex: number) => {
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

    const eraseText = (text: string, currentIndex: number) => {
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
    if (searchBase === 'toutes') {
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

  const handleChangeRadioBox = async (e: any) => {
    setChoice(e.target.value)
    const data = {
      choice_menu: e.target.value,
      users_permissions_user: {
        connect: [user?.id]
      }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants/${user?.restaurants[0]?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data })
        })
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code: ", errorCode);
      console.log("Error message: ", errorMessage);
    }
  }

  const renderListProducts = () => {
    return showForm ? <ProductsForm user={user} /> : user?.restaurants[0]?.products?.length > 0 ? (
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
              onChange={handleSearchChange}
              placeholder={displayedText}
            />
            <div className="text-xl absolute text-primary top-8 left-2">
              <CiSearch />
            </div>
          </div>

          <div className="md:w-[120px] w-full mr-6 mb-2 md:mb-0">
            <Label className="text-muted-foreground">Filtrer base</Label>
            <Select onValueChange={handleSearchChangeBase}>
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
        <ProductsList products={filterProductByBase(filteredProducts)} token={token || ''} updateProduct={updateProduct} />
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
    return user ? <MenuForm user={user} token={token || ''} /> : null
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
