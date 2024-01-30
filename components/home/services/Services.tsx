import Image from "next/image"
import Link from "next/link";

export default function Services() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Votre page ressemblerait à ça</h1>
        <p className="mr-4">
          Voir un <Link className="font-bold tracking-widest text-primary underline underline-offset-4" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/nom-de-ton-resto`} target="_blank">
            exemple
          </Link>
          <span className="ml-1">concret</span>
        </p>
        <div className="mt-4 grid place-items-center">
          <Image
            src={'/design_ready.png'}
            alt={"design_ready"}
            style={{
              objectFit: "cover",
            }}
            quality={100}
            placeholder="blur"
            blurDataURL='/design_ready.png'
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
