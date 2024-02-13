import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlanType } from "@/lib/definitions";
import { formatCurrency } from "@/lib/utils";

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

    <Card className="flex flex-col justify-between border-2 border-blueDark p-2 w-full md:w-1/2">
      <CardHeader className="space-y-0 p-0">
        <CardTitle className="mb-2 text-center font-medium">
          <p className="text-4xl mb-2 text-blueDark"> {plan.name} </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-blueDarker">
        <ul>
          {
            plan.features.map((feature: string, index: number) => (
              <li key={index} className="mb-2 text-center text-blueDarker">{feature}</li>
            ))
          }
        </ul>
      </CardContent>
      <CardFooter className="mt-4 justify-center flex-col rounded-full bg-blueDarker border border-white p-2">
        <p className="tracking-wider text-white text-lg"> {formatCurrency(plan.price)} / mois</p>
      </CardFooter>
    </Card>
  )
}
