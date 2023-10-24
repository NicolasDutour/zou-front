import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BannerStepFive() {
  return (
    <section className="md:h-[500px] w-full">
      <div className="p-4 bg-cover bg-center h-full bg-hero-pattern-end grid place-items-center">
        <div className="mb-10 z-10 text-gray-900">
          <div className="max-w-5xl mx-auto gap-6 grid grid-cols-1 place-items-center">
            <div className="flex justify-center items-center border-2 rounded-full w-12 h-12 p-7 border-primary mr-6 self-start">
              <p className="text-5xl text-primary">5</p>
            </div>
            <h1 className="text-4xl md:text-7xl mb-5">Mise en ligne</h1>
            <p className="text-4xl md:text-4xl">Vous êtes prêt ?</p>
            <Button className="text-xl md:text-4xl bg-secondary hover:bg-green-900 text-white p-6 md:p-10" type="submit">
              <Link href="/register">Je me lance !</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
