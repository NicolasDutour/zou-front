"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex lg:flex-col bg-gray-900 h-[calc(100vh-77px)] fixed lg:w-1/5",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "link" }),
            pathname === item.href
              ? "bg-gray-700 hover:bg-gray-700"
              : "hover:bg-gray-700",
            "justify-start rounded-none text-white px-8 py-6 text-base hover:text-white"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}