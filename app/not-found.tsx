import Link from 'next/link'
import React from 'react'

export default function notFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full space-y-6'>
      <h2 className='text-blueDark text-5xl'>Oups ! Page not found</h2>
      <div className='text-center'>
        <p>We are sorry, the page you requested could not be found</p>
        <p>Please, go back to the homepage</p>
      </div>
      <Link className='text-3xl text-blueDark rounded-3xl border-2 border-blueDark hover:bg-blueDark hover:text-white transition-all ease-out duration-700 p-4 hover:p-6' href="/">Go home</Link>
    </div>
  )
}
