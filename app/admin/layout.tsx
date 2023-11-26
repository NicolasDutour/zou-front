
import { BsStar } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { IoRestaurantOutline } from "react-icons/io5"
import { MdOutlineEmojiFoodBeverage } from "react-icons/md"
import { LiaFileInvoiceSolid } from "react-icons/lia"

import { SidebarNav } from "./components/SidebarNav"
import { cookies } from "next/headers"
import { capitalize } from "@/lib/utils"

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
    title: "Abonnement",
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

async function getData() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[restaurants][populate]=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!res.ok) {
      console.log("error");
    }
    return res.json()
  }
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  const data = await getData()

  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="mx-4 lg:w-1/5">
          {
            data?.username ? (
              <div className="shadow-2xl p-4 rounded-2xl mb-4 grid place-items-center">
                <p className=" text-lg">Bonjour {capitalize(data?.username)}</p>
              </div>
            ) : null
          }
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 shadow-custom p-6 rounded-2xl">{children}</div>
      </div>
    </div>
  )
}