import { Separator } from "@/components/ui/separator";
import InvoiceTable from "@/components/pages/admin/invoice/InvoiceTable";

import { invoices } from '@/mock/data';

export default async function InvoicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Factures</h1>
      </div>
      <Separator />
      {invoices?.length > 0 ?
        <InvoiceTable invoices={invoices} /> :
        <p className="mb-4">{"Vous n'avez pas de factures pour l'instant"}</p>}
    </div>
  )
}