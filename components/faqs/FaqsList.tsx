
import FaqItem from "./FaqItem"
import { Accordion } from "@/components/ui/accordion";

const faqs = [
  {
    "id": 1,
    "title": "Comment ça marche ?",
    "description": "Vous vous inscrivez, vous créez un restaurant, des produits, vous souscrivez à la formule et Zou votre site est en ligne. C'est simple et rapide."
  },
  {
    "id": 2,
    "title": "Quel est le coût de la formule ?",
    "description": "La formule est à 19,90€/mois. Vous pouvez résilier à tout moment. Il n'y a pas d'engagement."
  },
  {
    "id": 3,
    "title": "Quels sont les moyens de paiement ?",
    "description": "Vous pouvez payer par carte bancaire. Nous acceptons les cartes Visa, Mastercard et American Express."
  },
  {
    "id": 4,
    "title": "Puis-je utiliser mon propre nom de domaine ?",
    "description": "Oui, vous pouvez utiliser votre propre nom de domaine. Vous pouvez aussi en acheter un directement sur Zou."
  },
  {
    "id": 5,
    "title": "Puis-je ajouter des fonctionnalités à mon site ?",
    "description": "Oui, vous pouvez ajouter des fonctionnalités à votre site. Vous pouvez aussi en acheter un directement sur Zou."
  },
  {
    "id": 6,
    "title": "Est il possible d'avoir un design unique pour mon site web ?",
    "description": "Non, si vous souhaitez avoir un site web personnalisé à votre image, dans ce cas je vous recommande de prendre contact avec une agence web. Mais cela va vous demandera du temps, et plus d'argent. Ce que nous vous proposons c'est une page pour votre établissement déjà toute faîte. Vous n'avez qu'à saisir les différentes données telles que les informations de votre établissement, les différents produits ( ex: nom, image, description ) vous validez tout ça et zou c'est en ligne !"
  },
  {
    "id": 7,
    "title": "Pouvons nous suggérer des améliorations pour notre page web ?",
    "description": "Oui, vous pouvez tout à fait suggérer des améliorations ou des choses qui vous paraissent essentielles. Après examination de votre proposition, si nous pensons que cela peut être utile pour l'ensemble des établissements, alors nous le rajouterons."
  },
]

export default async function FaqsList() {
  return (
    <Accordion type="single" collapsible>
      <div className="grid grid-cols-1 gap-4">
        {
          faqs?.map(faq => {
            return <FaqItem key={faq.id} faq={faq} />
          })
        }
      </div>
    </Accordion>
  )
}
