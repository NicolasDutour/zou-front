"use client"

import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

import { useToast } from "@/components/ui/use-toast"
import { signUp } from '@/redux/features/auth/authSlice'

import { TypeFormSchemaRegister, FormSchemaRegister } from '@/lib/types';
import LoaderButton from '@/components/LoaderButton';

export default function RegisterForm() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
          body: JSON.stringify(userWithoutConfirmPassword)
        })
      if (response.status === 200) {
        setIsLoading(false)
        try {
          const userDetails = await response.json()
          dispatch(signUp(userDetails))
          toast({
            title: "Vous êtes bien enregistré et connecté",
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
            if (errorMessage === "Email or Username are already taken") {
              title = "Erreur d'authentification"
              errorMessage = "Email ou identifiant déjà enregistré"
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
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
            Identifiant
          </label>
          <div className="mt-2">
            <input
              {...register("username")}
              id="username"
              type="text"
              className="block w-full rounded-md focus:outline-none p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.username?.message}</p>
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
              className="block w-full rounded-md focus:outline-none  p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
              Mot de passe
            </label>
          </div>
          <div className="relative mt-2">
            <div className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              className="block w-full rounded-md focus:outline-none  p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
              Confirmation mot de passe
            </label>
          </div>
          <div className="relative mt-2">
            <div className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} </div>
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="block w-full rounded-md focus:outline-none p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.confirmPassword?.message}</p>
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
              ) : "S'enregistrer"
            }
          </button>
        </div>
      </div>
    </form>
  )
}
