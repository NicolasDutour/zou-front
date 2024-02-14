'use client';

import { IoKeyOutline } from "react-icons/io5";
import { HiAtSymbol } from "react-icons/hi2";
import { lusitana } from '@/lib/fonts';
import { useForm } from "react-hook-form";
import { FormSchemaRegister, TypeFormSchemaRegister } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { registerAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<TypeFormSchemaRegister>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    resolver: zodResolver(FormSchemaRegister),
    mode: "onTouched"
  })

  const { register, handleSubmit, reset, formState } = form
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])


  const onSubmit = async (formData: TypeFormSchemaRegister) => {
    const response = await registerAction(formData)

    if (response?.user) {
      toast({
        title: "Félicitation !",
        description: "Vous êtes bien enregistré et connecté.",
        className: "border-blue text-blue",
      })
      router.push('/dashboard/profile')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex-1">
        <h1 className={`${lusitana.className} mb-3 text-center text-2xl`}>
          Register
        </h1>
        <div className="w-full">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-blueDarker"
              htmlFor="username"
            >
              Prénom
            </label>
            <div className="relative">
              <div className='absolute left-2 top-2 cursor-pointer text-xl text-gray-400'> <CiUser /> </div>
              <input
                className="block w-full rounded-md p-1.5 pl-8 text-black shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
                {...register("username")}
                id="username"
                type="text"
              />
              <p className="mt-2 text-sm text-error">{errors.username?.message}</p>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-blueDarker"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <div className='absolute left-2 top-2 cursor-pointer text-xl text-gray-400'> <HiAtSymbol /> </div>
              <input
                className="block w-full rounded-md p-1.5 pl-8 text-black shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
                {...register("email")}
                id="email"
                type="email"
              />
              <p className="mt-2 text-sm text-error">{errors.email?.message}</p>
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

          <div className="mt-4">
            <label
              className="block text-sm font-medium leading-6 text-blueDarker"
              htmlFor="confirmPassword"
            >
              confirmPassword
            </label>
            <div className="relative">
              <div className='absolute left-2 top-2 cursor-pointer text-xl text-gray-400'> <IoKeyOutline /> </div>
              <div className='absolute right-2 top-2 cursor-pointer text-xl text-gray-400' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} </div>
              <input
                className="block w-full rounded-md p-1.5 pl-8 text-black shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "confirmPassword"}
              />
              <p className="mt-2 text-sm text-error">{errors.confirmPassword?.message}</p>
            </div>
          </div>

          <Button disabled={!isDirty || !isValid || isSubmitting} className="mt-4 w-full bg-blueDark text-center text-white">
            {isSubmitting ? (
              <>
                <svg className="-ml-1 mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#8c9fb9" strokeWidth="4"></circle>
                  <path fill="#135A9A" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Loading...</p>
              </>
            ) : "Register"}
          </Button>
        </div>
      </div>
    </form>
  );
}