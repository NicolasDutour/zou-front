"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TfiCup, TfiInfinite } from "react-icons/tfi"

import { PlanType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { IconContext } from "react-icons"

export default function PlanCard({ plan }: { plan: PlanType }) {
  const { id, attributes: { title, description, price, included } } = plan

  return (
    <Card className={cn("bg-base border", title === "essential" ? "shadow-custom-green border-secondary" : "shadow-custom-orange border-primary")}>
      <CardHeader className="flex items-center">
        {
          title === "essential" ? (
            <div className="text-secondary text-6xl pb-6">
              <TfiCup />
            </div>
          ) : (
            <div className="text-primary text-6xl pb-6">
              <TfiInfinite />
            </div>
          )
        }
        <CardTitle className="text-2xl uppercase pt-4"> {title} </CardTitle>
        <CardDescription className="text-lg"> {description} </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className={cn("text-4xl text-secondary mb-4 font-bold", title === 'essential' ? "text-secondary" : "text-primary")}> {price} €<span className="text-sm text-black ml-2">/ mois</span></p>
        <p> {included}</p>
      </CardContent>
    </Card>
  )
}
