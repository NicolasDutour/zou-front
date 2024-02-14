import Link from 'next/link'
import React from 'react'

export default function notFound() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center space-y-6'>
      <h2 className='text-5xl text-blueDark'>Oups ! Page not found</h2>
      <div className='text-center'>
        <p>We are sorry, the page you requested could not be found</p>
        <p>Please, go back to the homepage</p>
      </div>
      <Link className='rounded-3xl border-2 border-blueDark p-4 text-3xl text-blueDark transition-all duration-700 ease-out hover:bg-blueDark hover:p-6 hover:text-white' href="/">Go home</Link>
    </div>
  )
}
