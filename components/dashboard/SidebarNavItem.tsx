"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { SidebarNavItemType } from '@/lib/validations'
import { useMobileMenuStore } from '@/global-state/store'

export const SidebarNavItem = ({ item, mobile }: { item: SidebarNavItemType, mobile?: boolean }) => {
  const pathname = usePathname()
  const toggleMenu = useMobileMenuStore(state => state.toggleMobileMenu)

  const handleMobileMenu = () => {
    if (mobile) {
      toggleMenu()
    }
  }

  return (
    <Link
      href={item.href}
      onClick={handleMobileMenu}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        pathname.startsWith(item.href)
          ? "hover:text-blueDark text-blueDark font-semibold"
          : "text-gray-600 hover:text-blueDark",
        "justify-start  hover:bg-blue-300 bg-muted text-md p-6 lg:last-of-type:rounded-b-2xl rounded-none lg:first:rounded-t-2xl tracking-wider lg:mb-2"
      )}
    >
      <span className="mr-4 text-2xl"> {item.icon} </span> {item.title}
    </Link>
  )
}
