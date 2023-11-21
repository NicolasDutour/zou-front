import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import InvoicesList from './InvoicesList';
import { InvoiceType } from '@/lib/types';
import { formatInvoiceName } from '@/lib/utils';

// async function getData() {
//   const cookieStore = cookies()
//   const token = cookieStore.get('token')?.value

//   if (token) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[restaurants][populate]=*&populate[pricing_plan][populate]=*`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       })
//     if (!res.ok) {
//       console.log("error");
//     }
//     return res.json()
//   }
// }

export default async function SettingsInvoicesPage() {
  // const data = await getData()

  const invoices: InvoiceType[] = [
    {
      id: 1,
      invoice_name: formatInvoiceName("essentiel", "01-10-2023", "30-10-2023"),
      startDate: "01-10-2023",
      endDate: "30-10-2023",
      plan: "essentiel",
      amount: 12,
      status: "En cours"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Factures</h1>
        <p className="text-sm text-muted-foreground">
          Gestion des factures
        </p>
      </div>
      <Separator />
      {invoices?.length > 0 ? <InvoicesList invoices={invoices} /> : <p className="mb-4">Vous n'avez pas de factures pour l'instant</p>}
    </div>
  )
}