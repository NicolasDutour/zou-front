"use client"

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/global-state/store"

export default function AuthButtons({ token }: { token: string }) {
  const router = useRouter()
  const path = usePathname()
  const { toast } = useToast()
  const logout = useUserStore((state) => state.logout)
  const isAuth = useUserStore(state => state.isAuth)

  const handleSignOut = async () => {
    logout()
    router.push('/')
    toast({
      title: "Vous êtes déconnecté",
      className: "border-primary text-primary"
    })
  }

  useEffect(() => {
    if (token) {
      useUserStore.setState({ isAuth: true });
    }
  }, [token]);

  return isAuth ? (
    <div>
      <Button className="text-base" onClick={handleSignOut} variant="link">Se déconnecter</Button>
      <Button className="text-base" asChild variant={path.startsWith('/admin') ? 'activeLink' : 'link'}>
        <Link href="/admin/profile">Admin</Link>
      </Button>
    </div>
  ) : (
    <div>
      <Button className="text-base" asChild variant={path === '/login' ? 'activeLink' : 'link'}>
        <Link href="/login">Connexion</Link>
      </Button>
      <Button className="text-base" asChild variant={path === '/register' ? 'activeLink' : 'link'}>
        <Link href="/register">Inscription</Link>
      </Button>
    </div>
  )
}