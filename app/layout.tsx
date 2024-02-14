import React from "react"
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'

import './globals.css'
import Footer from '@/components/Footer'
import { ProductFormContextProvider, RestaurantFormContextProvider } from '@/context/store'
import AuthButton from "@/components/auth/AuthButton"
import { cookies } from "next/headers"

const roboto = Roboto({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONT_URL}`),
  title: 'Zou',
  description: "Votre site web prêt à l'emploi. Rien à créer, tout est fait. Juste à sasir vos données. Simple, rapide et efficace.",
  // verification: {
  //   google: `google-site-verification=${process.env.GOOGLE_SITE_VERIFICATION}`
  // }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  return (
    <html lang="fr" className='scroll-smooth'>
      <body className={cn(
        "relative bg-white overflow-x-hidden",
        roboto.className
      )}>
        <ProductFormContextProvider>
          <RestaurantFormContextProvider>
            <AuthButton token={token} />
            <main>
              {children}
            </main>
            <Footer />
            <Toaster />
            <SpeedInsights />
            <Analytics />
          </RestaurantFormContextProvider>
        </ProductFormContextProvider>
      </body>
    </html>
  )
}
