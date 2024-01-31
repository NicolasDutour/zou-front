import { SidebarNavItemType } from "@/lib/types"
import { SidebarNavItem } from "./SidebarNavItem"
import { LogoutButton } from "@/components/home/LogoutButton"

export function SidebarNavMobile({ items }: { items: SidebarNavItemType[] }) {
  return (
    <nav className="fixed right-0 top-[60px] flex size-full flex-col overflow-auto bg-white lg:hidden">
      {items.map((item, index) => {
        return (
          <SidebarNavItem key={index} item={item} mobile={true} />
        )
      })}
      <LogoutButton />
    </nav>
  )
}