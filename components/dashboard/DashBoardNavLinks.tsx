"use client"

import { BsStar } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { IoRestaurantOutline } from "react-icons/io5"
import { MdOutlineEmojiFoodBeverage } from "react-icons/md"
import { RxDashboard } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";

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
    <ul className="space-y-6 mt-12 hidden md:block">
      {
        links.map((link, index) => {
          return <li key={index}><DashBoardNavLink link={link} /></li>
        })
      }
      <Separator />
      <Button onClick={handleLogout} className="flex items-center w-full text-white cursor-pointer bg-blueDarker rounded-xl p-4">
        <span className="mr-4 text-2xl"> <IoLogOutOutline /> </span> Logout
      </Button>
    </ul>
  )
}