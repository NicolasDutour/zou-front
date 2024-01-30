import { InvoiceType } from "@/lib/types/invoiceType";
import { InvoiceItem } from "./InvoiceItem";

export const InvoicesList = ({ invoices }: { invoices: InvoiceType[] }) => {
  return (
    <>{
      invoices?.map((invoice) => {
        return (
          <InvoiceItem invoice={invoice} />
        )
      })
    }</>
  )
}
