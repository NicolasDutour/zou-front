import { UserType } from "@/lib/types/userType"
import { capitalize } from "@/lib/utils"

export const SidebarTop = ({ user }: { user: UserType }) => {
  return (
    <>
      {
        user?.username ? (
          <div className="rounded-xl bg-secondary text-white mb-4 p-2">
            <p className="text-2xl text-center">Bonjour</p>
            <p className="text-xl italic text-center">{capitalize(user?.username)}</p>
          </div>
        ) : null
      }
    </>
  )
}
