import React from "react"
import { cookies } from "next/headers"
import { BsStar } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { IoRestaurantOutline } from "react-icons/io5"
import { MdOutlineEmojiFoodBeverage } from "react-icons/md"
import { LiaFileInvoiceSolid } from "react-icons/lia"

import { SidebarTop } from "@/components/pages/admin/SidebarTop"

import { SidebarNavItemType } from "@/lib/types"
import { UserType } from "@/lib/types/userType"
import { SideBar } from "@/components/pages/admin/SideBar"

const sidebarNavItems: SidebarNavItemType[] = [
  {
    title: "Profil",
    href: "/admin/profile",
    icon: <GoPerson />
  },
  {
    title: "Restaurant",
    href: "/admin/restaurant",
    icon: <IoRestaurantOutline />
  },
  {
    title: "Produits",
    href: "/admin/product",
    icon: <MdOutlineEmojiFoodBeverage />
  },
  {
    title: "Abonnement",
    href: "/admin/subscription",
    icon: <BsStar />
  },
  {
    title: "Factures",
    href: "/admin/invoice",
    icon: <LiaFileInvoiceSolid />
  }
]

async function getUserData() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/users/me`;

  if (token) {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!response.ok) {
      console.log("error");
    }
    return response.json()
  }
}

type LayoutProps = {
  children: React.ReactNode,
  openMenu: boolean
}

export default async function Layout({
  children,
  openMenu
}: LayoutProps) {
  const user: UserType = await getUserData()

  return (
    <div className={`lg:block lg:p-4 ${openMenu ? 'h-screen overflow-hidden' : ''}`}>
      <div className="space-y-8 lg:flex lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <div className="sticky top-4 z-20 w-full">
            <SidebarTop user={user} />
            <SideBar items={sidebarNavItems} />
          </div>
        </aside>
        <div className="flex-1 px-4 pt-20 lg:p-0">{children}</div>
      </div>
    </div>
  )
}