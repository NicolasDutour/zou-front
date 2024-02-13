"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"

import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormSchemaForgotPassword, TypeFormSchemaForgotPassword } from '@/lib/definitions/authType';
import LoaderButton from '@/components/LoaderButton';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast()


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
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

      if (response.status === 200) {
        setIsLoading(false)
        try {
          await response.json()
          toast({
            title: "Mot de passe mis à jour",
            className: "border-blueDark text-blueDark"
          })
          router.push('/login')
        } catch (error) {
          console.error('ERROR: ', error);
        }
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Erreur lors de l'analyse de la réponse JSON : ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium leading-6 text-black">
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="block w-full rounded-md p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
            />
            <p className="mt-2 text-sm text-red-500">{errors.email?.message}</p>
          </div>
        </div>
        <div>
          <button
            type='submit'
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-blueDark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueDark disabled:opacity-40"
          >
            {
              isLoading ? (
                <LoaderButton />
              ) : 'Demander un nouveau mot de passe'
            }
          </button>
        </div>
      </div>
    </form>
  )
}
