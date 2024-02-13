import Breadcrumbs from "@/components/pages/dashboard/Breadcrumbs";
import { NoSubscription } from "@/components/pages/dashboard/subscription/NoSubscription";
import { StripeSubscriptionsList } from "@/components/pages/dashboard/subscription/StripeSubscriptionsList";
import { Separator } from "@/components/ui/separator";
import { listSubscriptions, retrieveSession } from "@/lib/actions/stripe-actions";
import { cookies, headers } from "next/headers";

async function getUserData(token: string) {
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[stripe_products][populate]=*`,
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
  const headersList = headers()
  const sessionId = headersList.get('sessionId') || ''

  let stripeSubscriptions
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const data = await getUserData(token)

  if (data.stripeUserId && sessionId) {
    const session = await retrieveSession(sessionId);
    console.log("session", session);
    if (session.payment_status === 'paid') {
      console.log("session paid !!!");
      stripeSubscriptions = await listSubscriptions(data.stripeUserId)
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Abonnement", href: "/dashboard/subscription" }
        ]}
      />
      <Separator />
      {
        data.stripeUserId && stripeSubscriptions?.data && stripeSubscriptions?.data?.length > 0 ? (
          <div className='w-full space-y-4 rounded-2xl bg-muted p-4 md:w-1/2'>
            <StripeSubscriptionsList stripeSubscriptions={stripeSubscriptions?.data} />
          </div>
        ) : (
          <NoSubscription />
        )
      }
    </div>
  )
}