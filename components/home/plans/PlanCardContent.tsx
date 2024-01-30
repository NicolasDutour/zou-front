import { FaCheck } from "react-icons/fa"

export function PlanCardContent({ title, access, wedoforyou, youmanage }: { title: string, access?: string, wedoforyou?: string, youmanage?: string }) {
  return title === 'premium' ? (
    <div>
      <p className="mt-6 text-left text-lg">Vous avez accès à:</p>
      <ul>
        {
          access?.split(',').map((item, index) => {
            return <li key={index} className="flex items-center px-4 text-left text-sm"> <p className="text-secondary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
      <p className="mt-6 text-left text-lg">Nous faisons pour vous:</p>
      <ul>
        {
          wedoforyou?.split(',').map((item, index) => {
            return <li key={index} className="flex items-center px-4 text-left text-sm"> <p className="text-secondary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
    </div>
  ) : (
    <div>
      <p className="mt-6 text-left text-lg">Vous avez accès à:</p>
      <ul>
        {
          access?.split(',').map((item, index) => {
            return <li key={index} className="flex items-center px-4 text-left text-sm"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
      <p className="mt-6 text-left text-lg">Vous gérez vous même:</p>
      <ul>
        {
          youmanage?.split(',').map((item, index) => {
            return <li key={index} className="flex items-center px-4 text-left text-sm"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
    </div>
  )
}