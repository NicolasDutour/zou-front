import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import Breadcrumbs from '@/components/pages/admin/Breadcrumbs';
import { ProfileForm } from '@/components/pages/admin/profile/ProfileForm';

async function getUserData(token: string) {
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
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

export default async function UpdateProfilePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''
  const data = await getUserData(token)

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Profil", href: "/admin/profile" },
            {
              label: "Mise à jour profil",
              href: "/admin/profile/update",
              active: true,
            },
          ]}
        />
      </div>
      <Separator />
      {data ? <ProfileForm user={data} /> : null}
    </div>
  )
}