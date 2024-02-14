"use client"

import { useRouter } from 'next/navigation'

export default function RedirectLoginRegisterButton({ path }: { path: string }) {
  const router = useRouter()

  return (
    <button onClick={() => router.push(`/${path}`)} className="font-semibold leading-6 text-blueDark hover:text-blueDarker">
      {path === "register" ? "Register" : "Login"}
    </button>
  )
}
