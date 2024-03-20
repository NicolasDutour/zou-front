import { cookies } from "next/headers"
import Link from "next/link"

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

export default async function Profile() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const data = await getData(token || '')

  return (
    <div className='border-gray w-full space-y-4 rounded-2xl border bg-blueDark p-4 md:w-1/2'>
      <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2'>
        <p className='text-white'>Email: <span className='font-medium text-white'>{data?.email}</span> </p>
        <Link
          href="/dashboard/profile/edit"
          className="flex justify-center rounded-md bg-white px-3 py-1.5 text-sm font-medium leading-6 text-blueDark"
        >
          Modifier votre email
        </Link>
      </div>
    </div>
  )
}
