import { urlFor } from "@/lib/sanity.image"
import Link from "next/link"

export default function FeaturedWithCarousel({ posts, lang }: any) {
  if (!posts?.length) return null

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <section className="max-w-[1100px] mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        <img
          src={urlFor(featured.mainImage).url()}
          className="w-full h-[300px] object-cover"
        />

        <div>
          <h2 className="text-3xl md:text-4xl mt-2">
            {featured.headline?.[lang]}
          </h2>

          <p className="text-gray-600 mt-4">
            {featured.excerpt?.[lang]}
          </p>

          <Link
            href={`/${lang}/blogs/${featured.slug.current}`}
            className="inline-block mt-6 border-b border-black pb-1"
          >
            { lang === 'es' ? 'LEER MÁS' : 'VIEW MORE' }
          </Link>
        </div>

      </section>

      <div className="max-w-[1100px] mx-auto px-4 pb-16 overflow-x-auto">
        <div className="flex gap-6">
          {rest.map((post: any) => (
            <Link
              key={post._id}
              href={`/${lang}/blogs/${post.slug.current}`}
              className="min-w-[280px]"
            >
              <img
                src={urlFor(post.mainImage).url()}
                className="w-full h-[180px] object-cover"
              />

              <h3 className="mt-2">
                {post.headline?.[lang]}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}