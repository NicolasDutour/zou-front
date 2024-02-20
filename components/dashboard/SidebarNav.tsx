import { SidebarNavItemType } from "@/lib/validations"
import { SidebarNavItem } from "./SidebarNavItem"
import { LogoutButton } from "@/components/home/LogoutButton"

export function SidebarNav({ items }: { items: SidebarNavItemType[] }) {
  return (
    <nav className="hidden w-full flex-col bg-white lg:flex">
      {items.map((item, index) => {
        return (
          <SidebarNavItem key={index} item={item} />
        )
      })}
      <LogoutButton />
    </nav>
  )
}