"use client"

import { DashboardNavLinkType } from '@/lib/validations'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashBoardNavLink({ link }: { link: DashboardNavLinkType }) {
  const path = usePathname()

  return (
    <Link
      className={cn(
        'flex items-center',
        path.startsWith(link.href) ? "text-white" : "text-gray-500 hover:text-white transition ease-out duration-700"
      )}
      href={link.href}>
      <span className="mr-4 text-2xl"> {link.icon} </span> {link.label}
    </Link>
  )
}
