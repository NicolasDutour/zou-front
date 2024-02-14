import { cookies } from "next/headers";
import { listInvoices } from "@/lib/actions";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import InvoicesList from "@/components/dashboard/invoice/InvoicesList";
import { NoInvoice } from "@/components/dashboard/invoice/NoInvoice";

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
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Factures", href: "/dashboard/invoice" }
        ]}
      />
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