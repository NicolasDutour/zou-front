import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { capitalize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GoDownload } from "react-icons/go";
import { InvoiceType } from "@/lib/types"

export default function InvoicesList({ invoices }: { invoices: InvoiceType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-b-gray-700">
          <TableHead className="w-3/12 border-l border-gray-700 font-semibold">Nom</TableHead>
          <TableHead className="w-3/12 border-l border-gray-700 font-semibold">Date</TableHead>
          <TableHead className="w-2/12 border-l border-gray-700 font-semibold">Abonnement</TableHead>
          <TableHead className="w-1/12 border-l border-gray-700 font-semibold">Montant</TableHead>
          <TableHead className="w-1/12 border-l border-gray-700 font-semibold">Statut</TableHead>
          <TableHead className="w-2/12 border-l border-gray-700 font-semibold text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices?.map((invoice) => {
          return (
            <TableRow className="hover:shadow-lg" key={invoice.id}>
              <TableCell className="font-medium">{capitalize(invoice.invoice_name.toLowerCase())}</TableCell>
              <TableCell>Du {invoice.startDate} au {invoice.endDate}</TableCell>
              <TableCell>{invoice.plan}</TableCell>
              <TableCell className="text-right">{invoice.amount.toFixed(2)} €</TableCell>
              <TableCell> <p className="p-2 text-secondary font-bold text-center">{invoice.status}</p></TableCell>
              <TableCell className="text-center">
                <Button className="text-2xl bg-white border-none shadow-none text-secondary">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><GoDownload /></TooltipTrigger>
                      <TooltipContent className=" bg-white text-secondary text-base border border-secondary">
                        <p>Télécharger la facture</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table >
  )
}
