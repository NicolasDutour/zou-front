export default function BannerStepOneTwo() {
  return (
    <section className="md:h-[500px] w-full">
      <div className="bg-cover bg-center h-full md:bg-hero-pattern-impair bg-white grid md:grid-cols-2">
        <div className="md:p-6 p-10">
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex justify-center items-center border-2 rounded-full w-12 h-12 p-7 border-primary mr-6 self-start">
              <p className="md:text-4xl text-3xl text-primary">1</p>
            </div>
            <div>
              <h1 className="md:text-4xl text-3xl text-gray-900 mb-8">Création compte</h1>
              <p className="text-lg text-gray-900">Vous créez un compte qui vous permettra ensuite de vous connecter à votre page d'administration pour y ajouter ou modifier les informations de votre établissement.</p>
            </div>
          </div>
        </div>

        <div className="md:p-0 md:pb-6 p-10 self-end bg-gray-900 md:bg-transparent">
          <div className="flex items-center justify-center mb-6">
            <div className="flex justify-center items-center border-2 rounded-full w-12 h-12 p-7 border-white md:border-primary mr-6 self-start">
              <p className="text-4xl text-white md:text-primary">2</p>
            </div>
            <div>
              <h1 className="md:text-4xl text-3xl md:text-gray-900 text-white mb-8">Création établissement</h1>
              <p className="text-lg md:text-gray-900 text-white">Vous saisirez toutes les informations de votre établissement, notamment une image le représentant, le nom, l'adresse, une description... </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
