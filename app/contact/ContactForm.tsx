"use client"

import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"

import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import Loader from '@/components/Loader';

import { TypeFormSchemaContact, FormSchemaContact } from '@/lib/types';

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user)

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue
  } = useForm<TypeFormSchemaContact>({
    resolver: zodResolver(FormSchemaContact),
  });

  useEffect(() => {
    if (user?.email) {
      setValue("email", user?.email)
    }
  }, [setFocus])

  const onSubmit = async (data: TypeFormSchemaContact) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          cache: 'no-cache'
        })
      if (response.status === 200) {
        try {
          const contact = await response.json()

          toast({
            title: "Formulaire envoyé avec succés"
          })
          router.push('/')
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                type="email"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium leading-6 text-white">
              Subject
            </label>
            <div className="mt-2">
              <input
                {...register("subject")}
                id="subject"
                type="text"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.subject?.message}</p>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
            Content
          </label>
          <div className="mt-2">
            <textarea
              {...register("content")}
              id="content"
              rows="7"
              className="resize-none block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            ></textarea>
            <p className="text-red-500 text-sm mt-2">{errors.content?.message}</p>
          </div>
        </div>
        <div className='w-1/3'>
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {
              isLoading ? <Loader width={30} height={30} /> : 'Send'
            }
          </button>
        </div>
      </div>
    </form>
  )
}