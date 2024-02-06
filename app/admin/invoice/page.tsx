import { Separator } from "@/components/ui/separator";

import Breadcrumbs from "@/components/pages/admin/Breadcrumbs";
import { NoInvoice } from "@/components/pages/admin/invoice/NoInvoice";
import InvoicesList from "@/components/pages/admin/invoice/InvoicesList";
import { cookies } from "next/headers";
import { listInvoices } from "@/lib/actions/stripe-actions";

async function getUserData(token: string) {
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!res.ok) {
      console.log("error");
    }
    return res.json()
  }
}

export default async function InvoicePage() {
  let invoices
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const data = await getUserData(token)
  if (data) {
    invoices = await listInvoices(data.stripeUserId)
    console.log("invoices", invoices.data);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Factures", href: "/admin/invoice" }
        ]}
      />
      <Separator />
      {
        invoices?.data ? (
          <InvoicesList invoices={invoices?.data} />
        ) : (
          <NoInvoice />
        )
      }
    </div>
  )
}