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
  email: z
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


const MAX_FILE_SIZE_BANNER = 500000;
const ACCEPTED_IMAGE_TYPES_BANNER = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
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
  // opening_time_morning: z.string(),
  // closing_time_morning: z.string(),
  // opening_time_afternoon: z.string(),
  // closing_time_afternoon: z.string(),
  banner_photo: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE_BANNER, { message: `Taille du fichier max est ${MAX_FILE_SIZE_BANNER}MB.` })
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES_BANNER.includes(files?.[0]?.type), { message: "Formats acceptés: .jpg, | .jpeg, | .png | .webp" }
    ),
  drive: z.boolean(),
  take_away: z.boolean(),
  delivery: z.boolean(),
  eat_in: z.boolean()
})
export const PartialFormSchemaRestaurant = FormSchemaRestaurant.partial({
  banner_photo: true
})
export type TypePartialFormSchemaRestaurant = z.infer<typeof PartialFormSchemaRestaurant>

export type UserType = {
  id: string
  email: string
  username: string
  restaurants: RestaurantType[]
  pricing_plan: {
    id: string,
    title: string
    description: string
    price: number
    access?: string
    wedoforyou?: string
    youmanage?: string
  }
}

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

export type PlanType = {
  id: number,
  attributes: {
    title: string
    description: string
    price: number
    access?: string
    wedoforyou?: string,
    youmanage?: string
  }
}

export type StepType = {
  id: number
  attributes: {
    title: string
    description: string
  }
}

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

export type ProductType = {
  id: string
  attributes: {
    base: string
    product_name: string
    ingredients: string
    price: number
    vegetarian: boolean
    dessert: boolean
    photo: {
      data: {
        attributes: {
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

export type InvoiceType = {
  id: number
  invoice_name: string
  startDate: string
  endDate: string
  plan: string
  amount: number
  status: string
}

export type HomeInfoType = {
  id: number
  attributes: {
    title: string
    subtitle: string
    slogan: string
    slogan_bis: string
    slogan_ter: string
    description: string
    home_banner_photo: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              name: string
              url: string
            }
            small: {
              name: string
              url: string
            }
            medium: {
              name: string
              url: string
            }
            large: {
              name: string
              url: string
            }
          }
        }
      }
    }
  }
}

export type ServiceType = {
  id: number
  attributes: {
    title: string
    description: string
    photo: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              name: string
              url: string
            }
            small: {
              name: string
              url: string
            }
            medium: {
              name: string
              url: string
            }
            large: {
              name: string
              url: string
            }
          }
        }
      }
    }
  }
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

export type MenuType = {
  id: number
  attributes: {
    mime: string
    url: string
    name: string
  }
}

export type MenuAdminType = {
  id: number
  mime: string
  url: string
  name: string
}

export type FileType = {
  attributes: {
    name: string
    url: string
  }
}

export type Faq = {
  id: number;
  attributes: {
    title: string;
    description: string;
  }
}

export type FaqResponse = {
  data: Faq[];
}