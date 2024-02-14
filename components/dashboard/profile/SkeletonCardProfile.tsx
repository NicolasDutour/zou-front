import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardProfile() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[68px] w-full rounded-3xl bg-blueDark md:w-1/2" />
    </div>
  )
}
