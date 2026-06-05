"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

export default function BlogFeaturedCarousel({ posts, lang }: any) {
  if (!posts?.length) return null
  const mainPost = posts[0]
  const secondaryPosts = posts.slice(1)
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
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={
              mainPost?.mainImage
                ? urlFor(mainPost.mainImage).url()
                : "/images/share/noImage.jpg"
            }
            alt={mainPost.headline?.[lang]}
            className="w-full h-full object-cover"
          />

          {mainPost.category?.title && (
            <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full">
              {mainPost.category.title?.[lang]}
            </span>
          )}

          {mainPost.readingTime && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-2 rounded-md">
              <div className="flex justify-center pb-2">
                <img src="/images/blogs/durationTime.svg" />
              </div>
              {mainPost.readingTime}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-gray-500">
            { mainPost.publishedAt}
          </p>

          <h2 className="andes-blog-font">
            {mainPost.headline?.[lang]}
          </h2>

          <p>
            {mainPost.excerpt?.[lang]}
          </p>

          <div>
            <Link href={`/${lang}/blogs/${mainPost.slug.current}`}
                className="border-b pb-1 inline-block !tracking-[2px]">
                {lang === 'es' ? 'LEER MÁS' : 'VIEW MORE'}
            </Link>
          </div>
        </div>
      </div>

      {secondaryPosts.length > 0 && (
        <div className="w-full">
            <div className="relative">
                <div className="overflow-hidden">
                <div
                    className={`flex w-full gap-7 transition-transform duration-500 ${
                    !showControls ? "justify-center" : ""
                    }`}
                    style={{
                    transform: showControls
                        ? `translateX(-${current * (100 / itemsPerView)}%)`
                        : "none",
                    }}
                >
                    {secondaryPosts.map((post: any) => (
                    <Link
                      key={post.slug.current}
                      href={`/${lang}/blogs/${post.slug.current}`}
                      className="shrink-0 w-full sm:w-[48%] lg:w-[32%] block group"
                    >
                        <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <img
                            src={
                            post?.mainImage
                                ? urlFor(post.mainImage).url()
                                : "/images/share/noImage.jpg"
                            }
                            alt=""
                            className="w-full h-full object-cover"
                        />

                        <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full">
                            {post.category?.title?.[lang]}
                        </span>

                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-2 rounded-md">
                          <div className="flex justify-center pb-2">
                            <img src="/images/blogs/durationTime.svg" />
                          </div>
                            {post.readingTime}
                        </div>
                        </div>

                        <p className="!tracking-[2px] text-gray-500 my-3">
                        {post.publishedAt}
                        </p>

                        <h3 className="andes-blog-font mb-3">
                        {post.headline?.[lang]}
                        </h3>

                        <p className="text-gray-600 mb-6 line-clamp-3">
                        {post.excerpt?.[lang]}
                        </p>

                        <span className="border-b pb-1 inline-block !tracking-[2px]">
                        {lang === 'es' ? 'LEER MÁS' : 'VIEW MORE'}
                        </span>
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

            <div className="mt-10 md:hidden">
                <Link
                href={`/${lang}/blog`}
                className="border w-full block text-center py-3"
                >
                {lang === 'es' ? 'MÁS ARTICULOS' : 'MORE ARTICLES'}
                </Link>
            </div>
        </div>
      )}
    </div>
  )
}