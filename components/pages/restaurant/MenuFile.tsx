"use client"
import Link from 'next/link'

import { FileType } from "@/lib/types"

export default function MenuFile({ file }: { file: FileType }) {
  const environment = process.env.NODE_ENV

  return (
    <Link href={environment === 'production' ? file.attributes.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${file.attributes.url}`} target='_blank' className="flex cursor-pointer items-center justify-center rounded-md border border-primary bg-white p-6 transition-all hover:bg-primary hover:text-white">Téléchargez le menu <span className='ml-4 underline underline-offset-4'> {file.attributes.name}</span> </Link>
  )
}
