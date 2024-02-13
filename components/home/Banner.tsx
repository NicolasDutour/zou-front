import { formatCurrency } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Banner() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''

  return (
    <section id="faqs" className="bg-blueDark p-10">
      <div className="mx-auto lg:max-w-5xl grid place-items-center">
        <h1 className="mb-6 text-8xl font-bold italic text-yellow"> Zou </h1>
        <h2 className="mb-4 text-4xl font-bold text-white"> Votre site web prêt en <span className="mb-4 text-6xl font-bold text-yellow"> 30 </span>minutes </h2>
        <p className="mb-4 text-3xl font-bold text-white"> pour <span className="mb-4 text-4xl font-bold text-yellow"> {formatCurrency(19.99)} <span className="text-lg text-white">/ mois ( sans engagement ).</span> </span></p>
        <p className="text-xl text-white"> Rien à créer, tout est fait. </p>
        <p className="text-xl text-white"> Juste à saisir vos données. </p>
        <p className="text-xl text-white">Et <span className="text-2xl font-bold italic text-yellow tracking-widest underline underline-offset-4"> Zou</span> votre site est en ligne ! </p>
        {
          !token ? (
            <div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="flex w-1/2 justify-center rounded-md bg-yellow font-medium p-2 text-lg text-blueDark"
                >
                  Je me lance
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-center text-white">
                <p>Vous êtes déjà client ?</p>
                <Link href="/login" className="text-yellow underline underline-offset-2 sm:ml-4">Connectez vous</Link>
              </div>
            </div>
          ) : null
        }
      </div>
    </section>
  )
}
