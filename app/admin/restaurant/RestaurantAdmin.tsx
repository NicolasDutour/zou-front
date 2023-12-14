"use client"

import { useRestaurantFormContext } from "@/context/store";
import { RestaurantForm } from "./RestaurantForm";
import { Button } from "@/components/ui/button";
import { UserType } from "@/lib/types";
import { useEffect } from "react";

export default function RestaurantsAdmin({ user, token }: { user: UserType, token: string }) {
  const { isUpdatingRestaurant, setIsUpdatingRestaurant } = useRestaurantFormContext()
  const { restaurantUpdating, setRestaurantUpdating } = useRestaurantFormContext()
  const { showForm, setShowForm } = useRestaurantFormContext()

  const updateRestaurant = (restaurant: object) => {
    setShowForm(true)
    setIsUpdatingRestaurant(true)
    setRestaurantUpdating(restaurant)
  }

  useEffect(() => {
    if (user?.restaurants?.length > 0) {
      setShowForm(true)
      setIsUpdatingRestaurant(true)
    }
  }, [setShowForm, setIsUpdatingRestaurant, user?.restaurants?.length])

  return (
    <section>
      {showForm && user ? <RestaurantForm user={user} token={token} /> : (
        <>
          <p className="mb-4"> {"Vous n'avez pas encore de restaurant"} </p>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <Button className="rounded-3xl md:self-end w-full md:w-fit px-2 py-1 bg-primary text-center md:inline-block cursor-pointer text-white" onClick={() => setShowForm(true)}>Ajouter un restaurant</Button>
          </div>
        </>
      )}
    </section>
  )
}

