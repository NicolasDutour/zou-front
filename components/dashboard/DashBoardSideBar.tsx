import Link from "next/link"
import DashBoardNavLinks from "./DashBoardNavLinks"
import { RxHamburgerMenu } from "react-icons/rx";
import { cookies } from "next/headers";

export default function DashBoardSideBar() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const username = cookieStore.get('username')?.value

  return (
    <div className="size-full flex-none bg-blueDark p-6 md:fixed md:w-64">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl text-white transition duration-700 ease-out hover:text-gray">Bonjour {token && username ? username : ''} </Link>
        <div className="cursor-pointer text-3xl text-white transition duration-700 ease-out hover:text-gray md:hidden">
          <RxHamburgerMenu />
        </div>
      </div>
      <DashBoardNavLinks />
    </div>
  )
}
