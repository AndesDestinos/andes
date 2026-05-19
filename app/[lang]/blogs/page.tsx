import { client } from '@/lib/sanity.client'
import BlogClientGeneral from '@/components/blogs/BlogClientGeneral'

const QUERY = `
{
  "categories": *[_type == "category" && type == "blog"]{
    _id,
    title,
    slug
  },
  "posts": *[_type == "blogPost"] | order(publishedAt desc){
    _id,
    headline,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "categoryId": category._ref
  }
}
`

export default async function BlogPage({ params }: any) {
  const { lang } = await params;

  const hero = `*[_type == "blogPage"][0]{
    title,
    image,
  }`;

  const heroData = await client.fetch(hero);
  const data = await client.fetch(QUERY);

  const categories = data.categories.map((cat: any) => ({
    ...cat,
    posts: data.posts.filter(
      (post: any) => post.categoryId === cat._id
    )
  }));

  return <BlogClientGeneral categories={categories} lang={lang} hero={heroData} />
}