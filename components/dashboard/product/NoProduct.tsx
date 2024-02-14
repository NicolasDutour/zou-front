import Link from 'next/link'

export const NoProduct = () => {
  return (
    <div className="mt-4 w-full rounded-2xl bg-muted p-4 md:w-1/2">
      <div className='space-y-2'>
        <p>Vous n'avez pas encore ajouté de produits</p>
        <Link
          href="/dashboard/product/new"
          className="flex w-1/2 justify-center rounded-md bg-blueDarker px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueDarker"
        >
          Créer un produit
        </Link>
      </div>
    </div>
  )
}
