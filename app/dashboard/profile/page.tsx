import { SkeletonCardProfile } from "@/components/dashboard/profile/SkeletonCardProfile";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import Profile from "@/components/dashboard/profile/Profile";
import { Suspense } from "react";

export default async function ProfilePage() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={[
        { label: "Profile", href: "/dashboard/profile", active: true },
      ]} />

      <Suspense fallback={<SkeletonCardProfile />}>
        <Profile />
      </Suspense>
    </div>
  )
}
