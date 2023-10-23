"use client"

// import { register } from '../actions';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TypeFormSchemaLogin, FormSchemaLogin } from '@/lib/types';
import { useState } from 'react';
import Loader from '@/components/Loader';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormSchemaLogin>({
    resolver: zodResolver(FormSchemaLogin),
  });


  const onSubmit = async (data: TypeFormSchemaLogin) => {
    try {
      setIsLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (userCredential?.user?.accessToken) {
        toast({
          title: "Vous êtes connnecté"
        })
        router.push('/admin')
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
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email address
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
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
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>
          </div>
        </div>
        <div>
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            {
              isLoading ? <Loader width={30} height={30} /> : 'Login'
            }
          </button>
        </div>
      </div>
    </form>
  )
}
