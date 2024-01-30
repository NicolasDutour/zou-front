"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { PlanType } from "@/lib/types/homeType"
import { cn } from "@/lib/utils"
import { CardHeaderIcon } from "./CardHeaderIcon"
import { PlanCardContent } from "./PlanCardContent"

export default function PlanItem({ plan }: { plan: PlanType }) {
  const { attributes: { title, description, price, access, wedoforyou, youmanage } } = plan

  return (
    <Card className={cn("bg-base flex flex-col justify-between border w-full md:w-1/3 h-[500px]", title === "premium" ? "shadow-custom-blue border-primary" : "shadow-custom-blue-light border-primary")}>
      <CardHeader className="flex items-center">
        <CardHeaderIcon title={title} />
        <CardTitle className="pb-6 text-2xl uppercase"> {title} </CardTitle>
        <CardDescription className="text-lg">
          <p className="text-center text-xl text-black">{description}</p>
          <PlanCardContent title={title} access={access} wedoforyou={wedoforyou} youmanage={youmanage} />
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className={cn("text-4xl text-primary mb-4 font-bold", title === 'premium' ? "text-secondary" : "text-primary")}> {price} €<span className="ml-2 text-sm text-black">/ mois</span></p>
      </CardContent>
    </Card>
  )
}
