import FaqItem from "@/components/pages/admin/faq/FaqItem"

import { Faq } from "@/lib/types/faqType"

export const FaqList = ({ faqs }: { faqs: Faq[] }) => {
  return (
    <>
      {
        faqs?.map(faq => {
          return <FaqItem key={faq.id} faq={faq} />
        })
      }
    </>
  )
}
