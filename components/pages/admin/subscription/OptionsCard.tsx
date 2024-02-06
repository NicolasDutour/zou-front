import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const OptionsCard = () => {
  return (
    <Card className="flex flex-col justify-between border-2 border-yellow-400 p-2">
      <CardHeader className="space-y-0 p-0">
        <CardTitle className="mb-2 text-center text-2xl font-medium">
          + Options
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-secondary">
        <ul className="mt-4 space-y-2 text-sm text-secondary">
          <li className="list-disc">Paiement unique ( ex: 10 produits vous seront facturés 20€ une seule fois )</li>
        </ul>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-4xl text-primary"> {formatCurrency(2)}<span className="ml-2 text-2xl text-gray-500">/ produit</span> </p>
      </CardFooter>
    </Card>
  )
}
