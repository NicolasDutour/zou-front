"use client"

import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { registerAction } from '@/lib/actions/register-actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchemaRegister, TypeFormSchemaRegister } from '@/lib/types/authType';
import { useRouter } from 'next/navigation';
import SubmitButton from './SubmitButton';
import { useToast } from '@/components/ui/use-toast';

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeFormSchemaRegister>({
    resolver: zodResolver(FormSchemaRegister),
  });

  const handleRegister = async (formData: TypeFormSchemaRegister) => {
    const response = await registerAction(formData)
    if (response) {
      toast({
        title: "Félicitation !",
        description: "Vous êtes bien enregistré et connecté.",
        className: "border-secondary text-secondary",
      })
      router.push('/admin/profile')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="space-y-2">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
            Prénom
          </label>
          <div className="mt-2">
            <input
              {...register("username")}
              id="username"
              type="text"
              autoFocus
              className="block w-full rounded-md p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">{errors.username?.message}</p>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="block w-full rounded-md p-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">{errors.email?.message}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
              Mot de passe
            </label>
          </div>
          <div className="relative mt-2">
            <div className='absolute right-2 top-2 cursor-pointer text-xl text-gray-400' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              className="block w-full rounded-md p-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">{errors.password?.message}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
              Confirmation mot de passe
            </label>
          </div>
          <div className="relative mt-2">
            <div className='absolute right-2 top-2 cursor-pointer text-xl text-gray-400' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="block w-full rounded-md p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">{errors.confirmPassword?.message}</p>
          </div>
        </div>

        <div>
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
