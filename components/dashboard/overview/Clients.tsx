import { fetchClients } from '@/lib/mock-data'
import ClientsChart from './ClientsChart'

export default async function Clients() {
  const clients = fetchClients()
  return (
    <div className='rounded-3xl border border-gray-700  bg-blueDark p-4'>
      <h1 className='mb-4 text-white'>Clients</h1>
      <ClientsChart clients={clients} />
    </div>
  )
}
