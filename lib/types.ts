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
  // opening_time_morning: z.string().datetime(),
  // closing_time_morning: z.string().datetime(),
  // opening_time_afternoon: z.string().datetime(),
  // closing_time_afternoon: z.string().datetime(),
  // photo_banner: z.any()
})
export type TypeFormSchemaRestaurant = z.infer<typeof FormSchemaRestaurant>

export type UserType = {
  id: string,
  email: string,
  username: string,
  restaurants: RestaurantType[]
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

// export type accordeaonItem = {
//   title: string,
//   description: string
// }