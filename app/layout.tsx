import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { Toaster } from "@/components/ui/toaster"
import { headers } from 'next/headers';

import './globals.css'
import Footer from '@/components/Footer'
import { ProductFormContextProvider, RestaurantFormContextProvider } from '@/context/store'

const roboto = Roboto({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONT_URL}`),
  title: 'Zou',
  description: "Votre page web professionnel prêt à être utilisé, vous n'avez qu'à y ajouter vos données",
  // verification: {
  //   google: `google-site-verification=${process.env.GOOGLE_SITE_VERIFICATION}`
  // }
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
        <ProductFormContextProvider>
          <RestaurantFormContextProvider>
            {(header_url?.includes('restaurant') && !header_url?.includes('admin/restaurant')) ? null : <Navbar />}
            <main className={cn(
              "min-h-screen",
              (header_url?.includes('restaurant') && !header_url?.includes('admin/restaurant')) ? '' : 'pt-[77px]'
            )}>
              {children}
            </main>
            <Footer />
            <Toaster />
          </RestaurantFormContextProvider>
        </ProductFormContextProvider>
      </body>
    </html>
  )
}
