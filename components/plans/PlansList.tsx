import { PlanCard } from "./PlanCard"

export const plans = [
  {
    id: 1,
    name: "The One",
    price: 19.99,
    features: [
      "1er mois offert sans saisir vos données bancaires",
      "Aucun frais cachés",
      "Accès à votre tableau de bord",
      "Support technique par email",
    ]
  },
]

export default async function PlansList() {
  return (
    <div className={`flex justify-center`}>
      {
        plans?.map((plan: any) => (
          <PlanCard key={plan.id} plan={plan} />
        ))
      }
    </div>
  )
}
