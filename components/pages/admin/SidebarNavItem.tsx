"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { SidebarNavItemType } from '@/lib/types'

export const SidebarNavItem = ({ item }: { item: SidebarNavItemType }) => {
  const pathname = usePathname()

  return (
    <Link
      href={item.href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        pathname.startsWith(item.href)
          ? "hover:text-primary text-primary font-semibold"
          : "text-gray-600 hover:text-primary",
        "justify-start  hover:bg-blue-300 bg-muted text-md p-6 md:last-of-type:rounded-b-2xl rounded-none first:rounded-t-2xl tracking-wider mb-2"
      )}
    >
      <span className="mr-4 text-2xl"> {item.icon} </span> {item.title}
    </Link>
  )
}
