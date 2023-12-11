"use client"

import React, { createContext, useContext, useState } from "react"

// Product store

export const ProductFormContext = createContext()

export const ProductFormContextProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false)
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false)
  const [productUpdating, setProductUpdating] = useState()

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

export const RestaurantFormContext = createContext();

export const RestaurantFormContextProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false)
  const [isUpdatingRestaurant, setIsUpdatingRestaurant] = useState(false)
  const [restaurantUpdating, setRestaurantUpdating] = useState()

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