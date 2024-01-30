"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useFormState, useFormStatus } from 'react-dom'

import { loginAction } from '@/lib/actions/login-actions';

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"
    >
      {pending ? "Connexion..." : "Se connecter"}
    </button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, dispatch] = useFormState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={dispatch}>
      <div className="space-y-2">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium leading-6 text-black">
            Email
          </label>
          <div className="mt-2">
            <input
              id="identifier"
              name="identifier"
              type="email"
              autoFocus
              className="block w-full rounded-md p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            {state?.error?.identifier ? (
              <div
                id="customer-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.error.identifier.map((error: string) => (
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
            <div className="text-sm">
              <div onClick={() => router.push('/forgot-password')} className="cursor-pointer font-semibold text-primary hover:text-secondary">
                Mot de passe oublié ?
              </div>
            </div>
          </div>
          <div className="relative mt-2">
            <div className='absolute right-2 top-2 cursor-pointer text-xl text-gray-400' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="block w-full rounded-md p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
          {SubmitButton()}
        </div>
        <div className="flex h-8 items-end space-x-1">
          {state?.message ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              <p>{state.message === "Invalid identifier or password" ? "Identifiant ou mot de passe incorrect" : state.message}</p>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  )
}
