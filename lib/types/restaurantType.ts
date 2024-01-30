import * as z from "zod"
import { ProductType } from "./productType";

const MAX_FILE_SIZE_BANNER = 500000;
const ACCEPTED_IMAGE_TYPES_BANNER = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
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
  products: ProductType[]
  menu_photo: MenuAdminType[]
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

export type MenuAdminType = {
  id: number
  mime: string
  url: string
  name: string
}