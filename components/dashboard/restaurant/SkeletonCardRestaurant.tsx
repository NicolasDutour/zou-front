import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardRestaurant() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-[200px] w-full bg-blueDark rounded-3xl" />
      <Skeleton className="h-[200px] w-full bg-blueDark rounded-3xl" />
      <Skeleton className="h-[200px] w-full bg-blueDark rounded-3xl" />
      <Skeleton className="h-[200px] w-full bg-blueDark rounded-3xl" />
      <Skeleton className="h-[100px] w-full bg-blueDark rounded-3xl col-span-2" />
      <Skeleton className="h-[100px] w-full bg-blueDark rounded-3xl col-span-2" />
    </div>
  )
}
