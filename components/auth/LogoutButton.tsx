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
    <Button onClick={handleLogout} className="flex size-10 items-center justify-center rounded-full bg-white text-base text-blueDark transition-colors duration-700 ease-out hover:bg-gray hover:text-white">
      <span className="text-2xl"> <AiOutlineLogout /> </span>
    </Button>
  )
}
