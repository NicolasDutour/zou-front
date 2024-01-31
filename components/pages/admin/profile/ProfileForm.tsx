"use client"

import Link from "next/link";

import { profileAction } from '@/lib/actions/profile-actions';

import { FormSchemaProfile, TypeFormSchemaProfile, UserType } from '@/lib/types/userType';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function ProfileForm({ user }: { user: UserType }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormSchemaProfile>({
    resolver: zodResolver(FormSchemaProfile),
  });

  const onHandleUpdateProfile = async (payload: z.infer<typeof FormSchemaProfile>) => {
    await profileAction(payload, user?.id)
  }

  return (
    <form onSubmit={handleSubmit(onHandleUpdateProfile)}>
      <div className="space-y-4 rounded-2xl bg-muted p-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
          Email
        </label>
        <div className="mt-2">
          <input
            {...register("email")}
            id="email"
            type="email"
            defaultValue={user?.email}
            className="block w-full rounded-md border-0 bg-white p-2 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 md:w-1/2"
          />
          <p className="mt-2 text-sm text-red-500">{errors.email?.message}</p>
        </div>
        <div className="flex w-full md:w-1/2 lg:h-1/4 gap-2">
          <Link
            href="/admin/profile"
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-medium leading-6 text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Annuler
          </Link>
          <button
            className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </form>
  )
}