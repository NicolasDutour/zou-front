"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton'
import { Button, buttonVariants } from '../ui/button'


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
        <Button
          asChild
          variant="outline"
          className={cn(buttonVariants(), "hover:text-white", path !== "/register" ? "bg-primary" : "bg-white border border-muted text-gray-700")}
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className={cn(buttonVariants(), "hover:text-white", path !== "/login" ? "bg-primary" : "bg-white border border-muted text-gray-700")}
        >
          <Link href="/register">Register</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="absolute right-4 top-4 z-10 flex space-x-4">
      {!path.startsWith("/dashboard") && !path.startsWith("/restaurant") ? token ? isLoggedIn() : isLoggedOut() : null}
      {!path.startsWith("/dashboard") && (path === "/login" || path === "/register") ? (
        <Button
          asChild
          variant="outline"
          className={cn(buttonVariants(), "hover:text-white", path !== "/login" && path !== "/register" ? "bg-primary" : "bg-white border border-muted text-gray-700")}
        >
          <Link href="/">Home</Link>
        </Button>
      ) : null}
    </div>
  )
}

// rounded-full flex items-center justify-center w-28 p-4 text-white text-base hover:bg-gray hover:text-white transition-colors ease-out duration-700

// mt-4 w-full bg-white text-blueDark hover:bg-muted
