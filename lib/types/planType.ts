export type PlanType = {
  id: number,
  attributes: {
    name: string,
    amount: number,
    period: number,
    period_type: string
  }
}