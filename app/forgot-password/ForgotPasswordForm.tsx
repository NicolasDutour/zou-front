"use client"

import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"

import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import Loader from '@/components/Loader';
import { FormSchemaForgotPassword, TypeFormSchemaForgotPassword } from '@/lib/types';

export default function ForgotPasswordForm() {
  const dispatch = useDispatch()
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormSchemaForgotPassword>({
    resolver: zodResolver(FormSchemaForgotPassword),
  });

  const onSubmit = async (data: TypeFormSchemaForgotPassword) => {
    try {

    } catch (error) {

    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium leading-6 text-black">
            Email address
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="block w-full rounded-md focus:outline-none p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
          </div>
        </div>
        <div>
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {
              isLoading ? <Loader width={30} height={30} /> : 'Reset password'
            }
          </button>
        </div>
      </div>
    </form>
  )
}
