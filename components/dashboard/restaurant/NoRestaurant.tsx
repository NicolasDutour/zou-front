import Link from 'next/link'

export const NoRestaurant = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className='space-y-4 rounded-2xl bg-muted p-4'>
        <div className='space-y-2'>
          <p>Vous n'avez pas encore de restaurant</p>
          <Link
            href="/dashboard/restaurant/new"
            className="flex w-1/2 justify-center rounded-md bg-blueDarker px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueDarker"
          >
            Créer un restaurant
          </Link>
        </div>
      </div>
    </div>
  )
}
