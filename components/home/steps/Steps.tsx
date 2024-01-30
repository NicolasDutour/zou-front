
import { cookies } from "next/headers";
import { StepsList } from "./StepsList";

export default function Steps() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''

  return (
    <section className="bg-base px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Je choisi ma formule</h1>
        <StepsList token={token} />
      </div>
    </section>
  )
}
