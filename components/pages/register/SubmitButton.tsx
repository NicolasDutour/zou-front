"use client"

import { useFormStatus } from "react-dom"

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"
    >
      {pending ? "Création..." : "Créer un compte"}
    </button>
  )
}