import Link from 'next/link'
import AuthButtons from './AuthButtons'
import Image from "next/image"

const Navbar = () => {
  return (
    <header className='fixed w-full px-8 py-5 shadow-lg bg-gray-900 z-20'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto'>
        <Link href="/">
          <Image
            src="/leaf-icon.png"
            alt="leaf-icon"
            width={50}
            height={50}
            aspect-auto="true"
            className="rounded-lg"
            priority
          />
        </Link>
        <AuthButtons />
      </nav>
    </header>
  )
}

export default Navbar