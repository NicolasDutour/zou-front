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

export default function PlanCard({ plan }: { plan: PlanType }) {
  const { id, attributes: { title, description, price, access, wedoforyou, youmanage } } = plan

  return (
    <Card className={cn("bg-base border", title === "essentiel" ? "shadow-custom-green border-secondary" : "shadow-custom-orange border-primary")}>
      <CardHeader className="flex items-center">
        {
          title === "essentiel" ? (
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
        <p className={cn("text-4xl text-secondary mb-4 font-bold", title === 'essentiel' ? "text-secondary" : "text-primary")}> {price} €<span className="text-sm text-black ml-2">/ mois</span></p>
        <div> {title === 'premium' ? (
          <>
            <p className="mt-6 text-lg">Vous avez accès à:</p>
            <ul>
              {
                access?.split(',').map(item => {
                  return <li className="text-left px-10"> {item} </li>
                })
              }
            </ul>
            <p className="mt-6 text-lg">Nous faisons pour vous:</p>
            <ul>
              {
                wedoforyou?.split(',').map(item => {
                  return <li className="text-left px-10"> {item} </li>
                })
              }
            </ul>
          </>
        ) : (
          <>
            <p className="mt-6 text-lg">Vous avez accès à:</p>
            <ul>
              {
                access?.split(',').map(item => {
                  return <li className="text-left px-10"> {item} </li>
                })
              }
            </ul>
            <p className="mt-6 text-lg">Vous gérez vous même:</p>
            <ul>
              {
                youmanage?.split(',').map(item => {
                  return <li className="text-left px-10"> {item} </li>
                })
              }
            </ul>
          </>
        )}</div>
      </CardContent>
    </Card>
  )
}
