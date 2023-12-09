"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { useToast } from "@/components/ui/use-toast";

import { TypeFormSchemaProfile, FormSchemaProfile, UserType } from '@/lib/types';
import { setUserInfo } from "@/redux/features/auth/authSlice"
import LoaderButton from "@/components/LoaderButton"

export function ProfileForm({ user, token }: { user: UserType, token: string }) {
  const router = useRouter();
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  dispatch(setUserInfo(user))

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<TypeFormSchemaProfile>({
    resolver: zodResolver(FormSchemaProfile),
  });

  const watchEmail = watch('email')

  useEffect(() => {
    setValue('email', user?.email)
  }, [setValue, user?.email])

  const onHandleUpdateProfile = async (data: z.infer<typeof FormSchemaProfile>) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })
      if (response.status === 200) {
        setIsLoading(false)
        try {
          const userDetails = await response.json()
          dispatch(setUserInfo(userDetails))
          toast({
            title: "Mis à jour avec succés !"
          })
          router.push('/admin')
        } catch (error) {
          console.error('ERROR: ', error);
          toast({
            title: "ERROR:",
            description: error
          })
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
    <form onSubmit={handleSubmit(onHandleUpdateProfile)}>
      <div className="space-y-6 mt-10">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="block p-2 w-full md:w-1/2 focus:outline-none rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <button
            type='submit'
            disabled={isLoading || (watchEmail == user?.email)}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-primary hover:bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {
              isLoading ? (
                <LoaderButton />
              ) : 'Mettre à jour'
            }
          </button>
        </div>
      </div>
    </form>
  )
}