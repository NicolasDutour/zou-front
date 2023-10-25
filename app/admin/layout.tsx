import { SidebarNav } from "@/app/admin/SidebarNav"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profil",
    href: "/admin",
  },
  {
    title: "Votre restaurant",
    href: "/admin/restaurant",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="hidden space-y-6 md:block bg-white">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5 h-[calc(100vh-77px)]">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}