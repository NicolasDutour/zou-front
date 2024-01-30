"use client"

import { FileType } from "@/lib/types";
import MenuFile from "./MenuFile"

const ListMenuFiles = ({ files }: { files: FileType[] }) => {
  return (
    <section className="bg-slate-100 px-6 py-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        {files.map((file, index) => <MenuFile key={index} file={file} />)}
      </div>
    </section>
  )
}

export default ListMenuFiles