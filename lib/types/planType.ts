import * as z from "zod"

export const FormSchemaProductsOptionPlan = z.object({
  productsOptions: z.number()
})
export type TypeFormSchemaProductsOption = z.infer<typeof FormSchemaProductsOptionPlan>