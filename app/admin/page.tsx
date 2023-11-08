import { cookies } from 'next/headers'

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./ProfileForm";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile details",
}

async function getData() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[restaurants][populate]=*&populate[pricing_plan][populate]=*`,
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

export default async function SettingsProfilePage() {
  const data = await getData()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      {data ? <ProfileForm user={data} /> : null}
    </div>
  )
}