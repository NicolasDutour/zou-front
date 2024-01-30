"use client"

import { GoSignOut } from "react-icons/go";
import { useUserStore } from "@/global-state/store"
import { useRouter } from "next/navigation"

export const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout)
  const router = useRouter()

  const handleSignOut = async () => {
    logout()
    router.push('/')
  }

  return (
    <button
      className="flex items-center w-full justify-start mt-2 p-2 text-white hover:bg-primary bg-secondary text-md rounded-2xl tracking-wider"
      onClick={handleSignOut}>
      <span className="mr-4 text-xl"> <GoSignOut /> </span> Se déconnecter
    </button>
  )
}
