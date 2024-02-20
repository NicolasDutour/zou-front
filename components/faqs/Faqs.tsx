import FaqsList from "./FaqsList";
import { SkeletonFaqs } from "./SkeletonFaqs";
import { Suspense } from "react";

export default async function Faqs() {
  return (
    <section id="faqs" className="p-10">
      <div className="mx-auto lg:max-w-5xl">
        <h1 className="mb-8 text-2xl font-medium text-gray-700">Questions fréquentes</h1>
        <Suspense fallback={<SkeletonFaqs />}>
          <FaqsList />
        </Suspense>
      </div>
    </section>
  )
}
