import { cookies } from 'next/headers'

import Link from 'next/link'
import AuthButtons from './AuthButtons'

const Navbar = () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  return (
    <header className='fixed z-20 h-[77px] w-full bg-transparent px-8 py-5 shadow-lg backdrop-blur-md'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between'>
        <Link href="/" passHref>
          <button className='text-4xl font-bold italic text-primary'> Zou </button>
        </Link>
        <AuthButtons token={token || ''} />
      </nav>
    </header>
  )
}

export default Navbar