export type InvoiceType = {
  id: number
  invoice_name: string
  start_date: string
  end_date: string
  amount: number
  status: string
  image: {
    url: string
    name: string
  }
}