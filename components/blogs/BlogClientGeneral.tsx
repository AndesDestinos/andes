'use client'

import { useState } from 'react'
import BlogHero from './BlogHero'
import BlogTabs from './BlogTabs'
import BlogFeaturedCarousel from './BlogFeaturedCarousel'
import BlogCategorySection from './BlogCategorySection'
import RecognizedExcellence from '../shared/RecognizedExcellence'

export default function BlogClient({ categories, posts, featuredPosts, lang, hero, reconocimiento }: any) {
  const [active, setActive] = useState(
    categories?.[0]?.slug?.current
  )

  return (
    <main>
      <BlogHero lang={lang} hero={hero} />

      <BlogTabs
        categories={categories}
        posts={posts}
        active={active}
        setActive={setActive}
        lang={lang}
      />

      <section id="alls" className="andes-contenido">
        <BlogFeaturedCarousel
          posts={featuredPosts}
          lang={lang}
        />
      </section>

      {categories.map((cat: any) => (
        <BlogCategorySection
          key={cat._id}
          category={cat}
          posts={cat.posts}
          lang={lang}
        />
      ))}

      <div className='pt-36'>
        <RecognizedExcellence
          title={reconocimiento.title}
          items={reconocimiento.items}
          lang={lang}
        />
      </div>
    </main>
  )
}