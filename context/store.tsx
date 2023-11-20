"use client"

import React, { createContext, useContext, useState } from "react"

// Product store

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
    console.error("Use product form context must be used within a ProductFormContextProvider")
  }
  return context
}





// Restaurant store

type RestaurantFormContextProviderProps = {
  children: React.ReactNode
}

type RestaurantFormContext = {
  showForm: boolean,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  isUpdatingRestaurant: boolean,
  setIsUpdatingRestaurant: React.Dispatch<React.SetStateAction<boolean>>
  restaurantUpdating: object,
  setRestaurantUpdating: React.Dispatch<React.SetStateAction<object>>
}

export const RestaurantFormContext = createContext<RestaurantFormContext | null>(null);

export const RestaurantFormContextProvider = ({ children }: RestaurantFormContextProviderProps) => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [isUpdatingRestaurant, setIsUpdatingRestaurant] = useState<boolean>(false)
  const [restaurantUpdating, setRestaurantUpdating] = useState<object>({})

  return (
    <RestaurantFormContext.Provider value={{ showForm, setShowForm, isUpdatingRestaurant, setIsUpdatingRestaurant, restaurantUpdating, setRestaurantUpdating }}>
      {children}
    </RestaurantFormContext.Provider>
  )
}

export const useRestaurantFormContext = () => {
  const context = useContext(RestaurantFormContext)
  if (!context) {
    console.error("Use restaurant form context must be used within a RestaurantFormContextProvider")
  }
  return context
}