import Link from 'next/link'

export const NoRestaurant = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className='rounded-2xl bg-muted p-4 space-y-4'>
        <div className='space-y-2'>
          <p>Vous n'avez pas encore de restaurant</p>
          <Link
            href="/admin/restaurant/create"
            className="flex w-1/2 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Créer un restaurant
          </Link>
        </div>
      </div>
    </div>
  )
}
