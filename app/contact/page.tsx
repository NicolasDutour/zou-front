import Image from "next/image"

import ContactForm from './ContactForm'

export default function Login() {
  return (
    <div className="bg-gray-900 h-[calc(100vh-77px)] p-6">
      <div className="max-w-4xl mx-auto">
        <div>
          <Image
            src="/leaf-icon.png"
            alt="leaf-icon"
            width={50}
            height={50}
            aspect-auto="true"
            className="rounded-lg mx-auto w-auto"
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