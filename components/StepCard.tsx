import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import DialogPlan from "./DialogPlan"
import { PlanType } from "@/lib/types"

export default function StepCard({ title, description, step, plans }: { title: string, description: string, step: number, plans: PlanType[] }) {
  return (
    <Card className="w-full text-gray-600 mb-4">
      <CardHeader>
        <CardTitle className="text-2xl mb-4"> <span className="text-4xl"> {step} . </span> {title} </CardTitle>
        <CardDescription className="text-base"> {description} </CardDescription>
      </CardHeader>
      {
        step === 4 ? (
          <CardContent className="flex gap-2">
            {plans?.map(plan => <DialogPlan key={plan.id} plan={plan} />)}
          </CardContent>
        ) : null
      }
      {
        step === 5 ? (
          <CardContent>
            <Button className="text-xl md:text-2xl bg-secondary hover:bg-green-900 text-white md:p-6" type="submit">
              <Link href="/register">Je me lance !</Link>
            </Button>
          </CardContent>
        ) : null
      }
    </Card>
  )
}
