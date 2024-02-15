"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton'


export default function AuthButton({ token }: { token: string | undefined }) {
  const path = usePathname()

  const isLoggedIn = () => {
    return (
      <div className='flex items-center space-x-4'>
        <Link
          href="/dashboard/overview"
          className={cn("rounded-full p-4 bg-white text-blueDark text-base hover:bg-gray hover:text-white transition-colors ease-out duration-700", path.startsWith("/dashboard") && "bg-gray text-white")}
        >
          Dashboard
        </Link>
        <LogoutButton />
      </div>
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
    <div className="absolute right-4 top-4 flex space-x-4 z-10">
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
