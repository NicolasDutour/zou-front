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
      className="mt-2 flex w-full items-center justify-start rounded-2xl bg-secondary p-2 text-base tracking-wider text-white hover:bg-primary"
      onClick={handleSignOut}>
      <span className="mr-4 text-xl"> <GoSignOut /> </span> Se déconnecter
    </button>
  )
}
