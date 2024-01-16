"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod"

import { useToast } from "@/components/ui/use-toast"
import LoaderButton from '@/components/LoaderButton';

import { TypeFormSchemaLogin, FormSchemaLogin } from '@/lib/types';
import { useUserStore } from '@/zustand/store';

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const login = useUserStore(state => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<TypeFormSchemaLogin>({
    resolver: zodResolver(FormSchemaLogin),
  });

  useEffect(() => {
    setFocus("identifier");
  }, [setFocus])

  const onSubmit = async (data: TypeFormSchemaLogin) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
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
          const userDetails = await response.json()
          login(userDetails.jwt)
          toast({
            title: "Vous êtes bien connecté",
            className: "border-primary text-primary"
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
            let errorMessage = errorResponse.error.message;
            let title = "Erreur 400"
            if (errorMessage === "Invalid identifier or password") {
              title = "Erreur d'authentification"
              errorMessage = "Email ou mot de passe invalide"
            }
            toast({
              title,
              description: errorMessage,
              className: "border-destructive text-destructive"
            })
            console.error("Erreur 400 : ", errorMessage);
          } else {
            toast({
              title: "Réponse 400 sans message d'erreur valide:",
              description: errorResponse,
              className: "border-destructive text-destructive"
            })
            console.error("Réponse 400 sans message d'erreur valide : ", errorResponse);
          }
        } catch (error) {
          console.error("Erreur lors de l'analyse de la réponse JSON : ", error);
        }
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error message: ", error);
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
              {...register("identifier")}
              id="identifier"
              type="email"
              className="block w-full rounded-md focus:outline-none p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.identifier?.message}</p>
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
            <div className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              className="block w-full rounded-md focus:outline-none p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
          </div>
        </div>
        <div>
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {
              isLoading ? (
                <LoaderButton />
              ) : 'Se connecter'
            }
          </button>
        </div>
      </div>
    </form>
  )
}
