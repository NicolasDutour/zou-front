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

export default function StepCard({ title, description, step }: { title: string, description: string, step: number }) {
  return (
    <Card className={cn("w-full text-gray-600", step === 5 ? 'md:col-span-2 grid place-content-center' : '')}>
      <CardHeader>
        <CardTitle className="text-2xl mb-4"> <span className="text-4xl"> {step} . </span> {title} </CardTitle>
        <CardDescription className="text-base"> {description} </CardDescription>
      </CardHeader>
      {
        step === 4 ? (
          <CardContent>
            <DialogPlan title="Essential" price="9.99" description="Vous êtes autonome" />
            <DialogPlan title="Premium" price="29.99" description="Ted s'occupe de tout" />
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
