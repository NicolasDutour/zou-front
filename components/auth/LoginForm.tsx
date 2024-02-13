'use client';

import { IoKeyOutline } from "react-icons/io5";
import { HiAtSymbol } from "react-icons/hi2";
import { lusitana } from '@/lib/fonts';
import { useForm } from "react-hook-form";
import { FormSchemaLogin, TypeFormSchemaLogin } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { loginAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<TypeFormSchemaLogin>({
    defaultValues: {
      identifier: "",
      password: ""
    },
    resolver: zodResolver(FormSchemaLogin),
    mode: "onTouched"
  })

  const { register, handleSubmit, reset, formState } = form
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])


  const onSubmit = async (formData: TypeFormSchemaLogin) => {
    const response = await loginAction(formData)
    if (response?.error === "Invalid identifier or password") {
      toast({
        title: "Erreur d'identification",
        description: "Identifiant ou mot de passe invalide.",
        className: "border-destructive text-destructive",
      })
    }

    if (response?.user) {
      toast({
        title: "Félicitation !",
        description: "Vous êtes bien connecté.",
        className: "border-blue text-blue",
      })
      router.push('/dashboard/profile')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex-1">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-center`}>
          Login
        </h1>
        <div className="w-full">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-blueDarker"
              htmlFor="identifier"
            >
              Email
            </label>
            <div className="relative">
              <div className='absolute left-2 top-2 cursor-pointer text-xl text-gray-400'> <HiAtSymbol /> </div>
              <input
                className="block w-full rounded-md p-1.5 pl-8 text-black shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
                {...register("identifier")}
                id="identifier"
                type="email"
              />
              <p className="mt-2 text-sm text-error">{errors.identifier?.message}</p>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium leading-6 text-blueDarker"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <div className='absolute left-2 top-2 cursor-pointer text-xl text-gray-400'> <IoKeyOutline /> </div>
              <div className='absolute right-2 top-2 cursor-pointer text-xl text-gray-400' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />} </div>
              <input
                className="block w-full rounded-md p-1.5 pl-8 text-black shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
              />
              <p className="mt-2 text-sm text-error">{errors.password?.message}</p>
            </div>
          </div>
          <Button disabled={!isDirty || !isValid || isSubmitting} className="mt-4 w-full bg-blueDark text-white text-center">
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#8c9fb9" strokeWidth="4"></circle>
                  <path fill="#135A9A" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Loading...</p>
              </>
            ) : "Login"}
          </Button>
        </div>
      </div>
    </form>
  );
}