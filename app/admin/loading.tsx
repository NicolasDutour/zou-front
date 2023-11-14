import Loader from "@/components/Loader"

export default function Loading() {
  return (
    <div className="flex items-center justify-center backdrop-blur-md backdrop-filter bg-white">
      <div className="text-gray-700 text-xl font-semibold mt-24">
        <Loader width={100} height={100} />
      </div>
    </div>
  )
}
