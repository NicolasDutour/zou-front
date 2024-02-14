import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardOverview() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[350px] w-full rounded-3xl bg-blueDark" />
    </div>
  )
}
