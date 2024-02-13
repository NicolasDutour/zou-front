import { SkeletonCardProfile } from "@/components/SkeletonCardProfile";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import User from "@/components/dashboard/profile/User";
import { Suspense } from "react";

export default async function ProfilePage() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={[
        { label: "Profile", href: "/dashboard/profile", active: true },
      ]} />

      <Suspense fallback={<SkeletonCardProfile />}>
        <User />
      </Suspense>
    </div>
  )
}
