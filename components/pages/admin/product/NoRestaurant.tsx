import Link from 'next/link'

export const NoRestaurant = () => {
  return (
    <div className="mt-4 w-full rounded-2xl bg-muted p-4 md:w-1/2">
      <div className='space-y-2'>
        <p>Vous devez d'abord créer un restaurant avant de pouvoir créer des produits</p>
        <Link
          href="/admin/restaurant/create"
          className="flex w-1/2 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          Créer un restaurant
        </Link>
      </div>
    </div>
  )
}
