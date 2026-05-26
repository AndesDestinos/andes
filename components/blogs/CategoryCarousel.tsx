"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function CategoryCarousel({ posts, lang }: any) {
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

  const next = () => setCurrent((prev) => (prev < maxIndex ? prev + 1 : prev))
  const prev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : prev))

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{
            transform: `translateX(-${current * (100 / itemsPerView)}%)`,
          }}
        >
          {posts.map((post: any) => (
            <div
              key={post._id}
              className="shrink-0 w-full sm:w-[48%] lg:w-[32%]"
            >
              <Link href={`/${lang}/blogs/${post.slug.current}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={
                      post?.mainImage
                        ? urlFor(post.mainImage).url()
                        : "/images/share/noImage.jpg"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="mt-3">
                  {post.headline?.[lang]}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={prev} className="border px-3 py-1">←</button>
          <button onClick={next} className="border px-3 py-1">→</button>
        </div>
      )}
    </div>
  )
}