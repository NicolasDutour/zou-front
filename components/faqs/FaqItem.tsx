"use client"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaqType } from "@/lib/validations"

export default function AccordeonItem({ faq, index }: { faq: FaqType, index: number }) {
  return (
    <AccordionItem className="rounded-md bg-primary-foreground p-2" value={`item-${index}`}>
      <AccordionTrigger className="text-lg text-gray-900"> {faq.title} </AccordionTrigger>
      <AccordionContent className="text-gray-700">
        {faq.description}
      </AccordionContent>
    </AccordionItem>
  )
}
