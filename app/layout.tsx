import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/ui/toaster"
import { headers } from 'next/headers';
import { Providers } from '@/redux/provider'

import './globals.css'
import Footer from '@/components/Footer'

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

  const headersList = headers();
  const header_url = headersList.get('referer') || "";

  return (
    <html lang="fr" className='scroll-smooth'>
      <body className={cn(
        "bg-white overflow-x-hidden",
        roboto.className
      )}>
        <Providers>
          {(header_url?.includes('restaurant') && !header_url?.includes('admin/restaurant')) ? null : <Navbar />}
          <main className={cn(
            "min-h-screen",
            (header_url?.includes('restaurant') && !header_url?.includes('admin/restaurant')) ? '' : 'pt-[77px]'
          )}>
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
