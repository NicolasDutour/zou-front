import { UserType } from "@/lib/validations"
import Link from "next/link"

export const NoSubscription = ({ user }: { user: UserType }) => {
  console.log("user", user);

  const checkPlanStatus = () => {
    if (user?.stripeCustomerId && user?.stripeSubscriptionId) {
      return "Vous avez un abonnemen premium en cours."
    }

    if (user?.trial_begin) {
      if (new Date(user?.trial_end) > new Date()) {
        return "Vous avez un abonnement gratuit en cours"
      }
      return "Votre abonnement gratuit est fini"
    }

    return "Vous n'avez pas d'abonnement actif."
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className='space-y-4 rounded-2xl bg-muted p-4'>
        <div className='space-y-2'>
          {
            checkPlanStatus()
          }
          <Link
            href="/dashboard/subscription/new"
            className="flex w-1/2 justify-center rounded-md bg-blueDarker px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueDarker"
          >
            {user?.trial_end && new Date(user?.trial_end) < new Date() ? "Changer de plan" : "Souscrire"}
          </Link>
        </div>
      </div>
    </div>
  )
}
