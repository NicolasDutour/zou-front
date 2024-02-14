export default function RestaurantDescription({ description }: { description: string }) {
  return (
    <section className="bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-justify text-lg">{description}</p>
      </div>
    </section>
  )
}
