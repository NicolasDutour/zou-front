import { cookies } from 'next/headers'

import Link from 'next/link'
import AuthButtons from './AuthButtons'
import Image from "next/image"

const Navbar = () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  return (
    <header className='fixed w-full h-[77px] px-8 py-5 shadow-lg backdrop-blur-md backdrop-filter bg-transparent z-20'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto'>
        <Link href="/">
          <Image
            src="/leaf-icon.png"
            alt="leaf-icon"
            width={40}
            height={40}
            aspect-auto="true"
            className="rounded-lg"
            priority
          />
        </Link>
        <AuthButtons token={token || ''} />
      </nav>
    </header>
  )
}

export default Navbar