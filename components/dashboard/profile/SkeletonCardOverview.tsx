import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardOverview() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[350px] w-full bg-blueDark rounded-3xl" />
    </div>
  )
}
