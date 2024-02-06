"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Footer() {
  const path = usePathname()

  if (
    path === '/' ||
    path === '/faq' ||
    path === '/personal-data' ||
    path === '/legal-notice'
  ) {
    return (
      <footer>
        <div className="grid grid-cols-1 place-items-center bg-gray-900 p-4 text-sm text-gray-400 md:grid-cols-5">
          <p>© {new Date().getFullYear() > 2023 ? "2023 -" : ""} {new Date().getFullYear()} - Tous droits réservés</p>
          <Link href="/legal-notice" className="hover:text-white">Mentions légales</Link>
          <Link href="/personal-data" className="hover:text-white">Données personnelles</Link>
          <Link href='/faq' className="hover:text-white">Questions fréquentes</Link>
          <Link href='/contact' className="hover:text-white">Nous contacter</Link>
          {/* <p className="uppercase hover:text-white">Préférences cookies</p> */}
        </div>
      </footer>
    )
  }
}
