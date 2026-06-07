"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function FeaturedOtherssSection({ tours, lang }: any) {
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

  const showControls = tours.length > itemsPerView

  const maxIndex = Math.max(0, tours.length - itemsPerView)

  const next = () => {
    setCurrent((prev) => (prev < maxIndex ? prev + 1 : prev))
  }

  const prev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev))
  }

  let translate = 0

  if (containerRef.current && containerRef.current.children.length > 0) {
    const firstItem = containerRef.current.children[0] as HTMLElement
    const gap = 24 // gap-6
    translate = current * (firstItem.offsetWidth + gap)
  }

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h4 className="text-gray-500">
            {lang === "es" ? "DESTINOS IMPERDIBLES" : "MUST-SEE DESTINATIONS"}
          </h4>
          <h2 className="text-gray-900 mt-2">
            {lang === "es"
              ? "LOS MEJORES DESTINOS POPULARES"
              : "THE BEST POPULAR DESTINATIONS"}
          </h2>
        </div>

        {/*<button className="mt-4 md:mt-0 border border-gray-400 px-6 py-2 hover:bg-black hover:text-white transition">
          {lang === "es" ? "EXPLORAR MÁS" : "EXPLORE MORE"}
        </button>*/}
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div ref={containerRef}
            className={`flex gap-6 transition-transform duration-500 ${
              !showControls ? "justify-center" : ""
            }`}
            style={{
              transform: showControls
                ? `translateX(-${translate}px)`
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
                <div className="relative aspect-[4/5] overflow-hidden group">
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

                  <div className="absolute bottom-0 p-6 text-white w-full !tracking-[2px]">
                    <p className="">
                      {tour.durationLabel?.[lang]}
                    </p>

                    <h3 className="!tracking-[2px] mt-2">
                      {tour.title?.[lang]}
                    </h3>

                    <div className="mt-4 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500">
                      <div className="w-full h-[1px] bg-white mb-3 opacity-80" />

                      <p className="opacity-80">
                        {tour.destinations?.join(", ")}
                      </p>

                      <div className="flex justify-between">
                      <span className="inline-block mt-3 border-b border-white pb-1 !tracking-[2px]">
                        {lang === "es" ? "VER ITINERARIO" : "VIEW ITINERARY"}
                      </span>
                      <img src="/images/footer/directionWhite.svg" className="h-7 w-7" />
                      </div>
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
            <div></div>
            <div className="flex gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rotate-45 cursor-pointer transition ${
                    index === current
                      ? "border border-2 border-black  bg-black"
                      : "border border-2 border-[#CBCBCB]"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={prev}
                className="p-2 cursor-pointer border-b border-b-2 border-b-[#CBCBCB] flex items-center justify-center hover:border-b-black transition"
              >
                ←
              </button>
              <button
                onClick={next}
                className="p-2 cursor-pointer border-b border-b-2 border-b-[#CBCBCB] flex items-center justify-center hover:border-b-black transition"
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