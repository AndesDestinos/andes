"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function FeaturedToursSection({ tours, lang }: any) {
  const containerRef = useRef<HTMLDivElement>(null)

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

  const maxIndex = Math.max(0, tours.length - itemsPerView)

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const cardWidth = container.scrollWidth / tours.length

    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    })
  }

  const next = () => {
    const newIndex = current < maxIndex ? current + 1 : current
    setCurrent(newIndex)
    scrollToIndex(newIndex)
  }

  const prev = () => {
    const newIndex = current > 0 ? current - 1 : 0
    setCurrent(newIndex)
    scrollToIndex(newIndex)
  }

  const goTo = (index: number) => {
    setCurrent(index)
    scrollToIndex(index)
  }

  const showControls = tours.length > itemsPerView;

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <p className="text-sm tracking-widest text-gray-500 uppercase">
            {lang === "es"
              ? "TOURS MÁS RECOMENDADOS"
              : "MOST RECOMMENDED TOURS"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mt-2">
            {lang === "es"
              ? "Tours destacados por Perú"
              : "Featured tours of Peru"}
          </h2>
        </div>

        <Link href={`/${lang}/tours`} 
            className="mt-4 md:mt-0 border border-gray-400 px-6 py-2 text-sm tracking-wide hover:bg-black hover:text-white transition">
          {lang === "es" ? "EXPLORAR MÁS" : "EXPLORE MORE"}
        </Link>
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
                      {lang === "es"
                        ? "VER ITINERARIO"
                        : "VIEW ITINERARY"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showControls && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-3">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <div
                key={index}
                onClick={() => goTo(index)}
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
    </section>
  )
}