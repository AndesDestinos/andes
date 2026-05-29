"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function BlogCategorySection({ category, posts, lang }: any) {
  const [current, setCurrent] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else {
        setItemsPerView(2)
      }
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
    <section
      id={category.slug.current}
      className="andes-contenido scroll-mt-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
        <div className="flex flex-col gap-6">
          <h2 className="andes-blog-font text-4xl leading-tight">
            {category.title?.[lang]}
          </h2>

          {/*<Link
            href={`/${lang}/blogs/category/${category.slug.current}`}
            className="border-b w-fit pb-1 tracking-[3px]"
          >
            {lang === "es" ? "VER MAS" : "VIEW MORE"}
          </Link>*/}
        </div>

        <div className="md:col-span-1 lg:col-span-2 w-full">
          <div className="overflow-hidden">
            <div
              className="flex gap-7 transition-transform duration-500"
              style={{
                transform: showControls
                  ? `translateX(-${current * (100 / itemsPerView)}%)`
                  : "none",
              }}
            >
              {posts.map((post: any) => (
                <div
                  key={post._id}
                  className={`
                    shrink-0
                    w-full
                    ${itemsPerView === 2 ? "lg:w-[48%]" : ""}
                  `}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={
                        post?.mainImage
                          ? urlFor(post.mainImage).url()
                          : "/images/share/noImage.jpg"
                      }
                      className="w-full h-full object-cover"
                    />

                    <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full">
                      {category.title?.[lang]}
                    </span>

                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-2 rounded-md">
                      <div className="flex justify-center pb-2">
                        <img src="/images/blogs/durationTime.svg" />
                      </div>
                      {post.readingTime}
                    </div>
                  </div>

                  <p className="text-gray-500 my-3">
                    {post.publishedAt}
                  </p>

                  <h3 className="andes-blog-font mb-3">
                    {post.headline?.[lang]}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt?.[lang]}
                  </p>

                  <Link
                    href={`/${lang}/blogs/${post.slug.current}`}
                    className="border-b pb-1 inline-block tracking-[3px]"
                  >
                    {lang === "es" ? "LEER MÁS" : "VIEW MORE"}
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
                    onClick={() => goTo(index)}
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
        </div>
      </div>
    </section>
  )
}