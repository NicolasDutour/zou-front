"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";

export default function AuthButtons() {
  const dispatch = useDispatch()
  const router = useRouter()
  const path = usePathname()
  const { toast } = useToast()
  const token = useSelector((state) => state.auth.token)

  const handleSignOut = async () => {
    dispatch(logout)
    router.push('/')
    toast({
      title: "Vous êtes déconnecté"
    })
  }

  return token ? (
    <div>
      <Button onClick={handleSignOut} variant="link">Logout</Button>
      <Button asChild variant={path.startsWith('/admin') ? 'activeLink' : 'link'}>
        <Link href="/admin">Admin</Link>
      </Button>
    </div>
  ) : (
    <div>
      <Button asChild variant={path === '/login' ? 'activeLink' : 'link'}>
        <Link href="/login">Connexion</Link>
      </Button>
      <Button asChild variant={path === '/register' ? 'activeLink' : 'link'}>
        <Link href="/register">Inscription</Link>
      </Button>
    </div>
  )
}