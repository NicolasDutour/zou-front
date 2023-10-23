"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '@/firebase';
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"

export default function AuthButtons() {
  const router = useRouter()
  const path = usePathname()
  const [token, setToken] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.accessToken) {
        setToken(user?.accessToken)
      } else {
        setToken('')
      }
    });
  }, [])


  const handleSignOut = async () => {
    try {
      signOut(auth)
      toast({
        title: "Vous êtes déconnnecté"
      })
      router.push('/')
    } catch (error) {
      console.log("Error: ", error);
    }
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