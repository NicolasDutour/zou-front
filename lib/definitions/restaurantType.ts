import * as z from "zod"
import { ProductType } from "./productType";


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