"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation"
import { TypeFormSchemaProfile, FormSchemaProfile } from '@/lib/types';
import Loader from "@/components/Loader"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  // const router = useRouter();
  // const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    getValues
  } = useForm<TypeFormSchemaProfile>({
    resolver: zodResolver(FormSchemaProfile),
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setValue('email', user.email)
        setFocus("email");
      }
    });
  }, [setFocus])

  const onHandleUpdateProfile = async (data: z.infer<typeof FormSchemaProfile>) => {
    // console.log("data: ", data);

    // try {
    //   setIsLoading(true)
    //   const userCredential = await updateProfile(auth?.currentUser, { email: data.email })
    //   console.log("email updated: ", userCredential);


    //   if (userCredential?.user?.accessToken) {
    //     toast({
    //       title: "Votre profil a été modifié avec succés"
    //     })
    //     router.refresh()
    //   }
    // } catch (error) {
    //   setIsLoading(false)
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log("Error code: ", errorCode);
    //   console.log("Error message: ", errorMessage);
    // }
  }


  return (
    <form onSubmit={handleSubmit(onHandleUpdateProfile)}>
      <div className="space-y-6 mt-10">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              type="email"
              className="block p-2 w-1/2 rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
          </div>
        </div>
        <div>
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 flex w-1/2 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {
              isLoading ? <Loader width={30} height={30} /> : 'Mettre à jour'
            }
          </button>
        </div>
      </div>
    </form>
  )
}