"use client"

import { useSelector } from "react-redux"

import { SidebarNav } from "./components/SidebarNav"

import { BsStar } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { IoRestaurantOutline } from "react-icons/io5"
import { MdOutlineEmojiFoodBeverage } from "react-icons/md"
import { LiaFileInvoiceSolid } from "react-icons/lia"

const sidebarNavItems = [
  {
    title: "Profil",
    href: "/admin",
    icon: <GoPerson />
  },
  {
    title: "Restaurant",
    href: "/admin/restaurant",
    icon: <IoRestaurantOutline />
  },
  {
    title: "Produits",
    href: "/admin/products",
    icon: <MdOutlineEmojiFoodBeverage />
  },
  {
    title: "Abonnemennt",
    href: "/admin/subscriptions",
    icon: <BsStar />
  },
  {
    title: "Factures",
    href: "/admin/invoices",
    icon: <LiaFileInvoiceSolid />
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const user = useSelector((state: any) => state.auth.user)

  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 shadow-custom p-6 rounded-2xl">{children}</div>
      </div>
    </div>
  )
}