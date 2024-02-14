import { UserType } from "@/lib/definitions"
import { capitalize } from "@/lib/utils"
import { BurgerMenu } from "./BurgerMenu"

export const SidebarTop = ({ user }: { user: UserType }) => {
  return (
    <>
      {
        user?.username ? (
          <div className="fixed top-0 mb-4 w-full bg-blueDarker p-4 text-white lg:relative lg:rounded-xl">
            <div className="absolute left-4 top-4 cursor-pointer lg:hidden">
              <BurgerMenu />
            </div>
            <p className="text-center text-2xl">Bonjour <span className="text-xl italic">{capitalize(user?.username)}</span> </p>
          </div>
        ) : null
      }
    </>
  )
}
