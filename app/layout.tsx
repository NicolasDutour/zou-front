import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

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
        "h-full bg-gray-900",
        roboto.className
      )}>
        <main className='min-h-screen'>
          {children}
        </main>
      </body>
    </html>
  )
}
