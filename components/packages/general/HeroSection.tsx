type Props = {
  lang: string,
  titulo: any
}

export default function Hero({ lang, titulo }: Props) {

  const content = titulo[lang as "es" | "en"]

  return (
    <section className="w-full h-[60vh] relative">
      <img
        src="https://concepto.de/wp-content/uploads/2020/06/cataratas-de-iguazu.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-3xl md:text-5xl font-semibold tracking-wide">
          {content.title}
        </h1>
      </div>
    </section>
  )
}