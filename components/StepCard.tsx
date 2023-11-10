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

export default function StepCard({ title, description, step }: { title: string, description: string, step: number }) {
  return (
    <Card className="border-none shadow-none md:last:col-span-4">
      <CardHeader className="flex items-center">
        <Image
          src="/leaf-icon.png"
          alt="leaf-icon"
          width={50}
          height={50}
        />
        <CardTitle className="text-lg text-center pt-6"> {step} . {title} </CardTitle>
        <CardDescription className="text-base text-center pt-6"> {description} </CardDescription>
      </CardHeader>
      {
        step === 4 ? (
          <CardContent className="flex items-center flex-col gap-2">
            <p className="text-secondary font-semibold text-2xl">Essential</p>
            <p className="text-secondary font-semibold text-2xl">Premium</p>
          </CardContent>
        ) : null
      }
      {
        step === 5 ? (
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
