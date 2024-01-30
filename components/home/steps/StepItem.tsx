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
        <CardTitle className="text-black font-medium text-2xl pb-6 text-center"> {!actionButton ? `${index}.` : ''} {title} </CardTitle>
        <div className="text-primary flex flex-col justify-center pb-4">
          {
            icon ? (
              <div className="text-yellow-500 text-8xl"><FaHandsClapping /></div>
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
            <Link className="bg-secondary hover:bg-primary text-white rounded-lg px-6 py-4 z-20" href="/register">Je me lance</Link>
          ) : (
            <CardDescription className="text-base text-center"> {description} </CardDescription>
          )
        }
      </CardHeader>
      {price ? <CardContent className="flex justify-center items-end text-4xl text-secondary font-medium"> {formatCurrency(price)} {!option ? <span className="text-lg text-black ml-2">/ mois</span> : null} </CardContent> : null}
      {option ?
        <CardContent className="text-4xl text-secondary font-medium">
          <ul className="space-y-4">
            <li className="text-left px-4 flex items-center text-sm">
              <span className="text-secondary">
                <FaCheck />
              </span>
              <span className="ml-2"> Saisie des données du restaurant <span className="underline underline-offset-4">offerte</span> </span>
            </li>
            <li className="text-left px-4 flex items-center text-sm">
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
