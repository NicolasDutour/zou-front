"use client"

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
import { FaRegBuilding } from "react-icons/fa"
import { IconContext } from "react-icons"
import { MdAccountCircle, MdOutlineSubscriptions } from "react-icons/md"
import { BsBoxSeam } from "react-icons/bs"

const iconMap: Record<number, JSX.Element> = {
  1: <MdAccountCircle />,
  2: <FaRegBuilding />,
  3: <BsBoxSeam />,
  4: <MdOutlineSubscriptions />
};

export default function StepCard({ step }: { step: StepType }) {
  const { id, attributes: { title, description } } = step
  const icon = iconMap[id] || null;

  return (
    <Card className="border-none shadow-none md:last:col-span-4">
      <CardHeader className="flex items-center">
        <IconContext.Provider value={{ className: "text-primary text-6xl" }}>
          <div>
            {icon}
          </div>
        </IconContext.Provider>
        <CardTitle className="text-lg text-center pt-6"> {title} </CardTitle>
        <CardDescription className="text-base text-center pt-6"> {description} </CardDescription>
      </CardHeader>
      {
        id === 4 ? (
          <CardContent className="flex items-center flex-col gap-2">
            <p className="text-secondary text-2xl">Essential</p>
            <p className="text-primary text-2xl">Premium</p>
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
