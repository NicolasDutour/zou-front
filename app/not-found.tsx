import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function notFound() {
  return (
    <div className='flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center space-y-6'>
      <h2 className='text-5xl text-blueDark'>Oups ! Page not found</h2>
      <div className='text-center'>
        <p>We are sorry, the page you requested could not be found</p>
        <p>Please, go back to the homepage</p>
      </div>
      <Button variant="outline" asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
