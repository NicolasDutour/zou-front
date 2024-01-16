import { create } from 'zustand'
import { removeCookie, createCookie } from "@/app/actions"

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
  },
}))