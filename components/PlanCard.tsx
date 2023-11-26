"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { TfiCup, TfiInfinite } from "react-icons/tfi"

import { PlanType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { FaCheck } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6";

export default function PlanCard({ plan }: { plan: PlanType }) {
  const { id, attributes: { title, description, price, access, wedoforyou, youmanage } } = plan

  return (
    <Card className={cn("bg-base border", title === "premium" ? "shadow-custom-blue border-primary" : "shadow-custom-blue-light border-primary")}>
      <CardHeader className="flex items-center">
        {
          title === "essentiel" ? (
            <div className="text-primary text-6xl pb-6">
              <TfiCup />
            </div>
          ) : (
            <div className="text-secondary text-6xl pb-6">
              <TfiInfinite />
            </div>
          )
        }
        <CardTitle className="text-2xl uppercase pt-4"> {title} </CardTitle>
        <CardDescription className="text-lg flex items-center">
          {description}
          <Popover>
            <PopoverTrigger>
              <div className="icon-move-right text-primary ml-4">
                <FaArrowRightLong />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div> {title === 'premium' ? (
                <>
                  <p className="mt-6 text-lg text-left">Vous avez accès à:</p>
                  <ul>
                    {
                      access?.split(',').map((item, index) => {
                        return <li key={index} className="text-left px-10 flex items-center"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
                      })
                    }
                  </ul>
                  <p className="mt-6 text-lg text-left">Nous faisons pour vous:</p>
                  <ul>
                    {
                      wedoforyou?.split(',').map((item, index) => {
                        return <li key={index} className="text-left px-10 flex items-center"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
                      })
                    }
                  </ul>
                </>
              ) : (
                <>
                  <p className="mt-6 text-lg text-left">Vous avez accès à:</p>
                  <ul>
                    {
                      access?.split(',').map((item, index) => {
                        return <li key={index} className="text-left px-10 flex items-center"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
                      })
                    }
                  </ul>
                  <p className="mt-6 text-lg text-left">Vous gérez vous même:</p>
                  <ul>
                    {
                      youmanage?.split(',').map((item, index) => {
                        return <li key={index} className="text-left px-10 flex items-center"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
                      })
                    }
                  </ul>
                </>
              )}</div>
            </PopoverContent>
          </Popover>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className={cn("text-4xl text-primary mb-4 font-bold", title === 'premium' ? "text-primary" : "text-secondary")}> {price} €<span className="text-sm text-black ml-2">/ mois</span></p>
      </CardContent>
    </Card>
  )
}
