"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useFormState, useFormStatus } from 'react-dom'

import { registerAction } from '@/lib/auth/register-actions';

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      className="disabled:opacity-40 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {pending ? "Création..." : "Créer un compte"}
    </button>
  )
}

export default function RegisterForm() {
  const router = useRouter()
  const [state, dispatch] = useFormState(registerAction, null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form action={dispatch}>
      <div className="space-y-2">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
            Identifiant
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autoFocus
              className="block w-full rounded-md focus:outline-none p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            {state?.error?.username ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.error.username.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full rounded-md focus:outline-none  p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            {state?.error?.email ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.error.username.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
              Mot de passe
            </label>
          </div>
          <div className="relative mt-2">
            <div className='absolute top-2 right-2 text-xl cursor-pointer text-gray-400' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="block w-full rounded-md focus:outline-none  p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            {state?.error?.password ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.error.password.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
              Confirmation mot de passe
            </label>
          </div>
          <div className="relative mt-2">
            <div className='absolute top-2 right-2 text-xl cursor-pointer text-gray-400' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="block w-full rounded-md focus:outline-none p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            {state?.error?.confirmPassword ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.error.confirmPassword.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
