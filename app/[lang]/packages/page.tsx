import PackagesSection from "@/components/packages/general/PackagesSection"
import WhyChooseUs from "@/components/packages/general/WhyChooseUs"
import HeroSection from "@/components/packages/general/HeroSection"
import { client } from "@/lib/sanity.client"
import BlogSection from "@/components/packages/general/BlogSection"

export default async function Page({ params }: any) {
  const titulo = {
    es: {
      title: "Paquetes",
    },
    en: {
      title: "Packages",
    },
  }

  const packagesByCategoryQuery = `
    *[_type == "category" && type == "package"]{
    _id,
    title,
    "packages": *[_type == "travelPackage" && references(^._id)]{
        _id,
        title,
        slug,
        durationLabel,
        days,
        "mainImage": mainImage.asset->url,
    }
    }
    `
  const blogsQuery = `
    *[_type == "blogPost" && featured == true] | order(publishedAt desc){
    _id,
    headline,
    slug,
    publishedAt,
    readingTime,
    excerpt,
    "mainImage": mainImage.asset->url,
    category->{
        title
    }
    }
    `

  const { lang } = await params;

  const categories = await client.fetch(packagesByCategoryQuery);
  const blogs = await client.fetch(blogsQuery);

  return (
    <main>
      <HeroSection lang={lang} titulo={titulo} />
      <WhyChooseUs lang={lang} />
      <PackagesSection categories={categories} lang={lang} />
      <BlogSection posts={blogs} lang={lang} />
    </main>
  )
}