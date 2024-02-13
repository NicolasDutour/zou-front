import { fetchVisits } from '@/lib/mock-data'
import VisitsChart from './VisitsChart'

export default async function Visits() {
  const visits = await fetchVisits(3000)
  return (
    <div className="bg-blueDark rounded-3xl p-4 border border-gray">
      <h1 className='text-white mb-4'>Visits</h1>
      <VisitsChart visits={visits} />
    </div>
  )
}
