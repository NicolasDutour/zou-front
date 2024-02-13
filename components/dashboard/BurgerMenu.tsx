"use client"

import { RxHamburgerMenu } from "react-icons/rx";
import { useMobileMenuStore } from "@/global-state/store"

export const BurgerMenu = () => {
  const toggleMenu = useMobileMenuStore((state) => state.toggleMobileMenu)

  return (
    <div className="text-3xl font-medium" onClick={toggleMenu}>
      <RxHamburgerMenu />
    </div>
  )
}
