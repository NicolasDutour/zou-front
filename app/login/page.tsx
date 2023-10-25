import Image from "next/image"
import RedirectLoginButton from '@/components/RedirectLoginButton'
import LoginForm from './LoginForm'
import LoginGoogleButton from "@/components/LoginGoogleButton"

export default function Login() {
  return (
    <div className="flex h-[calc(100vh-77px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/leaf-icon.png"
          alt="leaf-icon"
          width={50}
          height={50}
          aspect-auto="true"
          className="rounded-lg mx-auto w-auto"
          priority
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Login to your account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className='text-white text-center mx-4 mb-4'>with</p>

        <LoginGoogleButton />

        <p className='text-white text-center mx-4 mb-4'>or</p>
        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-400">
          Not a member?{' '}
          <RedirectLoginButton path="register" />
        </p>
      </div>
    </div>
  )
}