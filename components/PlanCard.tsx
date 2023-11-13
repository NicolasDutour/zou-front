import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { PlanType } from "@/lib/types"

export default function PlanCard({ plan }: { plan: PlanType }) {
  const { id, attributes: { title, description, price, included } } = plan

  return (
    <Card className="shadow-custom bg-base">
      <CardHeader className="flex items-center">
        <Image
          src="/leaf-icon.png"
          alt="leaf-icon"
          width={50}
          height={50}
        />
        <CardTitle className="text-lg uppercase"> {title} </CardTitle>
        <CardDescription className="text-base"> {description} </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-4xl text-secondary mb-4"> {price} €<span className="text-sm text-black ml-2">/ mois</span></p>
        <p> {included}</p>
      </CardContent>
    </Card>
  )
}
