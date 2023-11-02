import { Metadata } from "next"
import AdminLayout from "./components/AdminLayout"
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: "Administration",
  description: "Page d'administration pour ajouter ou modifier des données sur vos données personnelles et celles du restaurant",
}

async function getData() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[restaurants][populate]=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    if (!res.ok) {
      console.log("error");
    }
    return res.json()
  }
}

export default async function Admin() {
  const data = await getData()

  return (
    <div className="bg-white p-6">
      {data ? <AdminLayout user={data} /> : null}
    </div>
  )
}