import Image from "next/image"
import Link from "next/link";

export default function Services() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold">Votre page ressemblerait à ça</h1>
        <p className="mr-4">
          Voir un <Link className="text-primary font-bold underline underline-offset-4 tracking-widest" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/nom-de-ton-resto`} target="_blank">
            exemple
          </Link>
          <span className="ml-1">concret</span>
        </p>
        <div className="grid place-items-center mt-4">
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
