'use server'

import { cookies } from 'next/headers'

export async function createCookie(name: string, data: string) {
  // const oneDay = 24 * 60 * 60 * 1000
  // const oneMinute = 60 * 1000;
  const twoHours = 2 * 60 * 60 * 1000
  cookies().set(name, data, { httpOnly: true, expires: Date.now() + twoHours })
}

export async function removeCookie(name: string) {
  cookies().delete(name)
}
