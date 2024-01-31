export type InvoiceType = {
  id: number
  invoice_name: string
  start_date: Date
  end_date: Date
  amount: number
  status: string
  image: {
    url: string
    name: string
  }
}