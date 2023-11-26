"use client"

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
import { PlanType } from "@/lib/types"
import { capitalize } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

export default function DialogPlan({ plan }: { plan: PlanType }) {
  const { id, attributes: { title, description, price, access } } = plan
  const user = useSelector((state: any) => state.auth.user)
  const router = useRouter()

  const subscribe = () => {
    if (user) {
      router.push('/payment')
    } else {
      router.push('/login')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className="flex flex-col justify-between p-2 mb-2 shadow-lg rounded-xl border-2 border-primary hover:bg-green-100 text-gray-600">
          <span className="text-primary text-lg"><span className="font-bold text-2xl"> {capitalize(title)} </span> pour <span className="font-bold text-2xl"> {price} €</span> / mois</span> {description}.
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-green-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-center"> {capitalize(title)} </AlertDialogTitle>
          <div className="bg-white rounded-md px-20 py-6">
            <AlertDialogDescription className="text-center text-4xl">
              {price} €
            </AlertDialogDescription>
            <AlertDialogDescription className="text-center text-xl mb-6 mt-4">
              {description}
            </AlertDialogDescription>

            {access.split(',').map((item, index) => {
              return (
                <AlertDialogDescription key={index} className="text-xl">
                  {item}
                </AlertDialogDescription>
              )
            })}

          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white w-full">Close</AlertDialogCancel>
          <AlertDialogAction onClick={subscribe} className="p-2 bg-primary w-full rounded-md text-white">Subscribe</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
