"use client"

import { useState } from "react";
import Image from "next/image"

import { ProductsVisualChoicesList } from "@/components/pages/admin/product/ProductsVisualChoicesList";

export default function ProductsVisual() {
  const [choice, setChoice] = useState("list_products");

  const displayChoiceTemplate = () => {
    switch (choice) {
      case "both":
        return "/both-display-menus.png"
      case "list_products":
        return "/list-products-display-menus.png"
      case "import_files":
        return "/download-display-menus.png"
      default:
        return "/both-display-menus.png"
    }
  }

  return (
    <>
      <p>Sur ma page je souhaite afficher:</p>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="mt-4 mb-8">
          <ProductsVisualChoicesList choice={choice} setChoice={setChoice} />
          <button
            className="flex w-1/2 mt-4 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Valider
          </button>
        </div>
        <div className="relative border border-muted rounded-lg p-4 h-96 col-span-2">
          <Image
            src={displayChoiceTemplate()}
            alt="no_image"
            style={{
              objectFit: "contain",
            }}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
            aspect-auto="true"
            className="rounded-lg"
          />
        </div>
      </div>
    </>
  )
}