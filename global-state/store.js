import { create } from 'zustand'
import { removeCookie, createCookie } from "@/lib/actions/cookies-actions"

export const useUserStore = create((set) => ({
  isAuth: false,
  login: (token) => {
    if (token) {
      set({ isAuth: true })
      createCookie('token', token)
    }
  },
  createUser: (token) => {
    if (token) {
      set({ isAuth: true })
      createCookie('token', token)
    }
  },
  logout: () => {
    return (
      set({ isAuth: false }),
      removeCookie('token')
    )
  }
}))

export const useMobileMenuStore = create((set) => ({
  openMobileMenu: false,
  toggleMobileMenu: () => set((state) => ({ openMobileMenu: !state.openMobileMenu })),
}))