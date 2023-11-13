import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "./ui/button"
import Link from "next/link"
import { StepType } from "@/lib/types"

export default function StepCard({ step }: { step: StepType }) {
  const { id, attributes: { title, description } } = step

  return (
    <Card className="border-none shadow-none md:last:col-span-4">
      <CardHeader className="flex items-center">
        <Image
          src="/leaf-icon.png"
          alt="leaf-icon"
          width={50}
          height={50}
        />
        <CardTitle className="text-lg text-center pt-6"> {title} </CardTitle>
        <CardDescription className="text-base text-center pt-6"> {description} </CardDescription>
      </CardHeader>
      {
        id === 4 ? (
          <CardContent className="flex items-center flex-col gap-2">
            <p className="text-secondary font-semibold text-2xl">Essential</p>
            <p className="text-secondary font-semibold text-2xl">Premium</p>
          </CardContent>
        ) : null
      }
      {
        id === 5 ? (
          <CardContent className="text-center">
            <Button className="text-xl md:text-2xl bg-secondary hover:bg-green-900 text-white md:p-4" type="submit">
              <Link href="/register">Je me lance !</Link>
            </Button>
          </CardContent>
        ) : null
      }
    </Card>
  )
}
