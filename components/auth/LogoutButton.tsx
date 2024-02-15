"use client"

import { AiOutlineLogout } from "react-icons/ai";
import { Button } from "../ui/button";
import { logoutAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    logoutAction()
    router.push('/')
  }

  return (
    <Button onClick={handleLogout} className="rounded-full flex items-center justify-center h-10 w-10 bg-white text-blueDark text-base hover:bg-gray hover:text-white transition-colors ease-out duration-700">
      <span className="text-2xl"> <AiOutlineLogout /> </span>
    </Button>
  )
}
