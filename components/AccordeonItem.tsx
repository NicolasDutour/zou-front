"use client"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// import { accordeaonItem } from "@/lib/types";

export default function AccordeonItem({ faq, index }) {
  return (
    <AccordionItem className="bg-white rounded-md p-2" value={`item-${index}`}>
      <AccordionTrigger className="text-lg font-semibold text-gray-700"> {faq.title} </AccordionTrigger>
      <AccordionContent className="text-base text-gray-700">
        {faq.description}
      </AccordionContent>
    </AccordionItem>
  )
}
