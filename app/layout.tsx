import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/ui/toaster"

import './globals.css'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ted',
  description: "Votre site web professionnel prêt à être utilisé, vous n'avez qu'à y ajouter vos données",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={cn(
        "bg-gray-900",
        roboto.className
      )}>
        <Navbar />
        <main className='pt-[77px]'>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
