"use client"

import { urlFor } from "@/lib/sanity.image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export default function BlogSection({ posts, lang }: any) {
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
    const update = () => setItemsPerView(calculateItemsPerView())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const shouldCenter = posts.length <= itemsPerView
  const showControls = posts.length > itemsPerView

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
    <section className="andes-contenido">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {lang === "es"
            ? "Artículos clave para organizar tu viaje"
            : "Key articles to plan your trip"}
        </h2>

        <Link
            href={`/${lang}/blogs`}
            className="text-sm font-medium text-primary hover:underline"
        >
            {lang === "es" ? "Leer más" : "Read more"}
        </Link>
      </div>

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
        {posts.map((post: any, i: number) => (
          <div
            key={post._id}
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
            <div className="space-y-4">
              <div className="relative h-[240px] overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src={post?.mainImage ? urlFor(post.mainImage).url() : '/images/share/noImage.jpg'}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                  {post.category?.title?.[lang] || "Blog"}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-2 rounded-md">
                  {post.readingTime || "5 min"}
                </div>
              </div>

              <p className="text-sm text-gray-500">
                {post.publishedAt}
              </p>

              <h3 className="text-xl md:text-2xl font-semibold leading-snug">
                {post.headline?.[lang]}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-3">
                {post.excerpt?.[lang]}
              </p>

              <Link
                href={`/${lang}/blogs/${post.slug.current}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {lang === "es" ? "Leer más" : "Read more"}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showControls && (
        <div className="flex justify-between items-center mt-8 px-2">
          <div className="flex gap-3">
            {posts.map((_: any, i: number) => (
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
    </section>
  )
}