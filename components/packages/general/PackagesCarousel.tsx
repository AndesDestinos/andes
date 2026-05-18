"use client"

import { urlFor } from "@/lib/sanity.image"
import { useRef, useState, useEffect } from "react"

export default function PackagesCarousel({ packages, lang }: any) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  const calculateItemsPerView = () => {
    const width = window.innerWidth

    if (width < 640) return 1
    if (width < 1024) return 2
    return 3
  }

  useEffect(() => {
    const update = () => {
      setItemsPerView(calculateItemsPerView())
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const shouldCenter = packages.length <= itemsPerView
  const showControls = packages.length > itemsPerView

  const scroll = (dir: "left" | "right") => {
    if (!containerRef.current) return
    const width = containerRef.current.clientWidth

    containerRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    const center = container.scrollLeft + container.clientWidth / 2

    let closest = 0
    let min = Infinity

    itemRefs.current.forEach((item, i) => {
      if (!item) return

      const itemCenter = item.offsetLeft + item.clientWidth / 2
      const dist = Math.abs(center - itemCenter)

      if (dist < min) {
        min = dist
        closest = i
      }
    })

    setActiveIndex(closest)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    el.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className={`
          flex scroll-smooth snap-x snap-mandatory
          ${shouldCenter ? "justify-center" : "overflow-x-auto"}
          
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        `}
      >
        {packages.map((pkg: any, i: number) => (
          <div
            key={pkg._id}
            ref={(el) => { itemRefs.current[i] = el }}
            className="
              flex-shrink-0
              w-full
              sm:w-1/2
              lg:w-1/3
              snap-start
              px-3
            "
          >
            <div className="group h-[420px] relative overflow-hidden rounded-lg cursor-pointer">
              <img
                src={pkg?.mainImage ? urlFor(pkg.mainImage).url() : '/images/share/noImage.jpg'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white space-y-3">
                <p className="text-[11px] tracking-[0.2em] uppercase opacity-80">
                  {pkg.days} {lang === "es" ? "DÍAS | NOCHES" : "DAYS | NIGHTS"}
                </p>

                <h3 className="text-2xl lg:text-3xl font-light leading-tight max-w-[260px]">
                  {pkg.title?.[lang]}
                </h3>

                <button className="mt-2 border border-white px-5 py-2 text-[11px] tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300">
                  {lang === "es" ? "VER ITINERARIO" : "VIEW ITINERARY"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showControls && (
        <div className="flex justify-between items-center mt-6 px-4 lg:px-10">
          
          {/* ROMBOS */}
          <div className="flex gap-3">
            {packages.map((_: any, i: number) => (
              <div
                key={i}
                className={`
                  w-2.5 h-2.5 rotate-45 transition-all duration-300
                  ${i === activeIndex ? "bg-black scale-125" : "bg-gray-300"}
                `}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-black hover:text-white transition"
            >
              ‹
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-black hover:text-white transition"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}