"use client"

import { useSelector } from "react-redux"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/SidebarNav"

import { capitalize } from "@/lib/utils"
import { BsStar } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { IoRestaurantOutline } from "react-icons/io5"
import { MdOutlineEmojiFoodBeverage, MdPayment } from "react-icons/md"
import { LiaFileInvoiceSolid } from "react-icons/lia"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/admin",
    icon: <GoPerson />
  },
  {
    title: "Restaurant",
    href: "/admin/restaurant",
    icon: <IoRestaurantOutline />
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <MdOutlineEmojiFoodBeverage />
  },
  {
    title: "Subscriptions",
    href: "/admin/subscriptions",
    icon: <BsStar />
  },
  {
    title: "Payment",
    href: "/admin/payment",
    icon: <MdPayment />
  },
  {
    title: "Invoices",
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
      <div className="space-y-0.5">
        <p className="text-muted-foreground">
          Abonnement actuel: <span className="underline underline-offset-4 font-semibold text-secondary">{capitalize(user?.pricing_plan?.title)}</span>
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 shadow-custom p-6 rounded-2xl">{children}</div>
      </div>
    </div>
  )
}