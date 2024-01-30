import { InvoiceType } from "@/lib/types/invoiceType";
import { formatInvoiceName } from '@/lib/utils';

export const invoices: InvoiceType[] = [
  {
    id: 1,
    invoice_name: formatInvoiceName("essentiel", "01-10-2023", "30-10-2023"),
    startDate: "01-10-2023",
    endDate: "30-10-2023",
    plan: "essentiel",
    amount: 9.99,
    status: "En cours"
  },
  {
    id: 2,
    invoice_name: formatInvoiceName("premium", "01-10-2023", "30-10-2023"),
    startDate: "01-09-2023",
    endDate: "30-09-2023",
    plan: "premium",
    amount: 29.99,
    status: "Payé"
  }
]