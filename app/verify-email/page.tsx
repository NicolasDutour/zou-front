import { cookies } from "next/headers"
import Image from "next/image"

export default function VerifyEmailPage() {
  const cookieStore = cookies()
  const email = cookieStore.get('email')?.value

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-3xl text-center">
        <div className="relative mb-6 size-64">
          <Image
            src="/email-sent.png"
            alt="email-sent"
            fill
            aspect-auto="true"
            priority
          />
        </div>
        <h1 className="text-2xl font-medium">Check your email</h1>
        <p className="mt-6 text-gray-400">We've sent a verification link to</p>
        <p className="text-gray-600"> {email} </p>
      </div>
    </div>
  )
}
