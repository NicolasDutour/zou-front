
import { cookies } from "next/headers";
import { StepsList } from "./StepsList";

export default function Steps() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value || ''

  return (
    <section className="bg-base py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold">Je choisi ma formule</h1>
        <StepsList token={token} />
      </div>
    </section>
  )
}
