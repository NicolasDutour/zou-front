export default function Banner() {
  return (
    <section className="h-[600px] md:h-[500px] w-full bg-slate-100">
      <div className="max-w-5xl mx-auto p-6 h-full flex flex-col justify-center items-center text-gray-500">
        <h1 className="text-8xl text-secondary mb-6">Ted</h1>
        <p className="text-4xl mb-4">Votre page web prêt à l'emploi</p>
        <p className="text-xl">Un design simple est fonctionnel</p>
        <p className="text-xl">Vous n'avez qu'à saisir les informations sur votre établissement</p>
        <p className="text-xl">Et hop votre site est en ligne !</p>
      </div>
    </section>
  )
}