import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const SubscriptionCard = () => {
  return (
    <Card className="flex flex-col justify-between border-2 border-blueDarker p-2 md:col-span-2">
      <CardHeader className="space-y-0 p-0">
        <CardTitle className="mb-2 text-center text-2xl font-medium">
          Abonnement mensuel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-0 text-blueDarker">
        <ul className="mt-4 space-y-2 text-sm text-blueDarker">
          <li className="list-disc">Aucun frais caché</li>
          <li className="list-disc">Vous pouvez annuler à tout moment</li>
        </ul>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-4xl text-blueDark"> {formatCurrency(19)}<span className="ml-2 text-2xl text-gray-500">/ mois</span> </p>
      </CardFooter>
    </Card>
  )
}
