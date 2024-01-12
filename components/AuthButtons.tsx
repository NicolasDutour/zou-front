"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";

export default function AuthButtons({ token }: { token: string }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const path = usePathname()
  const { toast } = useToast()
  // const token = useSelector((state) => state.auth.token)

  const handleSignOut = async () => {
    dispatch(logout())
    router.push('/')
    toast({
      title: "Vous êtes déconnecté",
      className: "border-primary text-primary"
    })
  }

  return token ? (
    <div>
      <Button className="text-base" onClick={handleSignOut} variant="link">Se déconnecter</Button>
      <Button className="text-base" asChild variant={path.startsWith('/admin') ? 'activeLink' : 'link'}>
        <Link href="/admin">Admin</Link>
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