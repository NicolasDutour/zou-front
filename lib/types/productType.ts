import * as z from "zod"

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
  // base: z.string(),
  price: z.number(),
  vegetarian: z.boolean(),
  dessert: z.boolean(),
  // createdAt: z.string(),
  // publishedAt: z.string(),
  // updatedAt: z.string(),
  photo: z.any()
})
export type TypeFormSchemaProduct = z.infer<typeof FormSchemaProduct>

export type ProductType = {
  id: string
  base: string
  product_name: string
  ingredients: string
  price: number
  vegetarian: boolean
  dessert: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  photo: {
    data: {
      attributes: {
        name: string
        url: string
        formats: {
          thumbnail: {
            name: string
            url: string
          },
          small: {
            name: string
            url: string
          },
          medium: {
            name: string
            url: string
          },
          large: {
            name: string
            url: string
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
  vegetarian: z.boolean(),
  dessert: z.boolean(),
  publishedAt: z.string(),
  photo: z.any()
})
export type ProductAdminType = z.infer<typeof productAdminSchema>

export type FilteredProductType = {
  id: number
  base: string
  product_name: string
  ingredients: string
  price: number
  vegetarian: boolean
  dessert: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}

const MAX_FILE_SIZE_MENU = 500000;
const ACCEPTED_IMAGE_TYPES_MENU = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
export const FormSchemaMenu = z.object({
  menu_photo: z
    .any()
    .refine((files) => files?.length == 1, "Fichier requis")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE_MENU, { message: `Taille du fichier max est ${MAX_FILE_SIZE_MENU}MB.` })
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES_MENU.includes(files?.[0]?.type), { message: "Formats acceptés: .jpg, | .jpeg, | .png | .webp | .pdf" }
    )
})
export type TypeFormSchemaMenu = z.infer<typeof FormSchemaMenu>

export const FormSchemaChoiceMenu = z.object({
  choice_menu: z.enum(["list_products", "import_files", "both"], {
    required_error: "Vous devez faire un choix.",
  }),
})