import { urlFor } from "@/lib/sanity.image";

export default function BlogHero({lang, hero}: any) {
  return (
    <section className="relative w-full h-[60vh]">
      <img
        src={hero?.image ? urlFor(hero.image).url() : '/images/share/noImage.jpg'}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-3xl md:text-5xl text-center px-4">
          {hero?.title?.[lang]}
        </h1>
      </div>
    </section>
  )
}