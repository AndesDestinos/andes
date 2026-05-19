"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function BlogSection({ posts, lang }: any) {
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

  const maxIndex = Math.max(0, posts.length - itemsPerView)
  const showControls = posts.length > itemsPerView

  const next = () => {
    setCurrent((prev) => (prev < maxIndex ? prev + 1 : prev))
  }

  const prev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const goTo = (index: number) => {
    setCurrent(index)
  }

  return (
    <section className="w-full">
      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="text-sm tracking-widest uppercase text-gray-500 mb-2">
            {lang === 'es' ? 'Historias de viajes' : 'travel stories'}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif">
            {lang === 'es' ? 'Artículos clave para organizar tu viaje' : 'Key articles to help you plan your trip'}
          </h2>
        </div>

        <Link
          href={`/${lang}/blogs`}
          className="hidden md:block border px-6 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition"
        >
          {lang === 'es' ? 'MÁS ARTICULOS' : 'MORE ARTICLES'}
        </Link>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className={`flex gap-8 transition-transform duration-500 ${
              !showControls ? "justify-center" : ""
            }`}
            style={{
              transform: showControls
                ? `translateX(-${current * (100 / itemsPerView)}%)`
                : "none",
            }}
          >
            {posts.map((post: any) => (
              <div
                key={post.slug.current}
                className="shrink-0 w-full sm:w-[48%] lg:w-[32%]"
              >
                <div className="relative mb-4">
                  <img
                    src={
                      post?.mainImage
                        ? urlFor(post.mainImage).url()
                        : "/images/share/noImage.jpg"
                    }
                    alt=""
                    className="w-full h-[220px] object-cover"
                  />

                  <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                    {post.category?.title?.[lang]}
                  </span>

                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-2 rounded-md">
                    {post.readingTime}
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-2">
                  {post.publishedAt}
                </p>

                <h3 className="text-xl md:text-2xl font-serif mb-3">
                  {post.headline?.[lang]}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {post.excerpt?.[lang]}
                </p>

                <Link
                  href={`/${lang}/blogs/${post.slug.current}`}
                  className="text-sm tracking-wide border-b pb-1 inline-block"
                >
                  {lang === 'es' ? 'LEER MÁS' : 'VIEW MORE'}
                </Link>
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

      <div className="mt-10 md:hidden">
        <Link
          href={`/${lang}/blog`}
          className="border w-full block text-center py-3"
        >
          {lang === 'es' ? 'MÁS ARTICULOS' : 'MORE ARTICLES'}
        </Link>
      </div>
    </section>
  )
}