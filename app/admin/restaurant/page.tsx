import { Separator } from "@/components/ui/separator";
import { RestaurantForm } from "./RestaurantForm";

export default function SettingsRestaurantPage() {
  return (
    <div className="p-6">
      <div>
        <h3 className="text-lg font-medium">Votre restaurant</h3>
        <p className="text-sm text-muted-foreground">
          Mettez à jour les informations de votre restaurant
        </p>
      </div>
      <Separator />
      <RestaurantForm />
    </div>
  )
}