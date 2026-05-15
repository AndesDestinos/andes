import { urlFor } from "@/lib/sanity.image"
import Link from "next/link"

export default function CategoryRow({ category, lang }: any) {
  if (!category.posts?.length) return null

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-20 grid md:grid-cols-3 gap-10">
      <div>
        <h2 className="text-3xl md:text-4xl">
          {category.title?.[lang]}
        </h2>
      </div>

      <div className="md:col-span-2 overflow-x-auto">
        <div className="flex gap-6">
          {category.posts.slice(0, 5).map((post: any) => (
            <Link
              key={post._id}
              href={`/${lang}/blogs/${post.slug.current}`}
              className="min-w-[260px]"
            >
              <img
                src={urlFor(post.mainImage).url()}
                className="w-full h-[160px] object-cover"
              />

              <h3 className="mt-2">
                {post.headline?.[lang]}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}