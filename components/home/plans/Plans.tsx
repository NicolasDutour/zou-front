
import { MonthlyCard } from "@/components/pages/admin/subscription/MonthlyCard"
import { OptionsCard } from "@/components/pages/admin/subscription/OptionsCard"

export default function Plans() {
  return (
    <section className="bg-base px-6 py-10">
      <div className="mx-auto lg:max-w-5xl">
        <h3 className="mb-6 text-3xl font-medium">Une formule unique</h3>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          <MonthlyCard />
          <OptionsCard />
        </div>
      </div>
    </section>
  )
}
