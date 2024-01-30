import { cookies } from "next/headers"
import { BsStar } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { IoRestaurantOutline } from "react-icons/io5"
import { MdOutlineEmojiFoodBeverage } from "react-icons/md"
import { LiaFileInvoiceSolid } from "react-icons/lia"

import { SidebarNav } from "@/components/pages/admin/SidebarNav"
import { SidebarTop } from "@/components/pages/admin/SidebarTop"

import { SidebarNavItemType } from "@/lib/types"
import { UserType } from "@/lib/types/userType"
import { LogoutButton } from "@/components/home/LogoutButton"

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

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const user: UserType = await getUserData()

  return (
    <div className="p-4 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <div className="sticky top-4">
            <SidebarTop user={user} />
            <SidebarNav items={sidebarNavItems} />
            <LogoutButton />
          </div>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}