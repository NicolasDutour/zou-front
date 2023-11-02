"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileAdmin from "./ProfileAdmin"
import RestaurantAdmin from "./RestaurantAdmin"
import ProductsAdmin from "./ProductsAdmin"
import { setUserInfo } from "@/redux/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { UserType } from "@/lib/types"

export default function AdminLayout({ user }: { user: UserType }) {
  const dispatch = useDispatch()
  dispatch(setUserInfo(user))

  return (
    <section className="max-w-6xl bg-white mx-auto">
      <h1 className="text-4xl mb-6">Admin</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileAdmin />
        </TabsContent>
        <TabsContent value="restaurant">
          <RestaurantAdmin />
        </TabsContent>
        <TabsContent value="products">
          <ProductsAdmin />
        </TabsContent>
      </Tabs>
    </section>
  )
}
