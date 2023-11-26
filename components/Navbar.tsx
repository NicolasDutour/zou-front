import { cookies } from 'next/headers'

import Link from 'next/link'
import AuthButtons from './AuthButtons'
import Image from "next/image"
import { Button } from './ui/button'

const Navbar = () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  return (
    <header className='fixed w-full h-[77px] px-8 py-5 shadow-lg backdrop-blur-md backdrop-filter bg-transparent z-20'>
      <nav className='flex items-center justify-between max-w-5xl mx-auto'>
        <Link href="/" passHref>
          <button className='italic text-primary text-4xl font-bold'> Zou </button>
        </Link>
        <AuthButtons token={token || ''} />
      </nav>
    </header>
  )
}

export default Navbar