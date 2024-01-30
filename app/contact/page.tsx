import { Metadata } from "next"
import Image from "next/image"

import ContactForm from '@/components/pages/admin/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact'
}

export default function ContactPage() {
  return (
    <div className="h-[calc(100vh-77px)] bg-gray-900 p-6">
      <div className="mx-auto max-w-4xl">
        <div>
          <Image
            src="/leaf-icon.png"
            alt="leaf-icon"
            width={50}
            height={50}
            aspect-auto="true"
            className="mx-auto w-auto rounded-lg"
            priority
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Contact form
          </h2>
        </div>

        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}