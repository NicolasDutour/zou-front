"use client"

import { capitalize } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function RedirectLoginButton({ path }: { path: string }) {
  const router = useRouter()

  return (
    <button onClick={() => router.push(`/${path}`)} className="font-semibold leading-6 text-sky-400 hover:text-sky-300">
      {capitalize(path)}
    </button>
  )
}
