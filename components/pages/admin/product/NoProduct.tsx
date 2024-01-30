import Link from 'next/link'

export const NoProduct = () => {
  return (
    <div className="mt-4 w-full rounded-2xl bg-muted p-4 md:w-1/2">
      <div className='space-y-2'>
        <p>Vous n'avez pas encore ajouté de produits</p>
        <Link
          href="/admin/product/create"
          className="flex w-1/2 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          Créer un produit
        </Link>
      </div>
    </div>
  )
}
