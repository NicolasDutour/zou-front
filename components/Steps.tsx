import StepCard from "./StepCard"

const steps = [
  {
    title: "Création compte",
    description: "Vous créez un compte qui vous permettra ensuite de vous connecter à votre page d'administration pour y ajouter ou modifier les informations de votre établissement."
  },
  {
    title: "Création établissement",
    description: "Vous saisirez toutes les informations de votre établissement, notamment une image le représentant, le nom, l'adresse, une description..."
  },
  {
    title: "Création produits",
    description: "Vous pourrez ajouter, modifier ou supprimer tout type de produit lié à votre établissement."
  },
  {
    title: "Abonnement",
    description: "Vous choisissez un abonnement parmis les suivants:",
  },
  {
    title: "Mise en ligne",
    description: "Vous êtes prêt ?",
  }
]

export default function Steps() {
  return (
    <section className="p-6 bg-green-100">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, index) => <StepCard key={index} title={step.title} description={step.description} step={index + 1} />)}
        </div>
      </div>
    </section>
  )
}
