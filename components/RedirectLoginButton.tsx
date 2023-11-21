"use client"

import { capitalize } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function RedirectLoginButton({ path }: { path: string }) {
  const router = useRouter()

  return (
    <button onClick={() => router.push(`/${path}`)} className="font-semibold leading-6 text-secondary hover:text-green-800">
      {path === "register" ? capitalize("S'enregistrer") : "Se connecter"}
    </button>
  )
}
