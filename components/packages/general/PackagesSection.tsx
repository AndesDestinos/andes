import PackagesCarousel from "./PackagesCarousel"

export default function PackagesSection({ categories, lang }: any) {
  return (
    <>
      {categories.map((cat: any) => (
        <section
          key={cat._id}
          className="andes-contenido"
        >
          <p className="text-center text-sm uppercase text-gray-500">
            {lang === "es"
              ? "La maravilla del mundo"
              : "Wonder of the world"}
          </p>

          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-6">
            {cat.title?.[lang]}
          </h2>

          <p className="text-center text-gray-600 max-w-[700px] mx-auto mb-12">
            {lang === "es"
              ? "Mejor época para visitar..."
              : "Best time to visit..."}
          </p>

          <PackagesCarousel packages={cat.packages} lang={lang} />
        </section>
      ))}
    </>
  )
}