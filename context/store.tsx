"use client"

import React, { createContext, useContext, useState } from "react"

type ProductFormContextProviderProps = {
  children: React.ReactNode
}

type ProductFormContext = {
  showForm: boolean,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  isUpdatingProduct: boolean,
  setIsUpdatingProduct: React.Dispatch<React.SetStateAction<boolean>>
  productUpdating: object,
  setProductUpdating: React.Dispatch<React.SetStateAction<object>>
}

export const ProductFormContext = createContext<ProductFormContext | null>(null);

export const ProductFormContextProvider = ({ children }: ProductFormContextProviderProps) => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [isUpdatingProduct, setIsUpdatingProduct] = useState<boolean>(false)
  const [productUpdating, setProductUpdating] = useState<object>({})

  return (
    <ProductFormContext.Provider value={{ showForm, setShowForm, isUpdatingProduct, setIsUpdatingProduct, productUpdating, setProductUpdating }}>
      {children}
    </ProductFormContext.Provider>
  )
}

export const useProductFormContext = () => {
  const context = useContext(ProductFormContext)
  if (!context) {
    throw new Error("Use product form context must be used within a ProductFormContextProvider")
  }
  return context
}