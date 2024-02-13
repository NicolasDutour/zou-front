import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardProfile() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[68px] w-full md:w-1/2 bg-blueDark rounded-3xl" />
    </div>
  )
}
