import Image from "next/image"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-3xl text-center">
        <div className="relative h-64 w-64 mb-6">
          <Image
            src="/email-sent.png"
            alt="email-sent"
            fill
            aspect-auto="true"
            priority
          />
        </div>
        <h1 className="text-2xl font-medium">Check your email</h1>
        <p className="text-gray-400 mt-6">We've sent a verification link to</p>
        <p className="text-gray-600">email link</p>
      </div>
    </div>
  )
}
