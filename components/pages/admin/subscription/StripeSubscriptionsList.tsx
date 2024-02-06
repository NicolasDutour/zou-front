import { SubscrivedOptionItem } from "./SubscrivedOptionItem"

export const StripeSubscriptionsList = ({ stripeSubscriptions }: { stripeSubscriptions: any }) => {
  return (
    <div>
      {
        stripeSubscriptions.map((sub: any) => (
          <SubscrivedOptionItem key={sub.id} sub={sub} />
        ))
      }
    </div>
  )
}
