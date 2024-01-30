"use client"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Faq } from "@/lib/types/faqType"

export default function AccordeonItem({ faq }: { faq: Faq }) {
  return (
    <AccordionItem className="rounded-md bg-white p-2" value={`item-${faq.id}`}>
      <AccordionTrigger className="text-lg font-semibold text-gray-700"> {faq.attributes.title} </AccordionTrigger>
      <AccordionContent className="text-base text-gray-700">
        {faq.attributes.description}
      </AccordionContent>
    </AccordionItem>
  )
}