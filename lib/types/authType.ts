import * as z from "zod"

export const FormSchemaRegister = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Ce champs est requis'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis')
    .max(50, 'Maximum 50 caractères'),
  password: z
    .string()
    .trim()
    .min(6, { message: "Minimum 6 caractères" })
    .max(100, 'Maximum 100 caractères')
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/, { message: "Minimum 1 majuscule, 1 chiffre, 1 caractère spécial" }),
  confirmPassword: z
    .string()
    .trim()
    .min(6, { message: "Minimum 6 caractères" })
    .max(100, 'Maximum 100 caractères')
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/, { message: "Minimum 1 majuscule, 1 chiffre, 1 caractère spécial" }),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Les mots de passe ne correspondent pas'
})

export const FormSchemaLogin = z.object({
  identifier: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis')
    .max(50, 'Maximum 50 caractères'),
  password: z
    .string()
    .trim()
    .min(6, { message: "Minimum 6 caractères" })
    .max(100, 'Maximum 100 caractères')
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/, { message: "Minimum 1 majuscule, 1 chiffre, 1 caractère spécial" }),
})

export const FormSchemaForgotPassword = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis')
})
export type TypeFormSchemaForgotPassword = z.infer<typeof FormSchemaForgotPassword>
