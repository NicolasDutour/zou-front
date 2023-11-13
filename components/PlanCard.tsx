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
    <Card className={cn("bg-base border-none", title === "essential" ? "shadow-custom-green" : "shadow-custom-orange")}>
      <CardHeader className="flex items-center">
        {
          title === "essential" ? (
            <IconContext.Provider value={{ className: "text-secondary text-5xl" }}>
              <div>
                <TfiCup />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ className: "text-primary text-5xl" }}>
              <div>
                <TfiInfinite />
              </div>
            </IconContext.Provider>
          )
        }
        <CardTitle className="text-2xl uppercase"> {title} </CardTitle>
        <CardDescription className="text-base"> {description} </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className={cn("text-4xl text-secondary mb-4 font-bold", title === 'essential' ? "text-secondary" : "text-primary")}> {price} €<span className="text-sm text-black ml-2">/ mois</span></p>
        <p> {included}</p>
      </CardContent>
    </Card>
  )
}
