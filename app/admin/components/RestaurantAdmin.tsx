import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RestaurantForm } from "./RestaurantForm";

export default function RestaurantAdmin() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Votre restaurant</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Mettez à jour les informations de votre restaurant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Separator />
        <RestaurantForm />
      </CardContent>
    </Card>
  )
}