"use client"

import { FileType } from "@/lib/types";
import MenuFile from "./MenuFile"

const ListMenuFiles = ({ files }: { files: FileType[] }) => {
  return (
    <section className="bg-slate-100 py-8 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4">
        {files.map((file, index) => <MenuFile key={index} file={file} />)}
      </div>
    </section>
  )
}

export default ListMenuFiles