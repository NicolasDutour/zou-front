'use server'

import { cookies } from 'next/headers'

export async function createCookie(name, data) {
  const oneDay = 24 * 60 * 60 * 1000
  cookies().set(name, data, { expires: Date.now() - oneDay })
}

export async function removeCookie(name) {
  cookies().delete(name)
}