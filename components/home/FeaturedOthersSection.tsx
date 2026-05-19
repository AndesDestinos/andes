"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function FeaturedOtherssSection({ tours, lang }: any) {
  const [current, setCurrent] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else setItemsPerView(3)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const showControls = tours.length > itemsPerView

  const maxIndex = Math.max(0, tours.length - itemsPerView)

  const next = () => {
    setCurrent((prev) => (prev < maxIndex ? prev + 1 : prev))
  }

  const prev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <p className="text-sm tracking-widest text-gray-500 uppercase">
            {lang === "es" ? "DESTINOS IMPERDIBLES" : "MUST-SEE DESTINATIONS"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mt-2">
            {lang === "es"
              ? "Los mejores destinos populares"
              : "The best popular destinations"}
          </h2>
        </div>

        {/*<button className="mt-4 md:mt-0 border border-gray-400 px-6 py-2 text-sm tracking-wide hover:bg-black hover:text-white transition">
          {lang === "es" ? "EXPLORAR MÁS" : "EXPLORE MORE"}
        </button>*/}
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className={`flex gap-6 transition-transform duration-500 ${
              !showControls ? "justify-center" : ""
            }`}
            style={{
              transform: showControls
                ? `translateX(-${current * (100 / itemsPerView)}%)`
                : "none",
            }}
          >
            {tours.map((tour: any, index: number) => (
              <div
                key={tour._id}
                className="shrink-0 w-full sm:w-[48%] lg:w-[32%]"
              >
                <Link
                  href={`/${lang}/${tour.category.type}s/${tour.category.slug.current}/${tour.slug.current}`}
                  className="block"
                >
                <div className="relative h-[420px] overflow-hidden group">
                  <img
                    src={
                      tour?.mainImage
                        ? urlFor(tour.mainImage).url()
                        : "/images/share/noImage.jpg"
                    }
                    alt={tour.title?.[lang]}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute bottom-0 p-6 text-white w-full">
                    <p className="text-xs tracking-widest uppercase">
                      {tour.durationLabel?.[lang]}
                    </p>

                    <h3 className="text-xl font-semibold mt-2">
                      {tour.title?.[lang]}
                    </h3>

                    <div className="mt-4 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500">
                    
                      <div className="w-full h-[1px] bg-white mb-3 opacity-80" />

                      <p className="text-sm opacity-80">
                        {tour.destinations?.join(", ")}
                      </p>

                      <span className="inline-block mt-3 text-sm tracking-widest border-b border-white pb-1">
                        {lang === "es" ? "VER ITINERARIO" : "VIEW ITINERARY"}
                      </span>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {showControls && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rotate-45 cursor-pointer transition ${
                    index === current
                      ? "bg-black scale-125"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={prev}
                className="w-10 h-10 border flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}