'use client'

import { useState } from 'react'
import BlogHero from './BlogHero'
import BlogTabs from './BlogTabs'
import FeaturedWithCarousel from './FeaturedWithCarousel'
import CategoryRow from './CategoryRow'

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
          <CategoryRow
            key={cat._id}
            category={cat}
            lang={lang}
          />
        ))}
    </main>
  )
}