"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TypeFormSchemaMenu, FormSchemaMenu } from '@/lib/types';
import { cn, truncateFileName } from "@/lib/utils"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";

export function MenuForm({ user, token }) {
  const router = useRouter()
  const { toast } = useToast()
  const [showFileInput, setShowFileInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TypeFormSchemaMenu>({
    resolver: zodResolver(FormSchemaMenu),
  })

  const watchMenuPhoto = watch('menu_photo')

  const onSubmit = async (payload: z.infer<typeof FormSchemaMenu>) => {
    try {
      setIsLoading(true)
      if (payload?.menu_photo?.length > 0) {
        const formData = new FormData()
        formData.append("ref", 'api::restaurant.restaurant')
        formData.append("refId", user?.restaurants[0]?.id)
        formData.append("field", 'menu_photo')
        formData.append("files", payload.menu_photo[0])

        const pictureUpload = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData,
            cache: 'no-cache'
          })

        if (pictureUpload.ok) {
          setIsLoading(false)
          setShowFileInput(false)
          router.refresh()
        }
      }
    } catch (error) {
      setIsLoading(false)
      console.error('ERROR: ', error);
      toast({
        title: "ERROR:",
        description: error
      })
    }
  }

  const imageStyle: React.CSSProperties = {
    objectFit: "cover",
  }

  const updatePhoto = () => {
    setShowFileInput(true)
  }

  const removePhoto = async (photoId: number) => {
    const pictureRemoved = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${photoId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    if (pictureRemoved.ok) {
      setShowFileInput(false)
      router.refresh()
      toast({
        title: "Photo supprimée avec succés !"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="md:w-1/2">
          <label htmlFor="menu_photo" className="block text-sm font-medium leading-6 text-gray-900">
            Menu
          </label>
          {
            user?.restaurants[0]?.menu_photo && !showFileInput ?
              user?.restaurants[0].menu_photo?.mime !== "application/pdf" ? (
                <>
                  <div className="relative border rounded-md h-56">
                    <Image
                      src={user?.restaurants[0]?.menu_photo ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${user?.restaurants[0]?.menu_photo?.url}` : ""}
                      alt={user?.restaurants[0]?.menu_photo?.name}
                      style={imageStyle}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      aspect-auto="true"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-center mt-4">
                    <p className="mr-4">{truncateFileName(user?.restaurants[0].menu_photo.name, 30)}</p>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger className="text-2xl text-red-600">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger><AiOutlineDelete /></TooltipTrigger>
                              <TooltipContent className=" bg-white text-red-600 text-base border border-primary">
                                <p>Supprimer photo</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Voulez vous supprimer définitivement cette photo ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette suppression est permanente. Vous ne pourrez pas revenir en arrière.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 rounded-md text-white" onClick={() => removePhoto(user?.restaurants[0].menu_photo.id)}>Supprimer</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-2xl text-primary" onClick={updatePhoto}>
                              <BiEditAlt />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className=" bg-white text-primary text-base border border-primary">
                            <p>Mise à jour photo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <div><Link className="text-primary underline underline-offset-4" href={`${process.env.NEXT_PUBLIC_STRAPI_URL}${user?.restaurants[0]?.menu_photo?.url}`} target="_blank"> {truncateFileName(user?.restaurants[0]?.menu_photo?.name, 30)} </Link></div>
                  <div className="flex items-center mt-4">
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger className="text-2xl text-red-600">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger><AiOutlineDelete /></TooltipTrigger>
                              <TooltipContent className=" bg-white text-red-600 text-base border border-primary">
                                <p>Supprimer fichier pdf</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Voulez vous supprimer définitivement ce fichier pdf ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette suppression est permanente. Vous ne pourrez pas revenir en arrière.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 rounded-md text-white" onClick={() => removePhoto(user?.restaurants[0].menu_photo.id)}>Supprimer</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-2xl text-primary" onClick={updatePhoto}>
                              <BiEditAlt />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className=" bg-white text-primary text-base border border-primary">
                            <p>Mise à jour fichier pdf</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <>
                    <input
                      {...register("menu_photo")}
                      id="menu_photo"
                      type="file"
                      className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-seconbg-secondary sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500 text-sm mt-2">{errors.menu_photo?.message}</p>
                    <div className="flex flex-col md:flex-row items-center w-full md:w-1/2 gap-2 mt-4">
                      <button
                        type='submit'
                        disabled={
                          isLoading
                        }
                        className={cn("disabled:opacity-40 w-full rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        )}
                      >
                        Ajouter
                      </button>
                    </div>
                  </>
                </div>
              )
          }
        </div>
      </div>
    </form >
  )
}