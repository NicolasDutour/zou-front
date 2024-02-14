import React from "react"
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
    .min(1, 'Ce champs est requis')
    .max(50, 'Maximum 50 caractères')
    .email({ message: "Email non valide" }),
  password: z
    .string()
    .trim()
    .refine(value => value !== undefined && value.length > 0, { message: "Ce champs est requis" })
    .refine(value => value !== undefined && value.length >= 6, { message: "Minimum 6 caractères" })
    .refine(value => value !== undefined && value.length <= 100, { message: "Maximum 100 caractères" })
    .refine(value => /^(?=.*[A-Z]).+$/g.test(value), { message: "Minimum 1 majuscule" })
    .refine(value => /^(?=.*[0-9]).+$/g.test(value), { message: "Minimum 1 chiffre" })
    .refine(value => /^(?=.*[\W_]).+$/g.test(value), { message: "Minimum 1 caractère spécial" }),
  confirmPassword: z
    .string()
    .trim()
    .refine(value => value !== undefined && value.length > 0, { message: "Ce champs est requis" })
    .refine(value => value !== undefined && value.length >= 6, { message: "Minimum 6 caractères" })
    .refine(value => value !== undefined && value.length <= 100, { message: "Maximum 100 caractères" })
    .refine(value => /^(?=.*[A-Z]).+$/g.test(value), { message: "Minimum 1 majuscule" })
    .refine(value => /^(?=.*[0-9]).+$/g.test(value), { message: "Minimum 1 chiffre" })
    .refine(value => /^(?=.*[\W_]).+$/g.test(value), { message: "Minimum 1 caractère spécial" }),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Les mots de passe ne correspondent pas'
})
export type TypeFormSchemaRegister = z.infer<typeof FormSchemaRegister>

export const FormSchemaLogin = z.object({
  identifier: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Ce champs est requis')
    .max(50, 'Maximum 50 caractères')
    .email({ message: "Email non valide" }),
  password: z
    .string()
    .trim()
    .refine(value => value !== undefined && value.length > 0, { message: "Ce champs est requis" })
    .refine(value => value !== undefined && value.length >= 6, { message: "Minimum 6 caractères" })
    .refine(value => value !== undefined && value.length <= 100, { message: "Maximum 100 caractères" })
    .refine(value => /^(?=.*[A-Z]).+$/g.test(value), { message: "Minimum 1 majuscule" })
    .refine(value => /^(?=.*[0-9]).+$/g.test(value), { message: "Minimum 1 chiffre" })
    .refine(value => /^(?=.*[\W_]).+$/g.test(value), { message: "Minimum 1 caractère spécial" }),
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

export const FormSchemaProfile = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
})

export type TypeFormSchemaProfile = z.infer<typeof FormSchemaProfile>

export type FormatType = {
  name: string;
  url: string;
}

export type FormatsType = {
  thumbnail?: FormatType;
  small?: FormatType;
  medium?: FormatType;
  large?: FormatType;
  [key: string]: FormatType | undefined; // Index signature to allow dynamic keys
}

export type MenuType = {
  id: number
  attributes: {
    mime: string
    url: string
    name: string
  }
}

export type FileType = {
  attributes: {
    name: string
    url: string
  }
}

export type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
}

export type SidebarNavItemType = {
  href: string
  title: string
  icon: React.ReactNode
}

export type FaqType = {
  id: number
  title: string
  description: string
}

export type PlanType = {
  id: number,
  name: string,
  price: number,
  features: string[],
}

export type BreadcrumbType = {
  label: string;
  href: string;
  active?: boolean;
}

export type DashboardNavLinkType = {
  href: string
  label: string
  icon: React.ReactNode
}

export type SuggestionAddress = {
  type: string
  geometry: {
    type: string
    coordinates: string[]
  }
  properties: {
    label: string
  }
}

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

// const MAX_FILE_SIZE_BANNER = 500000;
// const ACCEPTED_IMAGE_TYPES_BANNER = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const FormSchemaRestaurant = z.object({
  restaurant_name: z
    .string()
    .min(1, {
      message: "Minimum 1 caractère requis",
    })
    .trim(),
  description: z
    .string()
    .max(400, {
      message: "Maximum 400 caractères requis",
    }),
  short_description: z
    .string()
    .max(100, {
      message: "Maximum 100 caractères requis",
    }),
  address: z
    .string()
    .min(1, {
      message: "Minimum 1 caractère requis",
    }),
  phone: z
    .string()
    .length(10, {
      message: "10 caractères requis",
    })
    .regex(/^\d{10}$/),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email non valide" })
    .min(1, 'Ce champs est requis'),
  banner_photo: z
    .any(),
  // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE_BANNER, { message: `Taille du fichier max est ${MAX_FILE_SIZE_BANNER}MB.` })
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES_BANNER.includes(files?.[0]?.type), { message: "Formats acceptés: .jpg, | .jpeg, | .png | .webp" }
  // ),
  drive: z.boolean(),
  take_away: z.boolean(),
  delivery: z.boolean(),
  eat_in: z.boolean()
})
export const PartialFormSchemaRestaurant = FormSchemaRestaurant.partial({
  banner_photo: true
})
export type TypePartialFormSchemaRestaurant = z.infer<typeof PartialFormSchemaRestaurant>

export type RestaurantType = {
  id: number
  restaurant_name: string
  address: string
  description: string
  short_description: string
  email: string
  phone: string
  createdAt: string
  userId: string
  longitude: string
  latitude: string
  drive: boolean
  take_away: boolean
  delivery: boolean
  eat_in: boolean
  choice_menu: string
  // products: ProductType[]
  // menu_photo: MenuAdminType[]
  banner_photo: {
    id: number
    name: string
    url: string
    data: {
      attributes: {
        formats: {
          large: { url: string, name: string },
          medium: { url: string, name: string },
          small: { url: string, name: string },
          thumbnail: { url: string, name: string }
        }
      }
    }
  }
}