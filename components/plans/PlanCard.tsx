import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlanType } from "@/lib/validations";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export const PlanCard = ({ plan }: { plan: PlanType }) => {
  // const monthlyAmount = (amount: number) => {
  //   if (plan.attributes.period_type === 'an') return formatCurrency(amount / 12)
  //   return formatCurrency(amount / plan.attributes.period)
  // }

  return (
    // <Card className="flex flex-col justify-between border-2 border-blueDark p-2 w-full md:w-1/2">
    //   <CardHeader className="space-y-0 p-0">
    //     <CardTitle className="mb-2 text-center font-medium">
    //       <p className="text-4xl mb-2">{plan.attributes.period}</p>
    //       <p> {plan.attributes.period_type} </p>
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent className="flex flex-col items-center justify-center text-blueDarker">
    //     <p className="text-xl">{monthlyAmount(plan.attributes.amount)}<span className="text-gray-500 text-sm"> / mois</span></p>
    //   </CardContent>
    //   <CardFooter className="mt-4 justify-center flex-col rounded-full bg-blueDarker border border-white p-2">
    //     <p className="tracking-wider text-white"> {plan.attributes.period} {plan.attributes.period_type} pour {formatCurrency(plan.attributes.amount)}</p>
    //   </CardFooter>
    // </Card>

    <Card className="flex w-full flex-col justify-between border-2 border-primary p-2 md:w-1/2">
      <CardHeader className="space-y-0 p-0">
        <CardTitle className="mb-2 text-center font-medium">
          <p className="mb-2 text-4xl text-primary"> {plan.name} </p>
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
        <Button className="w-full cursor-pointer group" asChild>
          <Link href="/register" className="text-xl font-light"> {formatCurrency(plan.price)} / mois <span className="hidden group-hover:block ml-6"><MoveRight /></span> </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
