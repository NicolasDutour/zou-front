"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CiSearch } from "react-icons/ci"

import { capitalize, formatCurrency } from "@/lib/utils"
import { Label } from "@/components/ui/label";
import { InvoiceType } from "@/lib/types/invoiceType";
import { GoDownload } from "react-icons/go";

export default function InvoicessList({ invoices }: { invoices: InvoiceType[] }) {
  const [searchInvoiceName, setSearchInvoiceName] = useState('')
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceType[]>([])

  useEffect(() => {
    setFilteredInvoices(invoices)
  }, [invoices]);

  const handleChangeSearchInvoiceName = (e: any) => {
    const value = e.target.value.toLowerCase()
    setSearchInvoiceName(value)

    const filtered = invoices.filter(invoice =>
      invoice.invoice_name.toLowerCase().includes(value)
    );
    setFilteredInvoices(filtered);
  }

  return (
    <div>
      {
        invoices?.length > 0 ? (
          <div className="flex items-end justify-between">
            <div className="relative mr-2 w-full">
              <Label className="text-muted-foreground">Rechercher une facture</Label>
              <input
                id='invoice'
                type="text"
                value={searchInvoiceName}
                onChange={handleChangeSearchInvoiceName}
                className="block w-full rounded-md border-0 bg-white/5 p-2 py-1.5 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 md:w-1/3"
              />
              <div className="absolute left-2 top-8 text-xl text-primary">
                <CiSearch />
              </div>
            </div>
          </div>
        ) : null
      }
      <div className="mt-4 rounded-2xl bg-muted p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-4/12 border-gray-700 font-medium">Nom</TableHead>
              <TableHead className="w-3/12 border-gray-700 font-medium">Date</TableHead>
              <TableHead className="w-2/12 border-gray-700 font-medium">Montant</TableHead>
              <TableHead className="w-2/12 border-gray-700 font-medium">Statut</TableHead>
              <TableHead className="w-1/12 border-gray-700 text-center font-medium"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices?.map((invoice) => {
              return (
                <TableRow className="bg-white" key={invoice.id}>
                  <TableCell className="font-medium">{capitalize(invoice.invoice_name.toLowerCase())}</TableCell>
                  <TableCell className="font-medium">Du {invoice.start_date} au {invoice.end_date}</TableCell>
                  <TableCell> {formatCurrency(invoice.amount)} </TableCell>
                  <TableCell><p className="rounded-full bg-green-500 px-2 py-1 text-center font-medium text-white">{invoice.status}</p></TableCell>
                  <TableCell className="flex items-center justify-around">
                    <Link
                      href={invoice?.image.url}
                      target="_blank"
                      className="cursor-pointer rounded-lg border border-secondary p-2 text-xl text-secondary">
                      <GoDownload />
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table >
      </div>
    </div>
  )
}
