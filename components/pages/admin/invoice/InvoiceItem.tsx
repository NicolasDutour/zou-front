import { GoDownload } from "react-icons/go";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

import { capitalize } from "@/lib/utils"
import { InvoiceType } from "@/lib/types/invoiceType";

export const InvoiceItem = ({ invoice }: { invoice: InvoiceType }) => {
  return (
    <TableRow className="hover:shadow-lg" key={invoice.id}>
      <TableCell className="font-medium">{capitalize(invoice.invoice_name.toLowerCase())}</TableCell>
      <TableCell>Du {invoice.startDate} au {invoice.endDate}</TableCell>
      <TableCell>{invoice.plan}</TableCell>
      <TableCell className="text-right">{invoice.amount.toFixed(2)} €</TableCell>
      <TableCell> <p className="p-2 text-primary font-bold text-center">{invoice.status}</p></TableCell>
      <TableCell className="text-center">
        <Button className="text-2xl bg-white border-none shadow-none text-primary">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GoDownload />
              </TooltipTrigger>
              <TooltipContent className=" bg-white text-primary text-base border border-primary">
                <p>Télécharger la facture</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </TableCell>
    </TableRow>
  )
}
