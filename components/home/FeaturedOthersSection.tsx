import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function FeaturedOtherssSection({ tours, lang }: any) {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <p className="text-sm tracking-widest text-gray-500 uppercase">
            { lang === 'es' ? 'DESTINOS IMPERDIBLES' : 'MUST-SEE DESTINATIONS' }
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mt-2">
            { lang === 'es' ? 'Los mejores destinos populares' : 'The best popular destinations' }
          </h2>
        </div>
        <button className="mt-4 md:mt-0 border border-gray-400 px-6 py-2 text-sm tracking-wide hover:bg-black hover:text-white transition">
          { lang === 'es' ? 'EXPLORAR MÁS' : 'EXPLORE MORE' }
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4">
        {tours.map((tour: any) => (
            <div
            key={tour._id}
            className="snap-start shrink-0 w-full sm:w-[48%] lg:w-[32%]" 
            >
            <div className="group">
                <div className="relative w-full h-[350px] overflow-hidden">
                <img
                    src={
                    tour?.mainImage
                        ? urlFor(tour.mainImage).url()
                        : "/images/share/noImage.jpg"
                    }
                    alt={tour.title?.[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                </div>

                <div className="text-center mt-4">
                <p className="text-xs tracking-widest text-gray-500 uppercase">
                    {tour.durationLabel?.[lang]}
                </p>

                <h3 className="text-xl font-semibold tracking-wide mt-2">
                    {tour.title?.[lang]}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                    {tour.destinations?.join(", ")}
                </p>

                <Link
                    href={`/${lang}/tours/${tour.category.slug.current}/${tour.slug.current}`}
                    className="inline-block mt-4 text-sm tracking-widest border-b border-gray-400 pb-1 hover:border-black"
                >
                    { lang === 'es' ? 'VER ITINERARIO' : 'VIEW ITINERARY' }
                </Link>
                </div>
            </div>
          </div>
        ))}
        </div>
    </section>
  )
}