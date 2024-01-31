"use client"

import { useMobileMenuStore } from '@/global-state/store'
import { SidebarNav } from './SidebarNav'
import { SidebarNavMobile } from './SidebarNavMobile'
import { SidebarNavItemType } from '@/lib/types'

export const SideBar = ({ items }: { items: SidebarNavItemType[] }) => {
  const openMenu = useMobileMenuStore((state) => state.openMobileMenu)
  return (
    <div>
      {openMenu && <SidebarNavMobile items={items} />}
      {!openMenu && <SidebarNav items={items} />}
    </div>
  )
}
