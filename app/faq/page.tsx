import AccordeonItem from "@/components/AccordeonItem"
import {
  Accordion,
} from "@/components/ui/accordion"

const faqs = [
  {
    title: "Est il possible de créer plusieurs restaurants ?",
    description: "Pour le moment il n'est possible d'avoir qu'un seul compte lié à un seul et unique email. Vous devez créer un deuxième compte avec un nouvel email. La possibilité de gérer plusieurs restaurants dans la même page d'administration se fera en 2024."
  },
  {
    title: "Est il possible d'avoir un design unique pour ma page web ?",
    description: "Si vous souhaitez avoir un site web personnalisé à votre image, dans ce cas vous devez prendre contact avec une agence web. Mais cela va vous demander du temps, et plus d'argent. Ce que nous vous proposons c'est une page pour votre établissement déjà toute faîte. Vous n'avez qu'à saisir les différentes données telles que les informations de votre établissement, les différents produits ( ex: nom, image, description ) vous validez tout ça et hop c'est en ligne !"
  },
  {
    title: "Pouvons nous suggérer des améliorations pour notre page web ?",
    description: "Vous pouvez tout à fait suggérer des améliorations ou des choses qui vous paraissent essentielles. Après examination de votre proposition, si nous pensons que cela peut être utile pour l'ensemble des établissements, alors nous le rajouterons."
  }
]

export default function FAQ() {
  return (
    <section id='faq' className="p-6 h-[calc(100vh-77px)] bg-green-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-2xl font-bold">Questions fréquentes</h1>
        <Accordion type="single" collapsible>
          <div className="grid grid-cols-auto-fit-300 gap-4">
            {
              faqs.map((faq, index) => {
                return <AccordeonItem key={index} index={index} faq={faq} />
              })
            }
          </div>
        </Accordion>
      </div>
    </section>
  )
}
