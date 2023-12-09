"use client"
import Link from 'next/link'

import { FileType } from "@/lib/types"

export default function MenuFile({ file }: { file: FileType }) {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_STRAPI_URL}${file.attributes.url}`} target='_blank' className="p-6 rounded-md border border-primary bg-white hover:bg-primary hover:text-white transition-all flex justify-center items-center cursor-pointer">Téléchargez <span className='text-primary font-semibold underline underline-offset-4'> {file.attributes.name}</span> </Link>
  )
}
