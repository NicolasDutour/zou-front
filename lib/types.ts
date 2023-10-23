import * as z from "zod"

export const FormSchemaRegister = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
  password: z
    .string()
    .trim()
    .min(6, { message: "Minimum 6 caractères" })
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/, { message: "Minimum 1 majuscule, 1 chiffre, 1 caractère spécial" }),
  confirmPassword: z
    .string()
    .trim()
    .min(6, { message: "Minimum 6 caractères" })
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/, { message: "Minimum 1 majuscule, 1 chiffre, 1 caractère spécial" }),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Les mots de passe ne correspondent pas'
})

export type TypeFormSchemaRegister = z.infer<typeof FormSchemaRegister>

export const FormSchemaLogin = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
  password: z
    .string()
    .trim()
    .min(6, { message: "Minimum 6 caractères" })
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/, { message: "Minimum 1 majuscule, 1 chiffre, 1 caractère spécial" }),
})

export type TypeFormSchemaLogin = z.infer<typeof FormSchemaLogin>