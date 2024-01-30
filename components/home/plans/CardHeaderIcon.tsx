import { TfiCup, TfiInfinite } from "react-icons/tfi"

export function CardHeaderIcon({ title }: { title: string }) {
  return title === "essentiel" ? (
    <div className="pb-6 text-6xl text-primary">
      <TfiCup />
    </div>
  ) : (
    <div className="pb-6 text-6xl text-secondary">
      <TfiInfinite />
    </div>
  )
}