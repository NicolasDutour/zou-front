import AccordeonItem from "@/components/AccordeonItem"
import {
  Accordion,
} from "@/components/ui/accordion"
import { FaqResponse } from "@/lib/types"

async function getDataFaqs(): Promise<FaqResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faqs?sort=id:asc`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch data')
  }
  return res.json()
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
            {
              faqs?.data.map(faq => {
                return <AccordeonItem key={faq.id} faq={faq} />
              })
            }
          </div>
        </Accordion>
      </div>
    </section>
  )
}
