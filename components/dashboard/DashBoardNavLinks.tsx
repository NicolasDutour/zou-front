"use client"

import { BsStar } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { IoRestaurantOutline, IoLogOutOutline } from "react-icons/io5"
import { MdOutlineEmojiFoodBeverage } from "react-icons/md"
import { RxDashboard } from "react-icons/rx";


import DashBoardNavLink from "./DashBoardNavLink"
import { logoutAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function DashBoardNavLinks() {
  const router = useRouter()
  const links = [
    { href: "/dashboard/overview", label: "Dashboard", icon: <RxDashboard /> },
    { href: "/dashboard/profile", label: "Profile", icon: <GoPerson /> },
    { href: "/dashboard/restaurant", label: "Restaurant", icon: <IoRestaurantOutline /> },
    { href: "/dashboard/product", label: "Product", icon: <MdOutlineEmojiFoodBeverage /> },
    { href: "/dashboard/subscription", label: "Plan", icon: <BsStar /> },
  ]

  const handleLogout = () => {
    logoutAction()
    router.push('/')
  }

  return (
    <ul className="mt-12 hidden space-y-6 md:block">
      {
        links.map((link, index) => {
          return <li key={index}><DashBoardNavLink link={link} /></li>
        })
      }
      <Separator />
      <Button onClick={handleLogout} className="flex w-full cursor-pointer items-center rounded-xl bg-blueDarker p-4 text-white hover:bg-blueDark border border-blueDarker hover:border-white">
        <span className="mr-4 text-2xl"> <IoLogOutOutline /> </span> Logout
      </Button>
    </ul>
  )
}