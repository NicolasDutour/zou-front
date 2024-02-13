
import { WithoutZou } from "./WithoutZou"
import { WithZou } from "./WithZou"

export default function Services() {
  return (
    <section className="bg-white px-6 py-10">
      <div className="mx-auto lg:max-w-5xl">
        <h3 className="mb-6 text-3xl font-medium">Les services</h3>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <WithoutZou />
          <WithZou />
        </div>
      </div>
    </section>
  )
}
