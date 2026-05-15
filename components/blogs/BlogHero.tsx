export default function BlogHero({lang}: any) {
  return (
    <section className="relative w-full h-[60vh]">
      <img
        src="/images/blogs/blogs.webp"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-3xl md:text-5xl text-center px-4">
          { lang === 'es' ? 'ARTÍCULOS CLAVE PARA ORGANIZAR TU VIAJE' : 'KEY ARTICLES FOR ORGANIZING YOUR TRIP' }
        </h1>
      </div>
    </section>
  )
}