"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoHomeOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

export default function AuthButton({ token }: { token: string | undefined }) {
  const path = usePathname()

  const isLoggedIn = () => {
    return (
      <Link
        href="/dashboard/overview"
        className={cn("rounded-full p-4 bg-white text-blueDark text-base hover:bg-gray hover:text-white transition-colors ease-out duration-700", path.startsWith("/dashboard") && "bg-gray text-white")}
      >
        Dashboard
      </Link>
    )
  }

  const isLoggedOut = () => {
    return (
      <div className='flex space-x-4'>
        <Link
          href="/login"
          className={cn("rounded-full flex items-center justify-center w-28 p-4 bg-white text-blueDark text-base hover:bg-gray hover:text-white transition-colors ease-out duration-700",
            path !== "/register" ? "bg-gray text-white" : "bg-white")}
        >
          Login
        </Link>
        <Link
          href="/register"
          className={cn("rounded-full flex items-center justify-center w-28 p-4 bg-white text-blueDark text-base hover:bg-gray hover:text-white transition-colors ease-out duration-700",
            path !== "/login" ? "bg-gray text-white" : "bg-white")}
        >
          Register
        </Link>
      </div>
    )
  }

  return (
    <div className="absolute top-8 right-4 space-x-4 flex">
      {!path.startsWith("/dashboard") ? token ? isLoggedIn() : isLoggedOut() : null}
      {!path.startsWith("/dashboard") && (path === "/login" || path === "/register") ? (
        <Link
          href="/"
          className={cn("rounded-full flex items-center justify-center w-28 p-4 bg-white text-blueDark text-base hover:bg-gray hover:text-white transition-colors ease-out duration-700",
            path !== "/login" && path !== "/register" ? "bg-gray text-white" : "bg-white")}
        >
          Home
        </Link>
      ) : null}
    </div>
  )
}
