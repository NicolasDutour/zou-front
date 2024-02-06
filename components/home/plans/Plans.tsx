
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

export default function Plans() {
  return (
    <section className="bg-base px-6 py-10">
      <div className="mx-auto lg:max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Une formule unique</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-secondary md:col-span-2">
            <CardHeader>
              <CardTitle className="mb-2 text-center text-2xl font-medium">
                Abonnement mensuel
              </CardTitle>
              <CardDescription className="flex flex-col items-center justify-center text-6xl text-secondary">
                <ul className="mt-4 text-sm text-secondary space-y-2">
                  <li className="list-disc">1 mois gratuit pour commencer</li>
                  <li className="list-disc">Aucun frais caché</li>
                  <li className="list-disc">Vous pouvez annuler à tout moment</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <p className="text-4xl text-primary"> {formatCurrency(19)}<span className="ml-2 text-2xl text-gray-500">/ mois</span> </p>
            </CardFooter>
          </Card>
          <Card className="border-2 border-yellow-400 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="mb-2 text-center text-2xl font-medium">
                + Options
              </CardTitle>
              <CardDescription className="text-secondary">
                <ul className="mt-4 text-sm text-secondary space-y-2">
                  <li className="list-disc">Paiement unique ( ex: 10 produits vous seront facturés 20€ une seule fois )</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <p className="text-4xl text-primary"> {formatCurrency(2)}<span className="ml-2 text-2xl text-gray-500">/ produit</span> </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
