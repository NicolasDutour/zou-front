"use client"

import { cn } from '@/lib/utils'
import { removeSusbcription } from "@/lib/actions"
import { useTransition } from 'react';

export default function SubscriptionButton({ sub_id, plan_id }: { sub_id: string, plan_id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleRemoveSusbcription = (sub_id: string) => {
    startTransition(async () => {
      const data = await removeSusbcription(sub_id);
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={() => handleRemoveSusbcription(sub_id)}
      type='button'
      className={cn("disabled:opacity-40 w-full md:w-1/4 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", plan_id === "price_1OEuWMHaenaduY9Gz2bCYG9w" ? "bg-primary" : "bg-primary")}
    >
      {"Annuler l'abonnement"}
    </button>
  )
}
