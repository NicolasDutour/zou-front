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
      className="flex w-full items-center justify-start bg-blueDarker p-2 text-base tracking-wider text-white hover:bg-blueDark lg:mt-2 lg:rounded-2xl"
      onClick={handleSignOut}>
      <span className="mr-4 text-xl"> <GoSignOut /> </span> Se déconnecter
    </button>
  )
}
