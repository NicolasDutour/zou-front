import { PlanCard } from "./PlanCard"

export const plans = [
  {
    id: 1,
    name: "free",
    price: 0,
    features: [
      "Aucune saisie de données bancaires requise",
      "Aucun frais cachés",
      "Accès à votre tableau de bord",
      "Support technique par email",
    ]
  },
  {
    id: 2,
    name: "premium",
    price: 19.99,
    features: [
      "Aucun engagement",
      "Aucun frais cachés",
      "Accès à votre tableau de bord",
      "Support technique par email",
    ]
  },
]

export default async function PlansList() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {
        plans?.map((plan: any) => (
          <PlanCard key={plan.id} plan={plan} />
        ))
      }
    </div>
  )
}
