"use client"

import { BsArrowDownCircle } from "react-icons/bs";
import { Button } from "./ui/button"

export default function Banner() {

  const scrollDown = () => {
    window.scrollBy(0, 500);
  };

  return (
    <section className="h-[600px] md:h-[500px] w-full">
      <div className="relative p-6 bg-cover bg-center h-full bg-hero-pattern flex justify-center items-center">
        <div className="bg-black opacity-70 absolute inset-0"></div>
        <div className="mb-10 z-10 text-white">
          <div className="max-w-5xl mx-auto gap-6 grid grid-cols-1 place-items-center">
            <h1 className="text-8xl text-secondary">Ted</h1>
            <p className="text-4xl">Votre site web prêt à l'emploi</p>
            <p className="text-2xl">Comment ça fonctionne ?</p>
            <Button className="text-white text-xl rounded-2xl py-10 mr-4 hover:bg-green-900" onClick={scrollDown} variant="secondary">
              <div className='icon-move-down flex justify-center text-white text-2xl cursor-pointer'>
                <BsArrowDownCircle />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}