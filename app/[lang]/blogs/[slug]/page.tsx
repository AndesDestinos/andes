import BlogClient from '@/components/blogs/BlogClient'
import { client } from '@/lib/sanity.client'

const query = `
*[_type == "blogPost" && slug.current == $slug][0]{
  headline,
  publishedAt,
  readingTime,
  mainImage,
  category->{
    title
  },
  sections[]{
    heading,
    content,
    image
  },
  cta,
}
`

export default async function Page({ params }: any) {
    const { slug, lang } = await params

    const data = await client.fetch(query, { slug })

    return <BlogClient data={data} lang={lang} />
}