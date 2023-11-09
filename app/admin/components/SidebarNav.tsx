"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string,
    icon: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex lg:flex-col shadow-custom rounded-2xl",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted hover:text-secondary text-secondary font-semibold"
              : "hover:bg-muted text-gray-400 hover:text-secondary",
            "justify-start text-md p-6 rounded-none first:rounded-t-md tracking-wider"
          )}
        >
          <span className="mr-4 text-2xl"> {item.icon} </span>  {item.title}
        </Link>
      ))}
    </nav>
  )
}