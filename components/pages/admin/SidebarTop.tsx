import { UserType } from "@/lib/types/userType"
import { capitalize } from "@/lib/utils"

export const SidebarTop = ({ user }: { user: UserType }) => {
  return (
    <>
      {
        user?.username ? (
          <div className="mb-4 rounded-xl bg-secondary p-2 text-white">
            <p className="text-center text-2xl">Bonjour</p>
            <p className="text-center text-xl italic">{capitalize(user?.username)}</p>
          </div>
        ) : null
      }
    </>
  )
}
