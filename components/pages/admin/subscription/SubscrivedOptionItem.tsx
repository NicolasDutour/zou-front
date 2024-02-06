"use client"

import { formatCurrency, formatFullDay } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const periodicity: any = {
  "day": "quotidien",
  "week": "hebdomadaire",
  "month": "mensuel",
  "year": "annuel"
}

export const SubscrivedOptionItem = ({ sub }: { sub: any }) => {
  console.log("sub", sub);

  return (
    <div className="flex w-full items-center rounded-xl border-2 border-secondary bg-white p-4 text-card-foreground shadow">
      <div>
        <div className="mb-4 flex items-center">
          <p className="mr-4 text-xl font-medium">{sub.object === "subscription" ? `Abonnement ${periodicity[sub.plan.interval]}` : ""}</p>
          <p className="text-lg font-medium text-green-500">{sub.status === "active" ? "Actif" : ""}</p>
        </div>
        <div className="rounded-xl border border-gray-500 p-2">
          <p className="text-sm font-medium">Pour la période du <span className="text-secondary">{formatFullDay(new Date(sub.current_period_start * 1000).toISOString())}</span> au <span className="text-sm text-secondary">{formatFullDay(new Date(sub.current_period_end * 1000).toISOString())}</span></p>
          <p className="text-sm font-medium">Prochain prélèvement le <span className="text-secondary"> {formatFullDay(new Date(sub.current_period_end * 1000).toISOString())} </span></p>
        </div>
        {
          sub.status === "active" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="mt-12 cursor-pointer text-sm font-medium text-red-500 hover:underline hover:underline-offset-4">Résilier mon abonnement</TooltipTrigger>
                <TooltipContent className="text-sm">
                  <p>Votre abonnement restera actif jusqu'au {formatFullDay(new Date(sub.current_period_end * 1000).toISOString())} </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null
        }
      </div>
      <p className="ml-auto text-2xl font-medium text-secondary">{formatCurrency(sub.plan.amount / 100)}</p>
    </div>
  )
}
