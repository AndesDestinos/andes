'use client'

import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

export default function BlogSection({ posts, lang }: any) {
  return (
    <section className="w-full">
      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="text-sm tracking-widest uppercase text-gray-500 mb-2">
            Historias de viajes
          </p>
          <h2 className="text-3xl md:text-5xl font-serif">
            Artículos clave para organizar tu viaje
          </h2>
        </div>

        <Link
          href={`/${lang}/blogs`}
          className="hidden md:block border px-6 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition"
        >
          MAS ARTICULOS
        </Link>
      </div>

      <div className="flex gap-8 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
        {posts.map((post: any) => (
          <div key={post.slug.current} className="min-w-[300px] md:min-w-0">
            <div className="relative mb-4">
              <img
                src={ post?.mainImage ? urlFor(post.mainImage).url() : "/images/share/noImage.jpg" }
                alt=""
                width={500}
                height={300}
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
              LEER MAS
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 md:hidden">
        <Link
          href={`/${lang}/blog`}
          className="border w-full block text-center py-3"
        >
          MAS ARTICULOS
        </Link>
      </div>
    </section>
  )
}