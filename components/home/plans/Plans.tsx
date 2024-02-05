
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FcUnlock } from "react-icons/fc";
import { GiAngelWings } from "react-icons/gi";
import { formatCurrency } from "@/lib/utils"

export default function Plans() {
  return (
    <section className="bg-base px-6 py-10">
      <div className="mx-auto lg:max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Une formule unique</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-9/12 mx-auto">
          <Card className="border-2 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="mb-2 text-center text-2xl font-medium">
                Gratuit <span className="text-sm text-secondary">( 1 mois d'essai )</span>
              </CardTitle>
              <CardDescription className="text-6xl text-secondary flex justify-center flex-col items-center">
                <FcUnlock />
                <span className="text-base text-secondary mt-4 text-pretty text-justify">
                  A la fin de votre période d'essai, vous devrez choisir l'abonnement pour continuer à utiliser nos services.
                </span>
                <span className="text-base text-secondary text-pretty text-justify">
                  Sinon la page de votre restaurant ne sera plus accessible.
                </span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <p className="text-4xl text-primary"> 0 €</p>
            </CardFooter>
          </Card>
          <Card className="border-2 border-secondary flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="mb-2 text-2xl font-medium text-center">Premium</CardTitle>
              <CardDescription className="text-6xl text-secondary flex justify-center flex-col items-center">
                <GiAngelWings />
                <span className="text-base text-secondary text-pretty text-justify mt-4">
                  Accès à toutes les fonctionnalités de la plateforme
                </span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <p className="text-4xl text-primary">{formatCurrency(14)}<span className="ml-2 text-xl text-muted-foreground">/ mois</span> </p>
            </CardFooter>
          </Card>
          <Card className="border-2 md:col-span-2">
            <CardHeader>
              <CardTitle className="mb-2 text-2xl font-medium text-center">+ les options</CardTitle>
              <CardDescription className="text-base text-secondary flex justify-center flex-col items-center">
                Vous pouvez ajouter vous même vos produits via votre tableau de bord
                <span>ou</span>
                <span>Nous le faisons pour vous au prix de:</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <p className="text-4xl text-primary">{formatCurrency(2)}<span className="ml-2 text-xl text-muted-foreground">/ produit</span> </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
