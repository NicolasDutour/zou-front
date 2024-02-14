"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormSchemaProfile, TypeFormSchemaProfile , UserType } from "@/lib/definitions";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { HiAtSymbol } from "react-icons/hi2";
import { profileAction } from "@/lib/actions";

export function ProfileForm({ user }: { user: UserType }) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<TypeFormSchemaProfile>({
    defaultValues: {
      email: user.email,
    },
    resolver: zodResolver(FormSchemaProfile),
    mode: "onTouched"
  })

  const { register, handleSubmit, reset, formState } = form
  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const onSubmit = async (formData: TypeFormSchemaProfile) => {
    const response = await profileAction(formData, user?.id)
    if (response) {
      router.push('/dashboard/profile')
      toast({
        title: "Félicitation !",
        description: "Profil mis à jour.",
        className: "border-blue text-blue",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="w-full rounded-2xl bg-white p-6 lg:w-1/2">
        <label
          className="block text-sm font-medium leading-6 text-blueDarker"
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative">
          <div className='absolute left-2 top-2 cursor-pointer text-xl text-gray-400'> <HiAtSymbol /> </div>
          <input
            className="block w-full rounded-md p-1.5 pl-8 text-blueDark shadow-sm ring-1 ring-inset ring-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray sm:text-sm sm:leading-6"
            {...register("email")}
            id="email"
            type="email"
          />
          <p className="mt-2 text-sm text-error">{errors.email?.message}</p>
        </div>
      </div>
      <div className="flex w-full gap-4 md:w-1/2">
        <Link
          href="/dashboard/profile"
          passHref
          legacyBehavior
        >
          <Button className="mt-4 w-full bg-white text-center text-blueDark ring-1 ring-inset ring-gray">
            Annuler
          </Button>
        </Link>

        <Button disabled={!isDirty || !isValid || isSubmitting} className="mt-4 w-full border border-white bg-blueDark text-center text-white">
          {isSubmitting ? (
            <>
              <svg className="-ml-1 mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#8c9fb9" strokeWidth="4"></circle>
                <path fill="#135A9A" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Loading...</p>
            </>
          ) : "Mettre à jour"}
        </Button>
      </div>
    </form>
  )
}