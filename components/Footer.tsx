"use client"

import Link from "next/link";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
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
        <div className="grid gap-4 border-b border-b-slate-100 bg-gray-900 p-6 text-gray-400 md:grid-cols-3">
          <div>
            <p className="mb-4 text-lg font-medium text-white">A propos</p>
            <p> {"Zou vous permet d'avoir une page web pour y afficher toutes les informations de votre établissement."} </p>
          </div>
          <div>
            <p className="mb-4 text-lg font-medium text-white">Pages</p>
            <ul>
              <li><Link href='/faq' className="hover:text-white">FAQ</Link></li>
              {/* <li><Link href="/contact" className="hover:text-white">Nous contacter</Link></li> */}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-lg font-medium text-white">Contact</p>
            <div>
              <p>dutourn99@gmail.com</p>
              <div className="flex">
                {/* <Link className="text-2xl hover:text-white mr-4" href='/' title="Instagram"><AiOutlineInstagram /></Link>
                <Link className="text-2xl hover:text-white" href='/' title="Facebook"><AiOutlineFacebook /></Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="grid place-items-center bg-gray-900 p-4 text-sm text-gray-400 md:grid-cols-4">
          <p className="uppercase">© {new Date().getFullYear() > 2023 ? "2023 -" : ""} {new Date().getFullYear()} - Tous droits réservés</p>
          <Link href="/legal-notice" className="uppercase hover:text-white">Mentions légales</Link>
          <Link href="/personal-data" className="uppercase hover:text-white">Données personnelles</Link>
          {/* <p className="uppercase hover:text-white">Préférences cookies</p> */}
        </div>
      </footer>
    )
  }
}
