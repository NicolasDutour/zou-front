import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import PaymentMethod from './PaymentForm';

export const metadata: Metadata = {
  title: "Payment",
  description: "Manage your payment details",
}

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

export default async function SettingsPaymentPage() {
  // const data = await getData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Payment</h1>
        <p className="text-sm text-muted-foreground">
          Update your payment details
        </p>
      </div>
      <Separator />
      <PaymentMethod />
    </div>
  )
}