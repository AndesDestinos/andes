'use client'

import { useState } from 'react'
import BlogHero from './BlogHero'
import BlogTabs from './BlogTabs'
import FeaturedWithCarousel from './FeaturedWithCarousel'
import CategoryCarousel from './CategoryCarousel'

export default function BlogClient({ categories, lang, hero }: any) {
  const [active, setActive] = useState(
    categories?.[0]?.slug?.current
  )
  const activeCategory = categories.find(
    (c: any) => c.slug.current === active
  )

  return (
    <main>
      <BlogHero lang={lang} hero={hero} />

      <BlogTabs
        categories={categories}
        active={active}
        setActive={setActive}
        lang={lang}
      />

      {activeCategory && (
        <FeaturedWithCarousel
          posts={activeCategory.posts}
          lang={lang}
        />
      )}

      {categories
  .filter((c: any) => c.slug.current !== active)
  .map((cat: any) => (
    <div key={cat._id} className="andes-contenido">
      
      <h2 className="andes-blog-font mb-6">
        {cat.title?.[lang]}
      </h2>

      <CategoryCarousel
        posts={cat.posts}
        lang={lang}
      />

    </div>
))}
    </main>
  )
}