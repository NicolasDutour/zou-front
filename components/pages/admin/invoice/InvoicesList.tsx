import { InvoiceType } from "@/lib/types/invoiceType";
import { InvoiceItem } from "./InvoiceItem";

export const InvoicesList = ({ invoices }: { invoices: InvoiceType[] }) => {
  return (
    <>{
      invoices?.map((invoice, index) => {
        return (
          <InvoiceItem key={index} invoice={invoice} />
        )
      })
    }</>
  )
}
