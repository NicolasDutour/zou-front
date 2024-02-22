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
    <Button onClick={handleLogout} className="rounded-full transition-colors duration-700 ease-out">
      <span className="text-2xl"> <AiOutlineLogout /> </span>
      <span className="ml-4 text-sm">Logout</span>
    </Button>
  )
}
