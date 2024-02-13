"use client"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaqType } from "@/lib/definitions"

export default function AccordeonItem({ faq }: { faq: FaqType }) {
  return (
    <AccordionItem className="rounded-md bg-white p-2" value={`item-${faq.id}`}>
      <AccordionTrigger className="text-lg text-blueDark"> {faq.title} </AccordionTrigger>
      <AccordionContent className="text-blueDark">
        {faq.description}
      </AccordionContent>
    </AccordionItem>
  )
}
