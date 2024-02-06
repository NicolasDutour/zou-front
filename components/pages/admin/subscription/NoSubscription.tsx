import Link from "next/link"

export const NoSubscription = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className='space-y-4 rounded-2xl bg-muted p-4'>
        <div className='space-y-2'>
          <p>Vous n'avez pas encore d'abonnement</p>
          <Link
            href="/admin/subscription/create"
            className="flex w-1/2 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {"S'abonner"}
          </Link>
        </div>
      </div>
    </div>
  )
}
