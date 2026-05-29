import { client } from '@/lib/sanity.client'
import BlogClientGeneral from '@/components/blogs/BlogClientGeneral'

const query = `
{
  "categories": *[_type == "category" && type == "blog"]{
    _id,
    title,
    slug,
    icon,
  },

  "posts": *[_type == "blogPost"] | order(publishedAt desc){
    _id,
    headline,
    excerpt,
    slug,
    mainImage,
    readingTime,
    publishedAt,
    "categoryId": category._ref
  },

  "featuredPosts": *[_type == "blogPost" && featured == true] | order(publishedAt desc){
    _id,
    headline,
    excerpt,
    slug,
    mainImage,
    publishedAt,
    readingTime,
    "category": category->{
      title,
      icon,
    }
  }
}
`;

export default async function BlogPage({ params }: any) {
  const { lang } = await params;

  const hero = `*[_type == "blogPage"][0]{
    title,
    image,
  }`;

  const heroData = await client.fetch(hero);
  const data = await client.fetch(query);
  const categories = data.categories.map((cat: any) => ({
    ...cat,
    posts: data.posts.filter(
      (post: any) => post.categoryId === cat._id
    )
  }));
  const featuredPosts = data.featuredPosts;

  return <BlogClientGeneral categories={categories} posts={data.posts} featuredPosts={featuredPosts} lang={lang} hero={heroData} />
}