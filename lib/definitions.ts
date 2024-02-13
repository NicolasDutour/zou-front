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