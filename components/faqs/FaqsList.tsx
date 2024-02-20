
import FaqItem from "./FaqItem"
import { Accordion } from "@/components/ui/accordion";

const faqs = [
  {
    "title": "Comment ça marche ?",
    "description": "Vous vous inscrivez, vous saisissez quelques données, vous souscrivez à la formule et Zou votre site est en ligne. C'est simple et rapide."
  },
  {
    "title": "Quel est le coût de la formule ?",
    "description": "La formule est à 19,99€/mois. Vous pouvez résilier à tout moment. Il n'y a pas d'engagement. Vous pouvez tester gratuitement pendant 1 mois sans saisir vos données bancaires."
  },
  {
    "title": "Puis-je utiliser mon propre nom de domaine ?",
    "description": "Non, vous ne pouvez pas car vous n'êtes pas propriétaire du site internet. Nous vous donnons simplement la possibilité d'avoir une page web via la souscription d'un abonnement."
  },
  {
    "title": "Puis-je ajouter des fonctionnalités à mon site ?",
    "description": "Non, pour l'instant vous ne pouvez pas. Ce seront des options mis en place prochainement. Mais si vous avez des suggestions, n'hésitez pas à nous les faire parvenir."
  },
  {
    "title": "Puis je choisir un template parmis une liste ?",
    "description": "Non, pour l'instant vous ne pouvez pas. Ce sera mis en place prochainement"
  },
  {
    "title": "Est il possible d'avoir un design unique pour mon site web ?",
    "description": "Non, si vous souhaitez avoir un site web personnalisé à votre image, dans ce cas je vous recommande de prendre contact avec une agence web. Mais cela va vous demandera du temps, et plus d'argent. Ce que nous vous proposons c'est une page pour votre établissement déjà toute faîte. Vous n'avez qu'à saisir les différentes données telles que les informations de votre établissement, les différents produits ( ex: nom, image, description ) vous validez tout ça et zou c'est en ligne !"
  },
  {
    "title": "Pouvons nous suggérer des améliorations pour notre page web ?",
    "description": "Oui, vous pouvez tout à fait suggérer des améliorations ou des choses qui vous paraissent essentielles. Après examination de votre proposition, si nous pensons que cela peut être utile pour l'ensemble des établissements, alors nous le rajouterons."
  },
]

export default async function FaqsList() {
  return (
    <Accordion type="single" collapsible>
      <div className="grid grid-cols-1 gap-4">
        {
          faqs?.map((faq, index) => {
            return <FaqItem key={index} faq={faq} index={index} />
          })
        }
      </div>
    </Accordion>
  )
}
