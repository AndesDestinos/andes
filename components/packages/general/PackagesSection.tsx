import PackagesCarousel from "./PackagesCarousel"

export default function PackagesSection({ categories, lang }: any) {
  return (
    <>
      {categories.map((cat: any) => (
        <section
          key={cat._id}
          className="andes-contenido"
        >
          <h4 className="text-center text-gray-500">
            {cat.title?.[lang]}
          </h4>

          <h2 className="text-center mb-6">
            {cat.subtitle?.[lang]}
          </h2>

          <p className="text-center text-gray-600 max-w-[700px] mx-auto mb-12">
            {cat.description?.[lang]}
          </p>

          <PackagesCarousel tours={cat.packages} lang={lang} />
        </section>
      ))}
    </>
  )
}