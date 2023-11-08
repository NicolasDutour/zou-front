"use client"

import { useSelector } from "react-redux"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./components/SidebarNav"

import { capitalize } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/admin",
  },
  {
    title: "Restaurant",
    href: "/admin/restaurant",
  },
  {
    title: "Products",
    href: "/admin/products",
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
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}