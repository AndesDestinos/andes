"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function AlsoLikeSection({ tours, lang, path }: any) {
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

  let translate = 0

  if (containerRef.current && containerRef.current.children.length > 0) {
    const firstItem = containerRef.current.children[0] as HTMLElement
    const gap = 24 // gap-6
    translate = current * (firstItem.offsetWidth + gap)
  }

  return (
    <section id="moreDestinations" className="andes-contenido w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h2 className="text-gray-900 mt-2">
            {lang === "es"
              ? "También te gustará..."
              : "You might also like..."}
          </h2>
        </div>

        <Link href={`/${lang}/${path}`} 
            className="mt-4 md:mt-0 border border-gray-400 px-6 py-2 hover:bg-black hover:text-white transition !tracking-[2px]">
          {lang === "es" ? "EXPLORAR MÁS" : "EXPLORE MORE"}
        </Link>
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
            {tours.map((tour: any) => (
              <Link
                key={tour._id}
                href={`/${lang}/${path}/${tour.category.slug.current}/${tour.slug.current}`}
                className="snap-start shrink-0 w-full sm:w-[48%] lg:w-[32%] block group"
              >
                <div className="group">
                  <div className="relative w-full aspect-square overflow-hidden">
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
                    <p className="text-gray-500 !tracking-[2px]">
                      {tour.durationLabel?.[lang]}
                    </p>

                    <h3 className="!tracking-[2px] mt-2">
                      {tour.title?.[lang]}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {tour.destinations?.join(", ")}
                    </p>

                    <span className="!tracking-[2px] inline-block mt-4 border-b border-gray-400 pb-1 hover:border-black">
                      {lang === "es"
                        ? "VER ITINERARIO"
                        : "VIEW ITINERARY"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showControls && (
        <div className="flex items-center justify-between mt-6">
          <div></div>

          <div className="flex gap-3">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <div
                key={index}
                onClick={() => goTo(index)}
                className={`w-3 h-3 rotate-45 cursor-pointer transition ${
                  index === current
                    ? "border border-2 border-black bg-black"
                    : "border border-2 border-[#CBCBCB]"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={prev}
              className="p-2 cursor-pointer border-b border-b-2 border-b-[#CBCBCB] flex items-center justify-center hover:border-black transition"
            >
              ←
            </button>
            <button
              onClick={next}
              className="p-2 cursor-pointer border-b border-b-2 border-b-[#CBCBCB] flex items-center justify-center hover:border-black transition"
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  )
}