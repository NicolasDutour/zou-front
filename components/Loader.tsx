"use client"

import Image from "next/image"

export default function Loader({ width, height }: { width: number, height: number }) {
  return (
    <Image
      src="/loader.gif"
      alt="loader"
      width={width}
      height={height}
      aspect-auto="true"
      className="rounded-lg"
    />
  )
}
