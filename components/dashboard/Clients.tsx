import { fetchClients } from '@/lib/mock-data'
import ClientsChart from './ClientsChart'

export default async function Clients() {
  const clients = await fetchClients(5000)
  return (
    <div className='bg-blueDark rounded-3xl p-4  border border-gray'>
      <h1 className='text-white mb-4'>Clients</h1>
      <ClientsChart clients={clients} />
    </div>
  )
}
