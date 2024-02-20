import { formatCurrency } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Banner() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''

  return (
    <section id="banner" className="bg-white p-10">
      <div className="mx-auto grid place-items-center lg:max-w-5xl">
        <h1 className="mb-6 text-8xl font-bold italic text-primary"> Zou </h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl"> Votre site web prêt en <span className="mb-4 text-4xl font-bold text-primary md:text-6xl"> 30 </span>minutes </h2>
        <p className="mb-4 text-xl font-bold text-gray-700 md:text-3xl"> pour <span className="mb-4 text-4xl font-bold text-primary"> {formatCurrency(19.99)} <span className="text-lg text-gray-700">/ mois ( sans engagement ).</span> </span></p>
        <p className="text-base text-gray-700 md:text-xl"> Rien à créer, tout est fait. </p>
        <p className="text-base text-gray-700 md:text-xl"> Juste à saisir vos données. </p>
        <p className="text-base text-gray-700 md:text-xl">Et <span className="text-2xl font-bold italic tracking-widest text-primary underline underline-offset-4"> Zou</span> votre site est en ligne ! </p>
        {
          !token ? (
            <>
              <Button className="mt-4 text-lg" asChild>
                <Link href="/register">Je me lance</Link>
              </Button>
              <div className="mt-8 flex flex-wrap items-center justify-center">
                <p className="text-gray-700">Vous êtes déjà client ?</p>
                <Button variant="link" asChild>
                  <Link href="/login">Connectez vous</Link>
                </Button>
              </div>
            </>
          ) : null
        }
      </div>
    </section>
  )
}
