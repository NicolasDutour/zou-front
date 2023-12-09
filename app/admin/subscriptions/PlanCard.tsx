"use client"

import { createCustomer, createSessionCheckout, listProducts } from '@/app/actions';
import { PlanType } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function PlanCard({ plan, user }: { plan: PlanType, user: { id: string, username: string, email: string } }) {
  const { attributes: { title, description, price } } = plan

  const makePayment = async (title: string) => {
    const customer = await createCustomer(user?.username, user?.email, `Zou client has subscribe to plan ${title}`)

    if (customer?.data?.id) {
      const products = await listProducts()
      const product = products.data.data.find(prod => prod.name === title)

      if (product?.default_price) {
        const res = await createSessionCheckout(customer.data.id, product.default_price)
        if (res?.data) {
          window.location.assign(res.data)
        }
      }
    }
  }

  return (
    <div onClick={() => makePayment(title)} className={cn("flex items-center w-1/2 justify-between border-2 p-4 rounded-md mb-2 hover:p-6 transition-all cursor-pointer", title === "premium" ? "border-primary" : "border-secondary")}>
      <div>
        <p className={cn('uppercase font-bold', title === "premium" ? "text-primary" : "text-secondary")}> {title} </p>
        <p> {description} </p>
      </div>
      <p className={cn('text-2xl font-bold', title === "premium" ? "text-primary" : "text-secondary")}>{price} € / mois</p>
    </div>
  )
}
