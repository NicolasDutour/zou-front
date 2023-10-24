export default function BannerStepThreeFour() {
  return (
    <section className="md:h-[500px] w-full">
      <div className="bg-cover bg-center h-full md:bg-hero-pattern-pair bg-white grid md:grid-cols-2">
        <div className="md:p-6 p-10 self-center">
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex justify-center items-center border-2 rounded-full w-12 h-12 p-7 border-primary md:border-white mr-6 self-start">
              <p className="md:text-4xl text-3xl text-primary md:text-white">3</p>
            </div>
            <div>
              <h1 className="md:text-4xl text-3xl text-gray-900 md:text-white mb-8">Création produits</h1>
              <p className="text-lg text-gray-900 md:text-white">Vous pourrez ajouter, modifier ou supprimer tout type de produit.</p>
            </div>
          </div>
        </div>

        <div className="mt:p-0 mt:pb-6 p-10 bg-gray-900 md:bg-transparent">
          <div className="flex items-center justify-center mb-6">
            <div className="flex justify-center items-center border-2 rounded-full w-12 h-12 p-7 border-white mr-6 self-start">
              <p className="text-4xl text-white">4</p>
            </div>
            <div>
              <h1 className="text-4xl md:text-white text-white mb-6">Abonnement</h1>
              <div>
                <p className="text-lg text-white mb-4">Vous choisissez un abonnement parmis les suivants:</p>
                <p className="flex flex-col justify-between p-2 mb-2 shadow-lg rounded-xl border-2 border-primary text-white">
                  <span className="text-primary text-lg">Essential pour 9.99 € / mois</span> Vous êtes autonome.
                </p>
                <p className="flex flex-col justify-between p-2 shadow-lg rounded-lg border-2 border-primary text-white">
                  <span className="text-primary text-lg">Premium pour 29.99 € / mois</span> Ted s'occupe de tout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
