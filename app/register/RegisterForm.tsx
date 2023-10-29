"use client"

import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"

import { useToast } from "@/components/ui/use-toast"
import Loader from '@/components/Loader';
import { signUp } from '@/redux/features/auth/authSlice'

import { TypeFormSchemaRegister, FormSchemaRegister } from '@/lib/types';

export default function RegisterForm() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<TypeFormSchemaRegister>({
    resolver: zodResolver(FormSchemaRegister),
  });

  useEffect(() => {
    setFocus("username");
  }, [setFocus])


  const onSubmit = async (data: TypeFormSchemaRegister) => {
    const { confirmPassword, ...userWithoutConfirmPassword } = data;

    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userWithoutConfirmPassword),
          cache: 'no-cache'
        })
      if (response.status === 200) {
        try {
          const userDetails = await response.json()
          dispatch(signUp(userDetails))
          toast({
            title: "Vous êtes bien enregistré et connecté"
          })
          router.push('/admin')
        } catch (error) {
          console.error('ERROR: ', error);
        }
      } else if (response.status === 400) {
        setIsLoading(false)
        try {
          const errorResponse = JSON.parse(await response.text());
          if (errorResponse.error && errorResponse.error.message) {
            const errorMessage = errorResponse.error.message;
            toast({
              title: "Erreur 400",
              description: errorMessage,
            })
            console.error("Erreur 400 : ", errorMessage);
          } else {
            toast({
              title: "Réponse 400 sans message d'erreur valide:",
              description: errorResponse,
            })
            console.error("Réponse 400 sans message d'erreur valide : ", errorResponse);
          }
        } catch (error) {
          toast({
            title: "Erreur lors de l'analyse de la réponse JSON",
            description: error,
          })
          console.error("Erreur lors de l'analyse de la réponse JSON : ", error);
        }
      }
    } catch (error) {
      setIsLoading(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code: ", errorCode);
      console.log("Error message: ", errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
            Username
          </label>
          <div className="mt-2">
            <input
              {...register("username")}
              id="username"
              type="text"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.username?.message}</p>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email address
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              {...register("password")}
              id="password"
              type="password"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Password Confirm
            </label>
          </div>
          <div className="mt-2">
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.confirmPassword?.message}</p>
          </div>
        </div>

        <div>
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {
              isLoading ? <Loader width={30} height={30} /> : 'Register'
            }
          </button>
        </div>
      </div>
    </form>
  )
}
