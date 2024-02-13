import Link from "next/link"
import DashBoardNavLinks from "./DashBoardNavLinks"
import { RxHamburgerMenu } from "react-icons/rx";
import { cookies } from "next/headers";

export default function DashBoardSideBar() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const username = cookieStore.get('username')?.value

  return (
    <div className="md:fixed h-full bg-blueDark w-full flex-none md:w-64 p-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl text-white hover:text-gray transition ease-out duration-700">Bonjour {token && username ? username : ''} </Link>
        <div className="text-3xl text-white hover:text-gray transition ease-out duration-700 cursor-pointer md:hidden">
          <RxHamburgerMenu />
        </div>
      </div>
      <DashBoardNavLinks />
    </div>
  )
}
