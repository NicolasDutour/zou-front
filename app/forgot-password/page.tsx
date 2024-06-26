'use client';

import Image from "next/image"
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-64px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full rounded-lg bg-white p-4 shadow-custom md:max-w-lg">
          <Image
            src="/leaf-icon.png"
            alt="leaf-icon"
            width={100}
            height={100}
            aspect-auto="true"
            className="mx-auto w-auto rounded-lg"
            priority
          />
          <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight text-black">
            Mot de passe oublié
          </h2>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </>
  )
}