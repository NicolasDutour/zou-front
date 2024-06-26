import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import { NoSubscription } from "@/components/dashboard/subscription/NoSubscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { retrieveStripeSession, retrieveStripeSubscription } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";

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

export default async function SubscriptionsPage() {
  let stripeSubscription = null
  let stripeSession = null
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const user = await getUserData(token)

  if (user.stripeCustomerId && user.stripeSubscriptionId && user.stripeSessionId) {
    stripeSubscription = await retrieveStripeSubscription(user.stripeSubscriptionId)
    stripeSession = await retrieveStripeSession(user.stripeSessionId)
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Abonnement", href: "/dashboard/subscription" }
        ]}
      />
      {
        user.stripeCustomerId && user.stripeSubscriptionId && user.stripeSessionId ? (
          <Card className={cn("flex w-full flex-col justify-between p-2 md:w-1/2", stripeSubscription?.status === "canceled" ? "bg-gray-300" : "")}>
            <CardHeader className="space-y-0 p-0">
              <CardTitle className="mb-2 text-center font-medium">
                <p className="mb-2 text-4xl text-blueDark"> Formule 1 mois 19.99 € / mois </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-blueDarker">
              ....
            </CardContent>
          </Card>
        ) : (
          <NoSubscription user={user} />
        )
      }
    </div>
  )
}