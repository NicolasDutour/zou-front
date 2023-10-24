import Image from "next/image"
import RegisterForm from "./RegisterForm"
import RedirectLoginButton from '@/components/RedirectLoginButton';

export default function Register() {
  return (
    <div className="flex h-[calc(100vh-77px)] flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/leaf-icon.png"
          alt="leaf-icon"
          width={100}
          height={100}
          aspect-auto="true"
          className="rounded-lg mx-auto w-auto"
          priority
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Register
        </h2>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-400">
          Already a member?{' '}
          <RedirectLoginButton path="login" />
        </p>
      </div>
    </div>
  )
}