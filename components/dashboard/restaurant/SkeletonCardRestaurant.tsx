import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardRestaurant() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Skeleton className="h-[200px] w-full rounded-3xl bg-blueDark" />
      <Skeleton className="h-[200px] w-full rounded-3xl bg-blueDark" />
      <Skeleton className="h-[200px] w-full rounded-3xl bg-blueDark" />
      <Skeleton className="h-[200px] w-full rounded-3xl bg-blueDark" />
      <Skeleton className="col-span-2 h-[100px] w-full rounded-3xl bg-blueDark" />
      <Skeleton className="col-span-2 h-[100px] w-full rounded-3xl bg-blueDark" />
    </div>
  )
}
