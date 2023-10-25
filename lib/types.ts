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

export const FormSchemaProfile = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
})
export type TypeFormSchemaProfile = z.infer<typeof FormSchemaProfile>

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

export const FormSchemaRestaurant = z.object({
  restaurant_name: z
    .string()
    .min(1, {
      message: "Le nom de votre restaurant doit contenir au moins 1 caractère",
    })
    .trim(),
  description: z
    .string()
    .max(400, {
      message: "La description doit contenir au maximum 160 caractères",
    }),
  address: z
    .string()
    .min(1, {
      message: "L'adresse de votre restaurant doit contenir au moins 1 caractère",
    }),
  phone: z
    .string()
    .length(10, {
      message: "Le téléphone de votre restaurant doit contenir exactement 10 caractères",
    })
    .regex(/^\d{10}$/),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
  // opening_time_morning: z.string().datetime(),
  // closing_time_morning: z.string().datetime(),
  // opening_time_afternoon: z.string().datetime(),
  // closing_time_afternoon: z.string().datetime(),
  // photo_banner: z.any()
})
export type TypeFormSchemaRestaurant = z.infer<typeof FormSchemaRestaurant>


export type RestaurantType = {
  restaurant_name: string,
  address: string,
  description: string,
  email: string,
  phone: string,
  createdAt: string,
  userId: string,
}