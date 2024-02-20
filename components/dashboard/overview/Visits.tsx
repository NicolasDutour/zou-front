import { fetchVisits } from '@/lib/mock-data'
import VisitsChart from './VisitsChart'

export default async function Visits() {
  const visits = fetchVisits()
  return (
    <div className="rounded-3xl border border-gray-700 bg-blueDark p-4">
      <h1 className='mb-4 text-white'>Visits</h1>
      <VisitsChart visits={visits} />
    </div>
  )
}
