import Image from "next/image"
import Link from "next/link";

const imageStyle: React.CSSProperties = {
  objectFit: "cover",
};

export default function Services() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold">Votre page ressemblerait à ça</h1>
        <p className="mr-4">
          Essayez ce <Link className="text-primary font-bold underline underline-offset-4 tracking-widest" href={`${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/nom-de-ton-resto`} target="_blank">
            restaurant
          </Link>
          <span className="ml-1">comme exemple</span>
        </p>
        <div className="grid place-items-center mt-4">
          <Image
            src={'/design_ready.png'}
            alt={"design_ready"}
            style={imageStyle}
            width={800}
            height={400}
            aspect-auto="true"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
