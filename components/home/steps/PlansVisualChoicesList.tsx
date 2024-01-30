"use client"

import { PlansVisualChoicesItem } from "./PlanVisualChoicesItem"

const plansVisualChoices = [
  {
    key: "not_autonomous",
    value: "Zou gère tout",
  },
  {
    key: "autonomous",
    value: "Je suis autonome",
  },
]

export const PlansVisualChoicesList = ({
  choice,
  setChoice
}: {
  choice: string,
  setChoice: (choice: string) => void
}) => {

  const handleChangeRadioBox = (e: any) => {
    setChoice(e.target.value)
  }

  return (
    <form>
      {
        plansVisualChoices.map((item, index) => {
          return (
            <PlansVisualChoicesItem
              key={index}
              item={item}
              choice={choice}
              handleChangeRadioBox={handleChangeRadioBox}
            />
          )
        })
      }
    </form>
  )
}
