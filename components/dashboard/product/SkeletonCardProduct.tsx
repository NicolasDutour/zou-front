import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardProduct() {
  return (
    <div>
      <Skeleton className="h-[200px] w-full rounded-3xl bg-blueDark" />
      <Skeleton className="h-[200px] w-full rounded-3xl bg-blueDark" />
    </div>
  )
}
