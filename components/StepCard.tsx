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
    <Card className="border-none shadow-none md:last:col-span-4 md:last:col-start-1 md:last:col-end-3">
      <CardHeader className="flex items-center">
        {icon ? (
          <div className="text-primary text-6xl pb-6">
            {icon}
          </div>
        ) : null
        }
        <CardTitle className="text-xl text-center"> {title} </CardTitle>
        <div className="pt-6">
          {
            id === 4 ? (
              description.split(',').map((desc, index) => {
                return (
                  <CardDescription key={index} className="text-base text-center"> {desc} </CardDescription>
                )
              })
            ) : <CardDescription className="text-base text-center"> {description} </CardDescription>
          }
        </div>
      </CardHeader>
      {
        id === 5 ? (
          <CardContent className="text-center p-6">
            <Button className="text-xl md:text-2xl bg-primary hover:bg-secondary text-white md:p-6" type="submit">
              <Link href="/register">Je me lance !</Link>
            </Button>
          </CardContent>
        ) : null
      }
    </Card>
  )
}
