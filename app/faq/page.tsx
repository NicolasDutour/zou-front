import { FaqList } from "@/components/pages/admin/faq/FaqList"
import {
  Accordion,
} from "@/components/ui/accordion"

import { FaqResponse } from "@/lib/types/faqType"

async function getDataFaqs(): Promise<FaqResponse> {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/faqs?sort=id:asc`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    console.error('Failed to fetch data')
  }
  return response.json()
}

export default async function FAQ() {
  const faqs = await getDataFaqs()

  if (!faqs.data) {
    return <div>Il n'y a pas de faq actuellement</div>
  }

  return (
    <section id='faq' className="p-6 h-[calc(100vh-77px)] bg-base">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-2xl font-bold">Questions fréquentes</h1>
        <Accordion type="single" collapsible>
          <div className="grid grid-cols-auto-fit-300 gap-4">
            <FaqList faqs={faqs?.data} />
          </div>
        </Accordion>
      </div>
    </section>
  )
}
