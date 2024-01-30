export default function RestaurantDescription({ description }: { description: string }) {
  return (
    <section className="bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-justify text-lg">{description}</p>
      </div>
    </section>
  )
}
