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
        <div className="grid md:grid-cols-3 text-gray-400 bg-gray-900 p-6 gap-4 border-b border-b-slate-100">
          <div>
            <p className="text-lg font-medium mb-4 text-white">A propos</p>
            <p>Ted vous permet d'avoir une page web pour y afficher toutes les informations de votre établissement.</p>
          </div>
          <div>
            <p className="text-lg font-medium mb-4 text-white">Pages</p>
            <ul>
              <li><Link href='/faq' className="hover:text-white">FAQ</Link></li>
              {/* <li><Link href="/contact" className="hover:text-white">Nous contacter</Link></li> */}
            </ul>
          </div>
          <div>
            <p className="text-lg font-medium mb-4 text-white">Contact</p>
            <div>
              <p>dutourn99@gmail.com</p>
              <div className="flex">
                {/* <Link className="text-2xl hover:text-white mr-4" href='/' title="Instagram"><AiOutlineInstagram /></Link>
                <Link className="text-2xl hover:text-white" href='/' title="Facebook"><AiOutlineFacebook /></Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 place-items-center bg-gray-900 text-gray-400 p-4 text-sm">
          <p className="uppercase">© {new Date().getFullYear() > 2023 ? "2023 -" : ""} {new Date().getFullYear()} - All rights reserved</p>
          <Link href="/legal-notice" className="uppercase hover:text-white">Mentions légales</Link>
          <Link href="/personal-data" className="uppercase hover:text-white">Données personnelles</Link>
          {/* <p className="uppercase hover:text-white">Préférences cookies</p> */}
        </div>
      </footer>
    )
  }
}
