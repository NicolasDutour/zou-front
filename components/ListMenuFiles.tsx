"use client"

import MenuFile from "./MenuFile"

const ListMenuFiles = () => {
  return (
    <section className="bg-slate-100 py-8 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4">
        <MenuFile />
        <MenuFile />
      </div>
    </section>
  )
}

export default ListMenuFiles