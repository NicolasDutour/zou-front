import { cookies } from 'next/headers'
import Link from 'next/link';

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '../../../components/pages/admin/Breadcrumbs';

async function getData(token: string) {
  if (token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!response.ok) {
      console.error("error")
      throw new Error('Erreur de récupération des informations du user')
    }
    return response.json()
  }
}

export default async function ProfilePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getData(token || '')

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Profil", href: "/admin/profile" }
          ]}
        />
      </div>
      <Separator />
      <div className='rounded-2xl bg-muted p-4 space-y-4'>
        <div className='flex items-center'>
          <p className='w-1/4 text-gray-600'>Email: <span className='text-black font-medium'>{data?.email}</span> </p>
          <Link
            href="/admin/profile/update"
            className="flex w-1/4 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Modifier votre email
          </Link>
        </div>
        {/* <div className='flex items-center'>
          <p className='w-1/4 text-gray-600'>Mot de passe: <span className='text-black font-medium'>******************</span></p>
          <button
            className="flex w-1/4 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Modifier votre mot de passe
          </button>
        </div> */}
      </div>
    </div>
  )
}