import { HomeInfoType } from "@/lib/types";

export default function Banner({ homeInfo }: { homeInfo: HomeInfoType }) {
  const { attributes: { title, subtitle, slogan, slogan_bis, slogan_ter } } = homeInfo

  return (
    <section className="w-full">
      <div className="relative p-20 bg-cover bg-center h-full bg-hero-pattern flex justify-center items-center">
        <div className="bg-black opacity-70 absolute inset-0"></div>
        <div className="mb-10 z-10 text-center tracking-wider">
          <h1 className="text-8xl font-bold text-primary mb-6 italic"> {title} </h1>
          <p className="text-4xl mb-4 font-bold text-white"> {subtitle} </p>
          <p className="text-xl text-white"> {slogan} </p>
          <p className="text-xl text-white"> {slogan_bis} </p>
          <p className="text-xl text-white">Et <span className="italic font-bold underline underline-offset-4 tracking-widest text-2xl"> {title}</span> {slogan_ter} </p>
        </div>
      </div>
    </section>


  )
}