import { TfiCup, TfiInfinite } from "react-icons/tfi"

export function CardHeaderIcon({ title }: { title: string }) {
  return title === "essentiel" ? (
    <div className="text-primary text-6xl pb-6">
      <TfiCup />
    </div>
  ) : (
    <div className="text-secondary text-6xl pb-6">
      <TfiInfinite />
    </div>
  )
}