"use client"

import { ProductsVisualChoicesItem } from "@/components/pages/dashboard/product/ProductsVisualChoicesItem";

const productsVisualChoices = [
  {
    key: "list_products",
    value: "la liste des produits que j'ai créé",
  },
  {
    key: "import_files",
    value: "les menus à télécharger",
  },
  {
    key: "both",
    value: "les deux ci-dessus",
  }
]

export const ProductsVisualChoicesList = ({
  choice,
  setChoice
}: {
  choice: string,
  setChoice: (choice: string) => void
}) => {

  const handleChangeRadioBox = (e: any) => {
    setChoice(e.target.value)
  }

  return (
    <>
      {
        productsVisualChoices.map((item, index) => {
          return (
            <ProductsVisualChoicesItem
              key={index}
              item={item}
              choice={choice}
              handleChangeRadioBox={handleChangeRadioBox}
            />
          )
        })
      }
    </>
  )
}
