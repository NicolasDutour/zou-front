'use client'

import React, { useState } from 'react'
import StepItem from './StepItem'
import { StepType } from '@/lib/types/homeType'
import { PlansVisualChoicesList } from './PlansVisualChoicesList'
import { FaHandsClapping } from "react-icons/fa6";

function autonomousSteps(): StepType[] {
  return [
    {
      title: "Je crée mon compte",
      description: "Un identifiant, un mot de passe, pour accéder à votre tableau de bord",
      time: 1,
    },
    {
      title: "Je crée mon restaurant",
      description: "Un nom, une image, une description et vous avez votre restaurant",
      time: 5,
    },
    {
      title: "Je crée mes menus",
      description: "Vous saisissez vos produits ou chargez simplement votre menu",
      time: 30,
    },
    {
      title: "Je règle mon abonnement",
      description: "Vous serez débités tous les mois",
      time: 2,
      price: 14,
    },
    {
      title: "Bravo ! ",
      description: "Votre site est en ligne",
      icon: <FaHandsClapping />,
    },
    {
      title: "Convaincu ? ",
      actionButton: "Je me lance"
    }
  ]
}

function notAutonomousSteps(): StepType[] {
  return [
    {
      title: "Je crée mon compte",
      description: "Un identifiant, un mot de passe, pour accéder à votre tableau de bord",
      time: 1,
    },
    {
      title: "J'envoie les documents à Zou par email",
      description: "Coût de la prestation:",
      time: 10,
      option: true
    },
    {
      title: "Je règle mon abonnement",
      description: "Vous serez débités",
      time: 2,
      price: 14,
    },
    {
      title: "Bravo ! ",
      description: "Votre site est en ligne",
      icon: <FaHandsClapping />,
    },
    {
      title: "Convaincu ? ",
      actionButton: "Je me lance"
    }
  ]
}

export const StepsList = ({ token }: { token: string }) => {
  const [choice, setChoice] = useState("not_autonomous");

  const stepsFiltered = () => {
    return choice === "not_autonomous" ? notAutonomousSteps() : autonomousSteps()
  }

  return (
    <div>
      <PlansVisualChoicesList choice={choice} setChoice={setChoice} />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {
          stepsFiltered()?.map((step, index) => {
            return token && step?.actionButton ? null : <StepItem key={index} index={index + 1} step={step} />
          })
        }
      </div>
    </div>
  )
}
