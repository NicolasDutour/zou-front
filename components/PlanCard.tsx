import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { PlanType } from "@/lib/types"

export default function PlanCard({ plan }: PlanType) {
  console.log("plan: ", plan);

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
        <p className="text-2xl"> {price} €<span className="text-sm">/mois</span></p>
        <p> {included}</p>
      </CardContent>
    </Card>
  )
}
