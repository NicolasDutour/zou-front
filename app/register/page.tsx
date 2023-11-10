import Image from "next/image"

import RedirectLoginButton from '@/components/RedirectLoginButton';
import RegisterForm from "./RegisterForm"

export default function Register() {
  return (
    <div className="flex bg-base h-[calc(100vh-77px)] flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="mx-auto w-full md:max-w-lg bg-white p-4 rounded-lg shadow-custom">
        <Image
          src="/leaf-icon.png"
          alt="leaf-icon"
          width={50}
          height={50}
          aspect-auto="true"
          className="rounded-lg mx-auto w-auto"
          priority
        />
        <h2 className="mt-6 text-center text-2xl font-medium leading-9 tracking-tight">
          Register
        </h2>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm />
          <p className="mt-4 text-center text-sm text-gray-400">
            Already a member?{' '}
            <RedirectLoginButton path="login" />
          </p>
        </div>
      </div>
    </div>
  )
}