import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { InvoiceType } from "@/lib/types/invoiceType"
import { InvoicesList } from "./InvoicesList"

export default function InvoiceTable({ invoices }: { invoices: InvoiceType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-b-gray-700">
          <TableHead className="w-3/12 border-l border-gray-700 font-semibold">Nom</TableHead>
          <TableHead className="w-3/12 border-l border-gray-700 font-semibold">Date</TableHead>
          <TableHead className="w-2/12 border-l border-gray-700 font-semibold">Abonnement</TableHead>
          <TableHead className="w-1/12 border-l border-gray-700 font-semibold">Montant</TableHead>
          <TableHead className="w-1/12 border-l border-gray-700 font-semibold">Statut</TableHead>
          <TableHead className="w-2/12 border-l border-gray-700 text-center font-semibold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <InvoicesList invoices={invoices} />
      </TableBody>
    </Table >
  )
}
