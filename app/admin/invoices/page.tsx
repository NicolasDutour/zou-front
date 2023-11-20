import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Factures</h1>
        <p className="text-sm text-muted-foreground">
          Gestion des factures
        </p>
      </div>
      <Separator />
    </div>
  )
}