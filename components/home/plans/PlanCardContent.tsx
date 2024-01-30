import { FaCheck } from "react-icons/fa"

export function PlanCardContent({ title, access, wedoforyou, youmanage }: { title: string, access?: string, wedoforyou?: string, youmanage?: string }) {
  return title === 'premium' ? (
    <div>
      <p className="mt-6 text-lg text-left">Vous avez accès à:</p>
      <ul>
        {
          access?.split(',').map((item, index) => {
            return <li key={index} className="text-left px-4 flex items-center text-sm"> <p className="text-secondary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
      <p className="mt-6 text-lg text-left">Nous faisons pour vous:</p>
      <ul>
        {
          wedoforyou?.split(',').map((item, index) => {
            return <li key={index} className="text-left px-4 flex items-center text-sm"> <p className="text-secondary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
    </div>
  ) : (
    <div>
      <p className="mt-6 text-lg text-left">Vous avez accès à:</p>
      <ul>
        {
          access?.split(',').map((item, index) => {
            return <li key={index} className="text-left px-4 flex items-center text-sm"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
      <p className="mt-6 text-lg text-left">Vous gérez vous même:</p>
      <ul>
        {
          youmanage?.split(',').map((item, index) => {
            return <li key={index} className="text-left px-4 flex items-center text-sm"> <p className="text-primary"><FaCheck /></p> <p className="ml-2"> {item} </p> </li>
          })
        }
      </ul>
    </div>
  )
}