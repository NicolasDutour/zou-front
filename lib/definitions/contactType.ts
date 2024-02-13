import * as z from "zod"

export const FormSchemaContact = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Minimum 1 caractère" }),
  content: z
    .string()
    .min(1, { message: "Minimum 1 caractère" })
    .max(400, { message: "Maximum 400 caractères" })
})
export type TypeFormSchemaContact = z.infer<typeof FormSchemaContact>