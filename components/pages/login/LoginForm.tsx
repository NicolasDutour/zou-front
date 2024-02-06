"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import SubmitButton from './SubmitButton';

import { loginAction } from '@/lib/actions/login-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchemaLogin, TypeFormSchemaLogin } from '@/lib/types/authType';

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeFormSchemaLogin>({
    resolver: zodResolver(FormSchemaLogin),
  });

  const handleLogin = async (formData: TypeFormSchemaLogin) => {
    const response = await loginAction(formData)
    if (response) {
      router.push('/admin/profile')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="space-y-2">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium leading-6 text-black">
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("identifier")}
              id="identifier"
              type="email"
              autoFocus
              className="block w-full rounded-md p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">{errors.identifier?.message}</p>
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
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              className="block w-full rounded-md p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">{errors.password?.message}</p>
          </div>
        </div>
        <div>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
