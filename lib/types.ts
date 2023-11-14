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
  identifier: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
})
export type TypeFormSchemaProfile = z.infer<typeof FormSchemaProfile>

export const FormSchemaProduct = z.object({
  product_name: z
    .string()
    .min(1, {
      message: "Le nom doit contenir au moins 1 caractère",
    }),
  ingredients: z
    .string()
    .min(1, {
      message: "Vous devez ajouter au moins 1 ingredient",
    }),
  // base: z
  //   .string(),
  price: z
    .number({
      required_error: "Le prix est requis",
      invalid_type_error: "Saisir un nombre",
    })
    .positive({ message: "Prix minimum supérieur à 0" }),
})
export type TypeFormSchemaProduct = z.infer<typeof FormSchemaProduct>

export const FormSchemaLogin = z.object({
  identifier: z
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

export const FormSchemaForgotPassword = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis')
})

export type TypeFormSchemaForgotPassword = z.infer<typeof FormSchemaForgotPassword>

export const FormSchemaRestaurant = z.object({
  restaurant_name: z
    .string()
    .min(1, {
      message: "Le nom de votre restaurant doit contenir au moins 1 caractère",
    })
    .trim(),
  website_mode: z
    .boolean()
    .default(true),
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
  // opening_time_morning: z.string(),
  // closing_time_morning: z.string(),
  // opening_time_afternoon: z.string(),
  // closing_time_afternoon: z.string(),
  // banner_photo: z.any()
})
export type TypeFormSchemaRestaurant = z.infer<typeof FormSchemaRestaurant>

export type UserType = {
  id: string,
  email: string,
  username: string,
  restaurants: RestaurantType[]
  pricing_plan: {
    id: string,
    title: string,
    description: string,
    price: number,
    included: string
  }
}

export type RestaurantType = {
  restaurant_name: string,
  address: string,
  description: string,
  email: string,
  phone: string,
  createdAt: string,
  userId: string,
  longitude: string,
  latitude: string
}

export type PlanType = {
  id: number,
  attributes: {
    title: string,
    description: string,
    price: number,
    included: string
  }
}

export type StepType = {
  id: number,
  attributes: {
    title: string,
    description: string,
  }
}

export type ProductType = {
  id: string;
  attributes: {
    base: string;
    product_name: string;
    ingredients: string;
    price: number;
    photo: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              name: string,
              url: string
            },
            small: {
              name: string,
              url: string
            },
            medium: {
              name: string,
              url: string
            },
            large: {
              name: string,
              url: string
            }
          }
        }
      }
    }
  }
}

export const productAdminSchema = z.object({
  id: z.string(),
  base: z.string(),
  product_name: z.string(),
  ingredients: z.string(),
  price: z.number(),
  publishedAt: z.string()
})

export type ProductAdminType = z.infer<typeof productAdminSchema>

// export type accordeaonItem = {
//   title: string,
//   description: string
// }

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