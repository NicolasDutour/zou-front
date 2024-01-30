import { Separator } from "@/components/ui/separator";

import Breadcrumbs from "@/components/pages/admin/Breadcrumbs";
import { NoInvoice } from "@/components/pages/admin/invoice/NoInvoice";
import InvoicesList from "@/components/pages/admin/invoice/InvoicesList";
import { cookies } from "next/headers";

async function getInvoicesData(token: string) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/users/me?populate[invoices][populate]=*`;

  if (token) {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!response.ok) {
      console.log("error");
    }
    return response.json()
  }
}

export default async function InvoicePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const invoices = await getInvoicesData(token || '')

  return (
    <div className="space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Factures", href: "/admin/invoice" }
        ]}
      />
      <Separator />
      {
        invoices?.length > 0 ? (
          <InvoicesList invoices={invoices} />
        ) : (
          <NoInvoice />
        )
      }
    </div>
  )
}