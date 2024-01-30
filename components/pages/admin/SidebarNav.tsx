import { SidebarNavItemType } from "@/lib/types"
import { SidebarNavItem } from "./SidebarNavItem"

export function SidebarNav({ items }: { items: SidebarNavItemType[] }) {
  return (
    <nav className="flex flex-col">
      {items.map((item, index) => {
        return (
          <SidebarNavItem key={index} item={item} />
        )
      })}
    </nav>
  )
}