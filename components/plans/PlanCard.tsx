import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlanType } from "@/lib/validations";
import { capitalize, formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export const PlanCard = ({ plan }: { plan: PlanType }) => {
  return (
    <Card className="flex w-full flex-col justify-between border-2 border-primary p-2">
      <CardHeader className="space-y-0 p-0">
        <CardTitle className="mb-2 text-center font-medium">
          <p className="mb-2 text-4xl text-primary"> {capitalize(plan.name)} </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-primary">
        <ul>
          {
            plan.features.map((feature: string, index: number) => (
              <li key={index} className="mb-2 text-center text-gray-700">{feature}</li>
            ))
          }
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="group w-full cursor-pointer" asChild>
          <Link href="/register" className="text-xl font-light"> {plan.name === "free" ? "Free for 1 month" : `${formatCurrency(plan.price)} / mois`} <span className="ml-6 hidden group-hover:block"><MoveRight /></span> </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
