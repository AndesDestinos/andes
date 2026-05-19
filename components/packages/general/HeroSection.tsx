import { urlFor } from "@/lib/sanity.image"

type Props = {
  lang: string,
  hero: any
}

export default function Hero({ lang, hero }: Props) {

  return (
    <section className="w-full h-[60vh] relative">
      <img
        src={hero?.image ? urlFor(hero.image).url() : '/images/share/noImage.jpg'}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-3xl md:text-5xl font-semibold tracking-wide">
          {hero?.title?.[lang]}
        </h1>
      </div>
    </section>
  )
}