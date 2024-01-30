"use client"

import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LuClock3 } from "react-icons/lu";

import { StepType } from "@/lib/types/homeType"
import { formatCurrency } from "@/lib/utils";
import { FaCheck, FaHandsClapping } from "react-icons/fa6";
import Link from "next/link";

export default function StepItem({ step, index }: { step: StepType, index: number }) {
  const { title, description, time, price, icon, option, actionButton } = step

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex items-center">
        <CardTitle className="pb-6 text-center text-2xl font-medium text-black"> {!actionButton ? `${index}.` : ''} {title} </CardTitle>
        <div className="flex flex-col justify-center pb-4 text-primary">
          {
            icon ? (
              <div className="text-8xl text-yellow-500"><FaHandsClapping /></div>
            ) : actionButton ? null : (
              <div className="flex items-end">
                <span className="mr-4 text-4xl"><LuClock3 /></span>
                <p className="text-lg"> {time} min.</p>
              </div>
            )
          }
        </div>
        {
          actionButton ? (
            <Link className="z-20 rounded-lg bg-secondary px-6 py-4 text-white hover:bg-primary" href="/register">Je me lance</Link>
          ) : (
            <CardDescription className="text-center text-base"> {description} </CardDescription>
          )
        }
      </CardHeader>
      {price ? <CardContent className="flex items-end justify-center text-4xl font-medium text-secondary"> {formatCurrency(price)} {!option ? <span className="ml-2 text-lg text-black">/ mois</span> : null} </CardContent> : null}
      {option ?
        <CardContent className="text-4xl font-medium text-secondary">
          <ul className="space-y-4">
            <li className="flex items-center px-4 text-left text-sm">
              <span className="text-secondary">
                <FaCheck />
              </span>
              <span className="ml-2"> Saisie des données du restaurant <span className="underline underline-offset-4">offerte</span> </span>
            </li>
            <li className="flex items-center px-4 text-left text-sm">
              <span className="text-secondary">
                <FaCheck />
              </span>
              <span className="ml-2"> Saisie de chaque produit facturé <span className="underline underline-offset-4"> {formatCurrency(2)} </span> </span>
            </li>
          </ul>

        </CardContent> : null}
    </Card>
  )
}
