import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonPlans() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Skeleton className="h-[200px] rounded-md bg-primary-foreground" />
      <Skeleton className="h-[200px] rounded-md bg-primary-foreground" />
    </div>
  )
}
